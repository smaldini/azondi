(ns azondi.stream-summary
  (:import (java.util.concurrent Executors TimeUnit))
  (:require  [com.stuartsierra.component :as component]
             [clojurewerkz.streampunk.stream-lib.top-k :as topk]
             [clojurewerkz.meltdown.reactor :as mr]
             [clojurewerkz.meltdown.consumers :as mc]
             [clojurewerkz.meltdown.selectors :refer (set-membership predicate match-all)]
             [org.httpkit.server :refer [run-server with-channel send! on-close close]]
             [clj-time.core :as t]
             [clj-time.predicates :refer (same-date?)]
             [clojure.tools.logging :refer :all]
             [modular.bidi :refer (WebService)]
             [cheshire.core :refer (decode decode-stream encode)]
             [schema.core :as s]
             [plumbing.core :refer (<-)]
             [azondi.db :as db]
             [azondi.messages-db :as cassdb]
             [azondi.reactor.keys :as rk]))

(def tday (atom (t/today)))

(defn write-summary-to-db [cassdb data]
  (cassdb/archive-summary! cassdb {:text_summary data}))

(defn str-date [date]
  (str (t/year date) (t/month date) (t/day date)))

;; create a topics atom
;; for each topic create a topics-tk
;; devices publishing daily
;; create fn that checks if the date is same as today
;; if it's the same 
;; if a topic exists in the map offer it offer devices to the topics-tk
;; if not offer update the topic and offer devices to the topics-tk
;; if it's not the same reset the date def atom && create a new topics + topicstk map

;;!!To do (when reset tk loses the count so needs a way of checking maybe last db write)
(defn daily-topic-summarizer [reactor cassdb]
  (let [tk (topk/stream-summary 100)
        notify-reactor (fn [evt date]
                         (when-let [topic (-> evt :data :topic)]
                           (debugf "topic is %s" topic)
                           (do (topk/offer tk {:date date :topic topic})
                               (debugf "top k are %s" (encode (topk/top-k-as-maps tk 100)))
                               (mr/notify reactor rk/topic-summary (encode {:topic-summary (topk/top-k-as-maps tk 100)})))))
        rsub
        (mr/on
         reactor
         (set-membership #{"messages.published"})
         (fn [evt]
           (if (same-date? @tday (t/now))
             (notify-reactor evt (str-date @tday))
             (notify-reactor evt (-> (reset! tday (t/today))
                                     str-date)))))]
    ;; write it to the db every 30 seconds !! this doesn't work
    (.scheduleAtFixedRate (Executors/newScheduledThreadPool 1) 
                          #(write-summary-to-db cassdb (topk/top-k-as-maps tk 100)) 0 30 TimeUnit/SECONDS)))

(defn daily-topic-device-summarizer [reactor cassdb]
  (let [tk (topk/stream-summary 100)
        notify-reactor (fn [evt date]
                         (when-let [topic (-> evt :data :topic)]
                           (debugf "daily topic is %s" topic)
                           (do (topk/offer tk {:date date :topic topic :device-id (-> evt :data :device_id)})
                               (debugf "daily device top k are %s" (encode (topk/top-k-as-maps tk 100)))
                               (mr/notify reactor rk/topic-device-summary (encode {:topic-summary (topk/top-k-as-maps tk 100)})))))
        rsub  (mr/on
               reactor
               (set-membership #{"messages.published"})
               (fn [evt]
                 (if (same-date? @tday (t/now))
                   (notify-reactor evt (str-date @tday))
                   (notify-reactor evt (-> (reset! tday (t/today))
                                           str-date)))))]
    ;;To do write it to db this doesn't work
     (.scheduleAtFixedRate (Executors/newScheduledThreadPool 1) 
                          #(write-summary-to-db cassdb (topk/top-k-as-maps tk 100)) 0 30 TimeUnit/SECONDS)
    ))


(defrecord TopicSummary []
  component/Lifecycle
  (start [this]
    (debugf "topic device %s" (daily-topic-device-summarizer (:reactor (:reactor this)) (:cassandra this)))
    (-> this
        (assoc :topic-summarizer (daily-topic-summarizer (:reactor (:reactor this)) (:cassandra this)))
        (assoc :topic-device-summarizer (daily-topic-device-summarizer (:reactor (:reactor this)) (:cassandra this)))))
  (stop [this] this))


(defn new-topic-summarizer []
  (component/using (->TopicSummary) [:cassandra :reactor]))



