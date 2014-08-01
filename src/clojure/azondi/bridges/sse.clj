(ns azondi.bridges.sse
  (:require
   [com.stuartsierra.component :refer (using)]
   [clojure.tools.logging :refer :all]
   [schema.core :as s]
   [modular.bidi :refer (WebService)]
   [org.httpkit.server :refer [run-server with-channel send! on-close close]]
   [plumbing.core :refer (<-)]
   [clojure.java.io :as io]
   [clojurewerkz.meltdown.reactor :as mr]
   [clojurewerkz.meltdown.consumers :as mc]
   [clojurewerkz.meltdown.selectors :refer (match-all predicate set-membership)]))

(defn read-bytes [bs cs]
  (slurp (io/reader bs :encoding cs)))

(defn server-event-source [reactor]
  (fn [req]
    (with-channel req channel
      (send! channel
             {:headers {"Content-Type" "text/event-stream"}} false)
      (let [rsub (mr/on
                  reactor
                  (set-membership #{"messages.published"})
                  (fn [evt]
                    (send! channel
                           (let [{:keys [charset] :as data} (:data evt)]
                             ;; TODO Where are we getting application/json from?
                             (str "data: " (cond-> data
                                                   charset
                                                   (update-in [:payload] read-bytes charset)
                                                   ) "\r\n\r\n"))
                           false)))]
        (on-close channel (fn [status]
                            (debugf "Closing firehose")
                            (mc/cancel rsub)))))))

(defrecord ServerSentEventBridge [uri-context reactor]
  WebService
  (request-handlers [component] {::events (server-event-source (:reactor reactor))})
  (routes [component] ["/events" ::events])
  (uri-context [component] uri-context))

(defn new-sse-bridge [& {:as opts}]
  (->> opts
       (merge {:uri-context ""})
       (s/validate {:uri-context s/Str})
       map->ServerSentEventBridge
       (<- (using [:reactor]))))
