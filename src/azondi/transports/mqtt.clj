;; Copyright © 2014, OpenSensors.IO. All Rights Reserved.
(ns azondi.transports.mqtt
  (:require jig
            [jig.util :refer [satisfying-dependency]]
            [taoensso.timbre :refer [log  trace  debug  info  warn  error  fatal
                                     logf tracef debugf infof warnf errorf fatalf]]
            [clojurewerkz.triennium.mqtt :as tr]
            [azondi.authentication :as auth]
            [clojure.set :as cs]
            [clojurewerkz.meltdown.reactor :as mr])
  (:import  [io.netty.channel ChannelHandlerAdapter ChannelHandlerContext Channel]
            jig.Lifecycle
            java.net.InetSocketAddress
            [java.util.concurrent ExecutorService Executors]))

;;
;; Implementation
;;

(def ^:const supported-mqtt-protocol "MQIsdp")
(def ^:const supported-mqtt-version  3)

(defn ^{:private true} assoc-with-union
  [m k v]
  (assoc m k (cs/union (get m k) v)))

;;
;; CONNECT
;;

(defn supported-protocol?
  [^String protocol-name ^long protocol-version]
  (and (= protocol-name    supported-mqtt-protocol)
       (= protocol-version supported-mqtt-version)))

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
      (println (format "Disconnecting existing connection with client id %s" client-id))
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
      (debugf "Accepted connection from %s" peer-host))
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
   handler-state system]
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
  (if (supported-protocol? protocol-name protocol-version)
    (if (and has-username has-password
             (auth/authenticates? username password))
      (if (valid-client-id? client-id)
        (accept-connection ctx msg handler-state)
        (reject-connection ctx :bad-username-or-password))
      (reject-connection ctx :bad-username-or-password))
    (do
      (warnf "Unsupported protocol and/or version: %s v%d, disconnecting"
             protocol-name
             protocol-version)
      (reject-connection ctx :unacceptable-protocol-version))))

;;
;; SUBSCRIBE
;;

;; TODO: these have to be scoped per Jig component
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
   {:keys [topics-by-ctx] :as handler-state} system]
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

(defn handle-unsubscribe
  [^ChannelHandlerContext ctx {:keys [topics message-id] :as msg}
   {:keys [topics-by-ctx] :as handler-state} system]
  ;; example message;
  ;; {:topics ["a/topic"],
  ;;  :message-id 2,
  ;;  :type :unsubscribe,
  ;;  :dup false,
  ;;  :qos 1,
  ;;  :retain false}
  (dosync
   (alter topics-by-ctx dissoc ctx)
   (alter subscriptions unrecord-subscribers ctx topics))
  (.writeAndFlush ctx {:type :unsuback :message-id message-id}))

;;
;; PUBLISH
;;

;; TODO: scope these by Jig component?
;; TODO: calculate this dynamically using Runtime#availableProcessors
(def ^:const dispatch-pool-size 32)
(def ^ExecutorService dispatch-pool (Executors/newFixedThreadPool dispatch-pool-size))

(defn handle-publish-with-qos0
  [^ChannelHandlerContext publisher-ctx
   {:keys [topic qos payload] :as msg}
   handler-state system]
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
   handler-state system]
  (comment "TODO"))

(defn handle-publish-with-qos2
  [^ChannelHandlerContext ctx
   {:keys [topic qos payload] :as msg}
   handler-state system]
  (comment "TODO"))

(defn handle-publish
  [^ChannelHandlerContext ctx {:keys [qos] :as msg}
   handler-state {:keys [reactor] :as system}]
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
    (f ctx msg handler-state system)))

;;
;; PINGREQ
;;

(defn handle-pingreq
  [^ChannelHandlerContext ctx _ _]
  (.writeAndFlush ctx {:type :pingresp}))

;;
;; DISCONNECT
;;

(defn handle-disconnect
  [^ChannelHandlerContext ctx _ _]
  (.close ctx))

;;
;; Netty glue
;;

(defn make-channel-handler
  [system {:keys [channel
                  connections-by-ctx
                  connections-by-client-id]
           :as handler-state}]
  (proxy [ChannelHandlerAdapter] []
    (channelRead [^ChannelHandlerContext ctx msg]
      (case (:type msg)
        :connect     (handle-connect     ctx msg handler-state system)
        :subscribe   (handle-subscribe   ctx msg handler-state system)
        :unsubscribe (handle-unsubscribe ctx msg handler-state system)
        :publish     (handle-publish     ctx msg handler-state system)
        :pingreq     (handle-pingreq     ctx handler-state system)
        :disconnect  (handle-disconnect  ctx handler-state system)))
    (exceptionCaught [^ChannelHandlerContext ctx cause]
      (try (throw cause)
           (finally (abort ctx))))))

(deftype NettyMqttHandler [config]
  Lifecycle
  (init [_ system] system)
  (start [_ system]
    (let [id            (:jig/id config)
          shared-state  {:reactor       (mr/create)}
          handler-state (merge shared-state {:connections-by-ctx (ref {})
                                             :connections-by-client-id (ref {})
                                             :topics-by-ctx (ref {})})
          system'       (merge system
                               {id (merge {jig.netty.mqtt/handler-factory-key #(make-channel-handler system handler-state)}
                                          shared-state)})]
      system'))
  (stop [_ system] system))
