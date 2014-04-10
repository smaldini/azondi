;; Copyright © 2014, OpenSensors.IO. All Rights Reserved.
(ns azondi.transports.mqtt
  (:require
            [com.stuartsierra.component :as component]
            [modular.netty :refer (NettyHandlerProvider)]
            [taoensso.timbre :refer [log  trace  debug  info  warn  error  fatal
                                     logf tracef debugf infof warnf errorf fatalf]]
            [clojurewerkz.triennium.mqtt :as tr]

            [clojure.set :as cs]
            [clojurewerkz.meltdown.reactor :as mr]
            [azondi.authentication :refer (allowed-device?)]
            [clojurewerkz.meltdown.selectors :as ms :refer [$]])

  (:import  [io.netty.channel ChannelHandlerAdapter ChannelHandlerContext Channel]
            java.net.InetSocketAddress
            [java.util.concurrent ExecutorService Executors]))

;;
;; Implementation
;;

(def ^:const supported-protocol-names #{["MQIsdp" 3]
                                        ["MQTT"   4]})

(defn ^{:private true} assoc-with-union
  [m k v]
  (assoc m k (cs/union (get m k) v)))

;;
;; CONNECT
;;

(defn supported-protocol?
  [^String protocol-name ^long protocol-version]
  (supported-protocol-names [protocol-name protocol-version]))

(defn disconnect-client
  [^ChannelHandlerContext ctx]
  (doto ctx
    (.writeAndFlush {:type :disconnect})
    .close))

(defn abort
  [^ChannelHandlerContext ctx]
  (.close ctx))

(defn valid-client-id?
  [^String client-id]
  ;; Section 3.1: valid client ids are between 1 and 23 characters
  (<= 1 (.length client-id) 23))

(defn ^:private maybe-disconnect
  "Disconnects existing client with the given client id, if any.

   See section 3.1."
  [^String client-id {:keys [connections-by-ctx connections-by-client-id]}]
  (if-let [state (get @connections-by-client-id client-id)]
    (let [ctx (:ctx state)]
      (warnf "Disconnecting existing connection with client id %s" client-id)
      (disconnect-client ctx)
      (dosync
       (alter connections-by-client-id dissoc client-id)
       (alter connections-by-ctx       dissoc ctx))
      ctx)))

(defn ^InetSocketAddress peer-of
  [^ChannelHandlerContext ctx]
  (let [^Channel ch (.channel ctx)]
    (cast InetSocketAddress (.remoteAddress ch))))

(defn accept-connection
  [^ChannelHandlerContext ctx {:keys [username client-id has-will
                                      clean-session]
                               :as   msg}
   {:keys [connections-by-ctx connections-by-client-id] :as handler-state}]
  (let [conn {:username  username
              :client-id client-id
              :ctx       ctx
              :has-will  has-will
              :will-qos  (when has-will
                           (:will-qos msg))}]
    (maybe-disconnect client-id handler-state)
    (dosync
     (alter connections-by-ctx       assoc ctx conn)
     (alter connections-by-client-id assoc client-id conn))
    (.writeAndFlush ctx {:type :connack :return-code :accepted})
    (let [^InetSocketAddress peer-host (peer-of ctx)]
      (infof "Accepted connection from %s (client id: %s)" peer-host client-id))
    conn))

(defn reject-connection
  [^ChannelHandlerContext ctx code]
  (doto ctx
    (.writeAndFlush {:type :connack :return-code code})
    .close)
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
   handler-state]
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

  (let [authenticator (:device-authenticator handler-state)]
    (cond
     (not (supported-protocol? protocol-name protocol-version))
     (do
       (warnf "Unsupported protocol and/or version: %s v%d, rejecting connection"
              protocol-name
              protocol-version)
       (reject-connection ctx :unacceptable-protocol-version))

     (not (and has-username has-password))
     (do
       (warnf "Client has no username or password, rejecting connection")
       (reject-connection ctx :bad-username-or-password))

     (not (allowed-device? authenticator client-id username password))
     (do
       (warnf "Device authentication failed, rejecting connection")
       (reject-connection ctx :bad-username-or-password))

     ;; TODO: check known devices table, too
     (not (valid-client-id? client-id))
     (do
       (warnf "Invalid client id: %s, rejecting connection" client-id)
       (reject-connection ctx :identifier-rejected))

     :otherwise
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
   {:keys [topics-by-ctx] :as handler-state}]
  ;; example message:
  ;; {:topics [["a/topic" 1]],
  ;;  :message-id 1,
  ;;  :type :subscribe,
  ;;  :dup false,
  ;;  :qos 1,
  ;;  ;; not used per MQTT v3.1 spec (section 3.8)
  ;;  :retain false}
  (dosync
   (alter subscriptions record-subscribers ctx topics)
   (alter topics-by-ctx assoc-with-union ctx (set (map first topics))))
  ;; TODO: QoS > 0
  (.writeAndFlush ctx {:type :suback
                       :message-id message-id
                       :granted-qos (repeat (count topics) 0)}))

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
  (comment "TODO"))

(defn handle-publish-with-qos2
  [^ChannelHandlerContext ctx
   {:keys [topic qos payload] :as msg}
   handler-state]
  (comment "TODO"))

(defn handle-publish
  [^ChannelHandlerContext ctx {:keys [qos topic payload] :as msg}
   {:keys [reactor] :as handler-state}]
  ;; example message:
  ;; {:payload #<byte[] [B@1503e6b>,
  ;;  :message-id 1,
  ;;  :topic a.topic,
  ;;  :type :publish,
  ;;  :dup false,
  ;;  :qos 1,
  ;;  :retain false}
  (let [f (case qos
            0 handle-publish-with-qos0
            1 handle-publish-with-qos1
            2 handle-publish-with-qos2)]
    (f ctx msg handler-state)
    (debugf "Handled a message on topic %s, notifying reactor..." topic)
    (mr/notify reactor topic payload)))

;;
;; PINGREQ
;;

(defn handle-pingreq
  [^ChannelHandlerContext ctx _]
  (.writeAndFlush ctx {:type :pingresp}))

;;
;; DISCONNECT
;;

(defn handle-disconnect
  [^ChannelHandlerContext ctx {:keys [topics-by-ctx
                                      connections-by-ctx
                                      connections-by-client-id]}]
  (dosync
   (let [topics              (get @topics-by-ctx ctx)
         {:keys [client-id]} (get @connections-by-ctx ctx)]
     (alter topics-by-ctx dissoc ctx)
     (alter subscriptions unrecord-subscribers ctx topics)
     (alter connections-by-ctx       dissoc ctx)
     (alter connections-by-client-id dissoc client-id)))
  (.close ctx))

;;
;; Netty glue
;;

(defn make-channel-handler
  [handler-state]
  (proxy [ChannelHandlerAdapter] []
    (channelRead [^ChannelHandlerContext ctx msg]
      (case (:type msg)
        :connect     (handle-connect     ctx msg handler-state)
        :subscribe   (handle-subscribe   ctx msg handler-state)
        :unsubscribe (handle-unsubscribe ctx msg handler-state)
        :publish     (handle-publish     ctx msg handler-state)
        :pingreq     (handle-pingreq     ctx handler-state)
        :disconnect  (handle-disconnect  ctx handler-state)))
    (exceptionCaught [^ChannelHandlerContext ctx cause]
      (try (throw cause)
           (finally (abort ctx))))))

(defrecord NettyMqttHandler [connections-by-ctx connections-by-client-id topics-by-ctx]
  component/Lifecycle
  (start [this]
    (infof "netty mqtt handler starting... %s" (keys this))
    (assoc this
      :handler-provider
      #(make-channel-handler
        (assoc this :reactor (get-in this [:reactor :reactor])))))
  (stop [this] this)

  NettyHandlerProvider
  (netty-handler [this] (:handler-provider this))
  (priority [this] 20))

(defn new-netty-mqtt-handler []
  (-> (map->NettyMqttHandler {:connections-by-ctx (ref {})
                              :connections-by-client-id (ref {})
                              :topics-by-ctx (ref {})})
      (component/using [:reactor])))
