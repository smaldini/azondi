(ns azondi.bridges.sse
  (:require
   [com.stuartsierra.component :refer (using)]
   [azondi.db :refer (subscriptions-by-owner)]
   [bidi.bidi :refer (->Redirect)]
   [clojure.tools.logging :refer :all]
   [schema.core :as s]
   [modular.bidi :refer (WebService)]
   [org.httpkit.server :refer [run-server with-channel send! on-close close]]
   [plumbing.core :refer (<-)]
   [clojure.java.io :as io]
   [clojurewerkz.meltdown.reactor :as mr]
   [clojurewerkz.meltdown.consumers :as mc]
   [clojurewerkz.meltdown.selectors :refer (set-membership predicate)]
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
          (debugf "Subscriptions are: %s" (apply str (map :topic (subscriptions-by-owner database user))))
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
                                   (cond-> data
                                           charset
                                           (update-in [:payload] read-bytes charset))
                                   "\r\n\r\n"))
                            false))))]
            (on-close channel (fn [status]
                                (debugf "Closing firehose")
                                (mc/cancel rsub)))))
        {:status 403
         :body "Unauthorized access to event stream"}
        ))))

(defrecord ServerSentEventBridge [uri-context reactor authorizer database]
  WebService
  (request-handlers [component]
    {::events (server-event-source (:reactor reactor) authorizer database)})
  (routes [component]
    ["" [[["/events" [#".*" :prefix]] ::events]]])
  (uri-context [component]
    uri-context))

(defn new-sse-bridge [& {:as opts}]
  (->> opts
       (merge {:uri-context ""})
       (s/validate {:uri-context s/Str})
       map->ServerSentEventBridge
       (<- (using [:reactor :authorizer :database]))))
