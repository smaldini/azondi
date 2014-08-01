(ns azondi.bridges.sse
  (:require
   [com.stuartsierra.component :refer (using)]
   [bidi.bidi :refer (->Redirect)]
   [clojure.tools.logging :refer :all]
   [schema.core :as s]
   [modular.bidi :refer (WebService)]
   [org.httpkit.server :refer [run-server with-channel send! on-close close]]
   [plumbing.core :refer (<-)]
   [clojure.java.io :as io]
   [clojurewerkz.meltdown.reactor :as mr]
   [clojurewerkz.meltdown.consumers :as mc]
   [clojurewerkz.meltdown.selectors :refer (set-membership)]))

(defn read-bytes [bs cs]
  (slurp (io/reader bs :encoding cs)))

(defn server-event-source [reactor]
  (fn [{{prefix :prefix} :route-params :as req}]
    (with-channel req channel
      (send! channel
             {:headers {"Content-Type" "text/event-stream"}} false)
      (debugf "Opening firehose (prefix:%s)" prefix)
      (let [rsub
            (mr/on
             reactor
             (set-membership #{"messages.published"})
             (fn [evt]
               (when
                   (when-let [topic (-> evt :data :topic)]
                     (.startsWith topic prefix))
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
                            (mc/cancel rsub)))))))

(defrecord ServerSentEventBridge [uri-context reactor]
  WebService
  (request-handlers [component]
    {::events (server-event-source (:reactor reactor))})
  (routes [component]
    ["" [[["/events" [#".*" :prefix]] ::events]]])
  (uri-context [component]
    uri-context))

(defn new-sse-bridge [& {:as opts}]
  (->> opts
       (merge {:uri-context ""})
       (s/validate {:uri-context s/Str})
       map->ServerSentEventBridge
       (<- (using [:reactor]))))
