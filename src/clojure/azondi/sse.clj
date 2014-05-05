(ns azondi.sse
  (:require
   [modular.bidi :refer (WebService)]
   [org.httpkit.server :refer (with-channel send! on-close)]
   [org.httpkit.timer :refer (schedule-task)]
   [clojure.core.async :as async :refer (go <! Mult Pub tap untap chan close!)]
   [cheshire.core :refer (decode decode-stream encode)]
   [schema.core :as s]))

(defn server-event-source [async-pub]
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

(defrecord EventService [async-pub]
  WebService
  (ring-handler-map [_] {::events (server-event-source async-pub)})
  (routes [_] ["/" {[[#"\d+" :client-id]] ::events}])
  (uri-context [_] "/events"))

(defn new-event-service [& {:as opts}]
  (->> opts
       (s/validate {:async-pub (s/protocol Pub)})
       map->EventService))
