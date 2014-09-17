(ns azondi.bridges.sse
  (:require
   [com.stuartsierra.component :refer (using)]
   [azondi.db :refer (subscriptions-by-owner get-topic)]
   [azondi.stream-summary :as stream]
   [azondi.reactor.keys :as rk]
   [bidi.bidi :refer (->Redirect)]
   [cheshire.core :refer (decode decode-stream encode)]
   [clojure.tools.logging :refer :all]
   [schema.core :as s]
   [modular.bidi :refer (WebService)]
   [org.httpkit.server :refer [run-server with-channel send! on-close close]]
   [plumbing.core :refer (<-)]
   [clojure.java.io :as io]
   [clojurewerkz.meltdown.reactor :as mr]
   [clojurewerkz.meltdown.consumers :as mc]
   [clojurewerkz.meltdown.selectors :refer (set-membership predicate match-all)]
   [cylon.authentication :refer (authenticate)]
   [org.httpkit.timer :refer (schedule-task)]
   [clojure.core.async :as async :refer (go <! Mult Pub tap untap chan close!)]
   [schema.core :as s]))

(defn read-bytes [bs cs]
  (slurp (io/reader bs :encoding cs)))

(defn server-event-source [reactor authorizer database]
  (fn [{{prefix :prefix} :route-params :as req}]
    (let [user (:cylon/user (authenticate (:authenticator authorizer) req))]
      (if user
        (with-channel req channel
          (send! channel
                 {:headers {"Content-Type" "text/event-stream"}} false)
          (debugf "Opening firehose (prefix:%s)" prefix)
          (debugf "Subscriptions are: [%s]" (apply str (interpose " " (map :topic (subscriptions-by-owner database user)))))
          (assert reactor)
          (debugf "Reactor is %s" reactor)
          (let [subscribed-topics (set (map :topic (subscriptions-by-owner database user)))
                rsub
                (mr/on
                 reactor
                 ;; QUESTION (for MK): it appears from ws.clj that we
                 ;; should be able to select on topics, instead of these
                 ;; general 'messages.published' key - is this the
                 ;; ultimate goal?
                 (set-membership #{"messages.published"})
                 (fn [evt]
                   (when
                       (when-let [topic (-> evt :data :topic)]
                         (and
                          (contains? subscribed-topics topic)
                          (.startsWith topic prefix)))
                     (send! channel
                            (let [{:keys [charset] :as data} (:data evt)]
                              (str "data: "
                                   (encode (-> data
                                               (update-in [:payload] read-bytes charset)))
                                   "\r\n\r\n"))
                            false))))]
            (on-close channel (fn [status]
                                (debugf "Closing firehose")
                                (mc/cancel rsub)))))
        {:status 401
         :body "Unauthorized access to event stream"}))))

(defn server-event-source-debug [async-pub]
  (fn [{{:keys [client-id]} :route-params :as req}]
    (let [ch (chan 16)]
      (async/sub async-pub client-id ch)
      (with-channel req channel
        (on-close channel
                  (fn [_]
                    (async/unsub async-pub client-id ch)
                    (close! ch)))
        (send! channel {:headers {"Content-Type" "text/event-stream"}} false)
        (go
          (loop []
            (when-let [data (<! ch)]
              (send! channel
                     (str "data: " (-> data (assoc :time (System/currentTimeMillis)) encode) "\r\n\r\n")
                     false)
              (recur))))))))


(defn server-public-topic-source [reactor database]
  (fn [{{prefix :prefix} :route-params :as req}]
    (with-channel req channel
      (send! channel
             {:headers {"Content-Type" "text/event-stream"}} false)
      (let [rsub
            (mr/on
             reactor
             ;; select on the topic
             (set-membership #{prefix})
             (fn [evt]
               (when
                   (when-let [topic (-> evt :data :topic)]
                     (and
                      (let [public-topic? (-> (get-topic database topic)
                                              :public)]
                        public-topic?)))
                 (debugf "Sending event source")
                 (send! channel
                        (let [{:keys [charset] :as data} (:data evt)]
                          (str "data: "
                               (encode (-> data
                                               (update-in [:payload] read-bytes charset)))
                               "\r\n\r\n"))
                        false))))]
        (on-close channel (fn [status]
                            (debugf "Closing firehose")
                            (mc/cancel rsub)))))))

(defn topic-stream-summary [reactor database]
  (fn [req]
    (with-channel req channel
      (send! channel
             {:headers {"Content-Type" "text/event-stream"}} false)
      (let [rsub
            (mr/on reactor
                   (set-membership #{rk/topic-summary})
                   (fn [evt]
                     (when-let [topic (-> evt :data :topic)]
                       (and
                        (let [public-topic? (-> (get-topic database topic) :public)]
                          public-topic?))
                       (send! channel
                              (str "data: "
                                   (encode evt)
                                   "\r\n\r\n")
                              false))))]
        (on-close channel (fn [status]
                            (debugf "Closing firehose")
                            (mc/cancel rsub)))))))

(defn topic-device-stream-summary [reactor database]
  (fn [req ;;{{prefix :prefix} :route-params :as req}
       ]
    (with-channel req channel
      (send! channel
             {:headers {"Content-Type" "text/event-stream"}} false)
      (let [rsub
            (mr/on reactor
                   (set-membership #{rk/topic-device-summary})
                   (fn [evt]
                     (debug "topic stream %s" evt)
                     (when-let [data (-> evt :data)]
                       (debug "topic summary %s" data)
                       (send! channel
                              (str data
                                   "\r\n\r\n")
                              false))))]
        (on-close channel (fn [status]
                            (debugf "Closing firehose")
                            (mc/cancel rsub)))))))

(defn handlers [reactor authorizer database]
  {:events (server-event-source reactor authorizer database)
   :topics (server-public-topic-source reactor database)
   :topic-summary (topic-stream-summary reactor database)
   :topic-device-summary (topic-device-stream-summary reactor database)
   })

(def routes
  ["/" [[["public-stream" [#".*" :prefix]] :topics]
        [["events" [#".*" :prefix]] :events]
        ["topic-summary" {"" :topic-summary
			  [[#".*" :prefix]] :topic-device-summary}          
          ]]])

(defrecord ServerSentEventBridge [uri-context reactor authorizer database]
  WebService
  (request-handlers [_] (handlers (:reactor reactor) authorizer database))
  (routes [_] routes)
  (uri-context [_] uri-context))

(defn new-sse-bridge [& {:as opts}]
  (->> opts
       (merge {:uri-context ""})
       (s/validate {:uri-context s/Str})
       map->ServerSentEventBridge
       (<- (using [:reactor :authorizer :database]))))

(defrecord EventService [async-pub]
  WebService
  (request-handlers [_] {::events (server-event-source-debug async-pub)})
  (routes [_] ["/" {[[#"\d+" :client-id]] ::events}])
  (uri-context [_] "/debug-events"))

(defn new-event-service-debug [& {:as opts}]
  (->> opts
       (s/validate {:async-pub (s/protocol Pub)})
       map->EventService))
