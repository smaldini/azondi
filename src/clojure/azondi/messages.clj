(ns azondi.messages
  "Stores messages for time series charting and analysis"
  (:require
            [clojurewerkz.meltdown.reactor :as mr]
            [clojurewerkz.meltdown.consumers :as mc]
            [clojurewerkz.meltdown.selectors :refer [match-all]]
            [clj-time.core   :as tc]
            [clj-time.format :as tf]
            [com.stuartsierra.component :as component]))

(def ^:const collection "messages")
(def date-and-hour-formatter (tf/formatter "yyyy-MM-dd HH"))

(defn archive-message
  [data]
  (let [now (tc/now)]
    #_(cql/insert collection (merge data
                                {:created_at    (.toDate now)
                                 :date_and_hour (tf/unparse date-and-hour-formatter now)}))))

(defrecord MessageArchiver []
  component/Lifecycle
  (start [this]
    (let [r   (get-in this [:reactor :reactor])
          sub (mr/on r (match-all) (fn [{:keys [data]}]
                                     (archive-message data)))]
      (-> this
          (assoc :subscription sub))))
  (stop [this]
    (let [sub (get this :subscription)]
      (mc/cancel sub)
      this)))

(defn new-message-archiver
  []
  (-> (MessageArchiver.)
      (component/using [:reactor])))
