(ns azondi.sse
  (:require
   [modular.bidi :refer (WebService)]
   [org.httpkit.server :refer (with-channel send! on-close)]
   [org.httpkit.timer :refer (schedule-task)]
   [clojure.core.async :refer (go <! Mult tap untap chan close!)]
   [cheshire.core :refer (decode decode-stream encode)]
   [schema.core :as s]))

(defn server-event-source [source]
  (fn [{{:keys [client-id]} :route-params :as req}]
    (let [ch (chan 16)]
      (tap source ch)
      (with-channel req channel
        (on-close channel (fn [_]
                            (untap source ch)
                            (close! ch)))
        (send! channel {:headers {"Content-Type" "text/event-stream"}} false)
        (go
          (loop []
            (when-let [data (<! ch)]
              (send! channel
                     (str "data: " (-> data (assoc :date (System/currentTimeMillis)) encode) "\r\n\r\n")
                     false)
              (recur))))))))

(defrecord EventService [source]
  WebService
  (ring-handler-map [_] {::events (server-event-source source)})
  (routes [_] ["/" {[[#"\d+" :client-id]] ::events}])
  (uri-context [_] "/events"))

(defn new-event-service [& {:as opts}]
  (->> opts
       (s/validate {:source (s/protocol Mult)})
       map->EventService))
