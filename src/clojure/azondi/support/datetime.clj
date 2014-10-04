(ns azondi.support.datetime
  (:require [clj-time.coerce :as cc]
            [clj-time.core :refer [millis]]
            [clj-time.periodic :refer [periodic-seq]]))

;;
;; Implementation
;;




;;
;; API
;;

(defn periodic-seq-from-millis
  "Produces a DateTime sequence (range) from time-since-Epoch
   range boundaries and step, all in milliseconds"
  ([^Long start-millis ^Long step-in-millis]
     (let [s (cc/from-long start-millis)
           p (millis step-in-millis)]
       (periodic-seq s p)))
  ([^Long start-millis ^Long end-millis ^Long step-in-millis]
     (let [s (cc/from-long start-millis)
           e (cc/from-long end-millis)
           p (millis step-in-millis)]
       (periodic-seq s e p))))
