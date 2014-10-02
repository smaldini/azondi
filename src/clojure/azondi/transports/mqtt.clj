;; Copyright © 2014, OpenSensors.IO. All Rights Reserved.
(ns azondi.transports.mqtt
  (:require [com.stuartsierra.component :as component]
            [modular.netty :refer (NettyHandlerProvider)]
            [clojure.tools.logging :refer (warnf infof info log debugf errorf)]
            [clojurewerkz.triennium.mqtt :as tr]

            [azondi.devices :refer (device-names)]
            [azondi.db :refer (allowed-device?)]
            [azondi.topics :as tp]

            [clojure.set :as cs]
            [clojurewerkz.meltdown.reactor :as mr]

            [clojurewerkz.meltdown.selectors :as ms :refer [$]]
            [clojure.core.async :refer (chan pub dropping-buffer sub go >! <! >!! <!! take! put! timeout)]
            [azondi.reactor.keys :as rk]
            [azondi.metrics      :as am]
            [metrics.meters     :as mm]
            [metrics.timers     :as mt]
            [metrics.histograms :as mh]
            [metrics.counters   :as mct]

            [modular.async :refer (new-channel)]
            )
  (:import  [io.netty.channel ChannelHandlerAdapter ChannelHandlerContext Channel
             ChannelPipeline ChannelHandler]
            [io.netty.handler.timeout IdleStateHandler IdleStateEvent]
            java.net.InetSocketAddress
            [java.util.concurrent ExecutorService Executors
             ScheduledExecutorService ScheduledFuture TimeUnit]))

;;
;; Implementation
;;

(def ^:const supported-protocol-names #{["MQIsdp" 3]
                                        ["MQTT"   4]})

(defn ^{:private true} assoc-with-union
  [m k v]
  (assoc m k (cs/union (get m k) v)))

(defn ^InetSocketAddress peer-of
  [^ChannelHandlerContext ctx]
  (let [^Channel ch (.channel ctx)]
    (cast InetSocketAddress (.remoteAddress ch))))

;;
;; CONNECT
;;

(defn supported-protocol?
  [^String protocol-name ^long protocol-version]
  (supported-protocol-names [protocol-name protocol-version]))

(defn disconnect-client
  ([^ChannelHandlerContext ctx]
     (.close ctx))
  ([^ChannelHandlerContext ctx message]
     (.writeAndFlush ctx message)
     (disconnect-client ctx)))

(defn abort
  "Same as disconnect-client/1 but with a name that better fits certain
   contexts. Prefer disconnect-client/1 where possible."
  [^ChannelHandlerContext ctx]
  (.close ctx))

(defn valid-client-id?
  [^String client-id]
  ;; Section 3.1: valid client ids are between 1 and 23 characters
  (<= 1 (.length client-id) 23))

(defn ^:private maybe-disconnect-existing
  "Disconnects existing client with the given client id, if any.

   See section 3.1 of MQTT specification."
  [^String client-id {:keys [connections-by-ctx connections-by-client-id]}]
  (if-let [state (get @connections-by-client-id client-id)]
    (let [other-ctx (:ctx state)
          peer      (peer-of other-ctx)]
      (warnf "Dropping connection %s (client id: %s) due to duplicate client id" peer client-id)
      (disconnect-client other-ctx)
      (dosync
       (alter connections-by-client-id dissoc client-id)
       (alter connections-by-ctx       dissoc other-ctx))
      other-ctx)))

(defn ^:private inject-idle-state-handler
  [^ChannelHandlerContext ctx ^String client-id ^long timeout handler-state]
  (let [^ChannelPipeline   pl (.. ctx channel pipeline)
        n                     (long (* 1.6 timeout))
        ^IdleStateHandler  ish (IdleStateHandler. n n 0)]
    (.addFirst pl (into-array ChannelHandler [ish]))))

(declare send-pingreq)
(defn ^:private start-keepalives
  [^ChannelHandlerContext ctx ^long timeout
   {:keys [scheduled-keepalive-executor]}]
  (let [f   (fn []
              (try
                (send-pingreq ctx)
                (catch Exception e
                  (errorf "Exception in server-initiated keepalive: %s" (.getMessage e)))))]
    (.scheduleWithFixedDelay scheduled-keepalive-executor
                             (cast Runnable f)
                             1
                             timeout
                             TimeUnit/SECONDS)))

(defn accept-connection
  [^ChannelHandlerContext ctx {:keys [username client-id has-will clean-session
                                      keepalive]
                               :as   msg}
   {:keys [connections-by-ctx connections-by-client-id] :as handler-state}]
  (let [db   (get-in handler-state [:database])
        conn {:username  username
              :client-id client-id
              :ctx ctx
              :has-will has-will
              :will-qos (when has-will (:will-qos msg))
              :keepalive keepalive
              :keepalive-future (start-keepalives ctx keepalive handler-state)}]
    (maybe-disconnect-existing client-id handler-state)
    (dosync
     (alter connections-by-ctx assoc ctx conn)
     (alter connections-by-client-id assoc client-id conn))
    (.writeAndFlush ctx {:type :connack :return-code :accepted})
    (inject-idle-state-handler ctx client-id keepalive handler-state)
    (let [^InetSocketAddress peer (peer-of ctx)]
      (infof "Accepted connection from %s (client id: %s, owner: %s)" peer client-id username))
    conn))

(defn reject-connection
  [^ChannelHandlerContext ctx code]
  (.writeAndFlush ctx {:type :connack :return-code code})
  (disconnect-client ctx)
  (let [^InetSocketAddress peer-host (peer-of ctx)]
    (warnf "Rejecting connection from %s (return code: %s)" peer-host code))
  ctx)

;;
;; CONNECT
;;

(defn handle-connect
  [^ChannelHandlerContext ctx {:keys [protocol-name
                                      protocol-version
                                      has-username
                                      has-password
                                      username
                                      password
                                      client-id] :as msg}
   {:keys [metrics] :as handler-state}]
  ;; example connect message:
  ;; {
  ;;  :type :connect,
  ;;  :client-id antares.1391193099727,
  ;;  :has-username true,
  ;;  :username michael@example.org,
  ;;  :has-password true,
  ;;  :password michael-pwd,
  ;;  :has-will false,
  ;;  :will-qos 0,
  ;;  :will-retain false,
  ;;  :qos 0,
  ;;  :clean-session true,
  ;;  :keepalive 60,
  ;;  :retain false,
  ;;  :protocol-name MQIsdp,
  ;;  :protocol-version 3,
  ;;  :dup false
  ;;  }

  (when-let [c (:debug-ch handler-state)]
    (go (>!! c {:message (format "Connection attempt from %s, client id: %s" (peer-of ctx) client-id) :client-id client-id})))

  (cond
   (not (supported-protocol? protocol-name protocol-version))
   (do
     (warnf "Unsupported protocol and/or version: %s v%d, rejecting connection"
            protocol-name
            protocol-version)
     (mct/inc! (:mqtt-connections-unsupported-protocol-version metrics))
     (reject-connection ctx :unacceptable-protocol-version))

   (not (and has-username has-password))
   (do
     (warnf "Client has no username or password, rejecting connection")
     (when-let [c (:debug-ch handler-state)]
       (go (>!! c {:message "rejecting connection" :client-id client-id})))
     (mm/mark! (:mqtt-connections-authentication-failures metrics))
     (reject-connection ctx :bad-username-or-password))

   (not (allowed-device? (:database handler-state) client-id username password))
   (do
     (warnf "Device authentication failed for username: %s, client id: %s, rejecting connection" username client-id)
     (when-let [c (:debug-ch handler-state)]
       (go (>!! c {:client-id client-id
                   :message "Rejecting connection, check username/password"})))
     (mm/mark! (:mqtt-connections-authentication-failures metrics))
     (reject-connection ctx :bad-username-or-password))

   ;; at this point, client-id is checked against the devices table. MK.
   (not (valid-client-id? client-id))
   (do
     (warnf "Invalid client id: %s, rejecting connection" client-id)
     (reject-connection ctx :identifier-rejected))

   :otherwise
   (do
     (when-let [c (:debug-ch handler-state)]
       (go (>!! c {:message "Accepting connection" :client-id client-id})))
     (mct/inc! (:mqtt-connections-active metrics))
     (accept-connection ctx msg handler-state))))

;;
;; SUBSCRIBE
;;

;; TODO: scope these per component
;;       so they can be reset. MK.
(def subscriptions (ref {}))

(defrecord Subscriber
    [^ChannelHandlerContext ctx
     ^String topic
     ^long qos])

(defn record-subscribers
  [trie ctx topics]
  (reduce (fn [acc [topic qos]]
            (tr/insert acc topic (Subscriber. ctx topic qos)))
          trie
          topics))

(defn handle-subscribe
  [^ChannelHandlerContext ctx {:keys [topics message-id dup qos] :as msg}
   {:keys [reactor topics-by-ctx connections-by-ctx database] :as handler-state}]
  ;; example message:
  ;; {:topics [["a/topic" 1]],
  ;;  :message-id 1,
  ;;  :type :subscribe,
  ;;  :dup false,
  ;;  :qos 1,
  ;;  ;; not used per MQTT v3.1 spec (section 3.8)
  ;;  :retain false}
  (let [{:keys [client-id username]} (get @connections-by-ctx ctx)]
    (if [(every? (fn [[^String topic _]]
                   (tp/authorized-to-subscribe? database username topic))
                 topics)]
      (do
        (dosync
         (alter subscriptions record-subscribers ctx topics)
         (alter topics-by-ctx assoc-with-union ctx (set (map first topics))))
        ;; TODO: QoS > 0
        (.writeAndFlush ctx {:type :suback
                             :message-id message-id
                             :granted-qos (repeat (count topics) 0)})
        (doseq [topic topics]
          (mr/notify reactor rk/consumer-subscribed {:device_id client-id
                                                     :topic (first topic)
                                                     :owner username})))
      ;; Not allowed to subscribe to one of the topics
      (let [state (get @connections-by-ctx ctx)
            peer  (peer-of ctx)]
        (warnf "Dropping connection %s (client id: %s), unauthorized to subscribe to one of the topics: %s"
               peer (:client-id state) topics)
        (when-let [c (:debug-ch handler-state)]
          (go (>!! c
                   {:client-id client-id
                    :message (str "Client is not allowed to subscribe to one of the topics: " topics)})))
        (disconnect-client ctx)))))

(defn unrecord-subscribers
  [trie ctx topics]
  (reduce (fn [acc ^String topic]
            (tr/delete-matching acc topic (fn [^Subscriber sb]
                                            (= (.ctx sb) ctx))))
          trie
          topics))

(defn dissoc-topics
  [topics-by-ctx ctx topics]
  (let [v  (get topics-by-ctx ctx #{})
        v' (cs/difference v (set topics))]
    (assoc topics-by-ctx ctx v')))

(defn handle-unsubscribe
  [^ChannelHandlerContext ctx {:keys [topics message-id] :as msg}
   {:keys [topics-by-ctx] :as handler-state}]
  ;; example message;
  ;; {:topics ["a/topic"],
  ;;  :message-id 2,
  ;;  :type :unsubscribe,
  ;;  :dup false,
  ;;  :qos 1,
  ;;  :retain false}
  (dosync
   (alter topics-by-ctx dissoc-topics ctx topics)
   (alter subscriptions unrecord-subscribers ctx topics))
  (.writeAndFlush ctx {:type :unsuback :message-id message-id}))

;;
;; PUBLISH
;;

;; TODO: scope these by component?
;; TODO: calculate this dynamically using Runtime#availableProcessors
(def ^:const dispatch-pool-size 32)
(def ^ExecutorService dispatch-pool (Executors/newFixedThreadPool dispatch-pool-size))

(defn handle-publish-with-qos0
  [^ChannelHandlerContext publisher-ctx
   {:keys [topic qos payload] :as msg}
   handler-state]
  (let [subs (tr/matching-vals @subscriptions topic)]
    (doseq [{:keys [^ChannelHandlerContext ctx topic qos]} subs]
      (.submit dispatch-pool
               (cast Runnable (fn []
                                (.writeAndFlush ctx {:type :publish
                                                     :topic topic
                                                     :payload payload
                                                     :qos 0})))))))

(defn handle-publish-with-qos1
  [^ChannelHandlerContext ctx
   {:keys [topic qos payload] :as msg}
   handler-state]
  ;; TODO Disconnect client if we're not going to handle qos 1
  (comment "TODO"))

(defn handle-publish-with-qos2
  [^ChannelHandlerContext ctx
   {:keys [topic qos payload] :as msg}
   handler-state]
  ;; TODO Disconnect client if we're not going to handle qos 2
  (comment "TODO"))

;; 50 MB
(def ^{:private true :const true} max-allowed-payload-size 52428800)

(defn ^{:private true} valid-payload?
  [payload]
  (<= 0 (alength payload) max-allowed-payload-size))

(defn handle-publish
  [^ChannelHandlerContext ctx {:keys [qos topic payload] :as msg}
   {:keys [reactor connections-by-ctx metrics] :as handler-state}]
  ;; example message:
  ;; {:payload #<byte[] [B@1503e6b>,
  ;;  :message-id 1,
  ;;  :topic a.topic,
  ;;  :type :publish,
  ;;  :dup false,
  ;;  :qos 1,
  ;;  :retain false}
  (let [{:keys [username]} (get @connections-by-ctx ctx)]
    (let [{:keys [client-id]} (get @connections-by-ctx ctx)
          f (case qos
              0 handle-publish-with-qos0
              1 handle-publish-with-qos1
              2 handle-publish-with-qos2)]
      (if (tp/authorized-to-publish? topic username)
        (if (valid-payload? payload)
          (do
            (when-let [c (:debug-ch handler-state)]
              (go (>!! c
                       {:client-id client-id
                        :message (str "Publishing message on topic: " topic)})))
            (mt/time! (:mqtt-messages-publish-latency metrics)
                      (f ctx msg handler-state)
                      (mr/notify reactor rk/message-published {:device_id client-id
                                                               :payload payload
                                                               ;; TODO This should come from topic content/type
                                                               :content_type "application/json"
                                                               ;;:charset "UTF-8"
                                                               :topic topic
                                                               :owner username})
                      (mr/notify reactor topic {:device_id client-id
                                                               :payload payload
                                                               ;; TODO This should come from topic content/type
                                                               :content_type "application/json"
                                                               ;;:charset "UTF-8"
                                                               :topic topic
                                                               :owner username}))
            (mh/update! (:mqtt-messages-payload-size metrics) (alength payload))
            (mm/mark!   (:mqtt-messages-published metrics)))
          (do
            (warnf "Rejecting client %s for publishing a message %d in size to topic %s" client-id (alength payload) topic)
            (disconnect-client ctx)))

        ;; Not allowed to publish to this topic
        (let [state (get @connections-by-ctx ctx)
              peer  (peer-of ctx)]
          (warnf "Dropping connection %s (client id: %s), unauthorized to publish to %s" peer (:client-id state) topic)
          (when-let [c (:debug-ch handler-state)]
            (go (>!! c
                     {:client-id client-id
                      :message (str "Client is not allowed to publish a message on topic: " topic)})))
          (disconnect-client ctx))))))

;;
;; PINGREQ
;;

(defn handle-pingreq
  [^ChannelHandlerContext ctx _]
  (.writeAndFlush ctx {:type :pingresp}))

;;
;; PINGRESP
;;

(defn handle-pingresp
  [^ChannelHandlerContext ctx {:keys [connections-by-ctx]}]
  (comment "Intentional no-op, see channelRead"))

;;
;; Lost Connections, Keep Alive
;;

(defn ^:private send-pingreq
  [^ChannelHandlerContext ctx]
  (.writeAndFlush ctx {:type :pingreq}))

(defn ^:private forget-ctx
  [^ChannelHandlerContext ctx {:keys [topics-by-ctx
                                      connections-by-ctx
                                      connections-by-client-id
                                      ]}]
  (let [conn (get @connections-by-ctx ctx)]
    (when-let [^ScheduledFuture fut (:keepalive-future conn)]
      (.cancel fut true)))
  (dosync
   (let [topics              (get @topics-by-ctx ctx)
         {:keys [client-id]} (get @connections-by-ctx ctx)]
     (alter topics-by-ctx dissoc ctx)
     (alter subscriptions unrecord-subscribers ctx topics)
     (alter connections-by-ctx       dissoc ctx)
     (alter connections-by-client-id dissoc client-id)))
  ctx)

(defn ^:private handle-timeout
  [^ChannelHandlerContext ctx {:keys [connections-by-ctx]
                               :as handler-state}]
  (let [{:keys [client-id
                keepalive]} (get @connections-by-ctx ctx)]
    (warnf "Connection %s (client id: %s) is lost (keepalive: %d seconds)"
           (peer-of ctx) client-id keepalive)
    (forget-ctx ctx handler-state))
  ctx)

(defn ^:private handle-closed-tcp-connection
  [^ChannelHandlerContext ctx handler-state]
  (warnf "Connection %s is closed or lost" (peer-of ctx))
  (forget-ctx ctx handler-state)
  ctx)

;;
;; DISCONNECT
;;

(defn handle-disconnect
  [^ChannelHandlerContext ctx {:keys [metrics] :as handler-state}]
  (forget-ctx ctx handler-state)
  (mct/dec! (:mqtt-connections-active metrics))
  (abort ctx))

;;
;; Netty glue
;;

(defn make-channel-handler
  [{:keys [metrics] :as handler-state}]
  (proxy [ChannelHandlerAdapter] []
    (channelRead [^ChannelHandlerContext ctx msg]
      (case (:type msg)
        :connect (handle-connect ctx msg handler-state)
        :subscribe (handle-subscribe ctx msg handler-state)
        :unsubscribe (handle-unsubscribe ctx msg handler-state)
        :publish (handle-publish ctx msg handler-state)
        :pingreq (handle-pingreq ctx handler-state)
        :pingresp (handle-pingresp ctx handler-state)
        :disconnect (handle-disconnect ctx handler-state))
      (comment "TODO: record activity"))
    (channelInactive [^ChannelHandlerContext ctx]
      (handle-closed-tcp-connection ctx handler-state)
      (mct/dec! (:mqtt-connections-active metrics))
      (abort ctx))
    (userEventTriggered [^ChannelHandlerContext ctx evt]
      (when (instance? IdleStateEvent evt)
        (do (handle-timeout ctx handler-state)
            (abort ctx))))
    (exceptionCaught [^ChannelHandlerContext ctx cause]
      (try (throw cause)
           (finally (handle-disconnect ctx handler-state))))))

(defrecord NettyMqttHandler [connections-by-ctx connections-by-client-id topics-by-ctx
                             scheduled-keepalive-executor
                             debug-channel-provider ; optional dependency
                             ]
  component/Lifecycle
  (start [this]
    (info "MQTT transport starting...")
    (assoc this
      :handler-provider
      #(make-channel-handler
        (assoc this
          :reactor (get-in this [:reactor :reactor])
          :database (get this :database)
          :metrics (get this :metrics)
          :debug-ch (when debug-channel-provider (new-channel debug-channel-provider))))))
  (stop [this]
    (when-let [se (:scheduled-keepalive-executor this)]
      (.shutdownNow se))
    this)

  NettyHandlerProvider
  (netty-handler [this] (:handler-provider this))
  (priority [this] 20))

(defn new-netty-mqtt-handler
  []
  (-> (map->NettyMqttHandler
       {:connections-by-ctx (ref {})
        :connections-by-client-id (ref {})
        :topics-by-ctx (ref {})
        :scheduled-keepalive-executor (Executors/newScheduledThreadPool 32)})
      (component/using [:database :reactor :metrics])))
