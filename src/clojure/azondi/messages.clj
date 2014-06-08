(ns azondi.messages
  "Stores messages for time series charting and analysis"
  (:require [clojurewerkz.cassaforte.cql :as cql]
            [clojurewerkz.meltdown.reactor :as mr]
            [clojurewerkz.meltdown.consumers :as mc]
            [clojurewerkz.meltdown.selectors :refer [$]]
            [clj-time.core   :as tc]
            [clj-time.format :as tf]
            [com.stuartsierra.component :as component]))

(def ^:const table "messages")
(def date-and-hour-formatter (tf/formatter "yyyy-MM-dd HH"))

(defn archive-message
  [db data]
  (let [now (tc/now)]
    (cql/insert-async db table (merge data
                                      {:created_at    (.toDate now)
                                       :date_and_hour (tf/unparse date-and-hour-formatter now)}))))

(defrecord MessageArchiver []
  component/Lifecycle
  (start [this]
    (let [r   (get-in this [:reactor :reactor])
          db  (get-in this [:cassandra :session])
          sub (mr/on r ($ "messages.inbound") (fn [{:keys [data]}]
                                                (archive-message db data)))]
      (-> this
          (assoc :subscription sub))))
  (stop [this]
    (let [sub (get this :subscription)]
      (mc/cancel sub)
      this)))

(defn new-message-archiver
  []
  (-> (MessageArchiver.)
      (component/using [:reactor :cassandra])))
