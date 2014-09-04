(ns azondi.bridges.sse
  (:require
   [com.stuartsierra.component :refer (using)]
   [azondi.db :refer (subscriptions-by-owner get-topic)]
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
   [cylon.authentication :refer (authenticate)]))

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
                                   (encode (cond-> data
                                                   charset
                                                   (update-in [:payload] read-bytes charset)))
                                   "\r\n\r\n"))
                            false))))]
            (on-close channel (fn [status]
                                (debugf "Closing firehose")
                                (mc/cancel rsub)))))
        {:status 401
         :body "Unauthorized access to event stream"}))))


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
                 (send! channel
                        (let [{:keys [charset] :as data} (:data evt)]
                          (str "data: "
                               (encode (cond-> data
                                               charset
                                               (update-in [:payload] read-bytes charset)))
                               "\r\n\r\n"))
                        false))))]
        (on-close channel (fn [status]
                            (debugf "Closing firehose")
                            (mc/cancel rsub)))))))


(defn handlers [reactor authorizer database]
  {:events (server-event-source reactor authorizer database)
   :topics (server-public-topic-source reactor database)})

(def routes
  ["/" [[["public-stream" [#".*" :prefix]] :topics]
        [["events" [#".*" :prefix]] :events]]])

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
