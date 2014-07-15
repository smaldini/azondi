(ns azondi.cassandra
  "Cassandra connectivity and schema management"
  (:require [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query :refer (where)]
            [clj-time.core   :as tc]
            [clj-time.format :as tf]
            [com.stuartsierra.component  :as component]
            [azondi.db.protocol :refer (Messagestore)]))

(def ^:const table "messages")
(def date-and-hour-formatter (tf/formatter "yyyy-MM-dd HH"))

(defrecord Database [hosts keyspace]
  component/Lifecycle
  (start [this]
    (let [conn (cc/connect hosts)]
      (cql/use-keyspace conn keyspace)
      (assoc this :session conn)))
  (stop [this] this)
  Messagestore
  (messages-by-owner [this owner]
    (cql/select (:session this) table (where {:owner owner})))
  (messages-by-device [this device-id]
    (cql/select (:session this) table (where {:device_id device-id})))
  (messages-by-topic [this topic]
    (cql/select (:session this) table (where {:topic topic})))
  (archive-message! [this data]
    (let [now (tc/now)]
      (cql/insert-async (:session this) table
                        (merge data
                               {:created_at    (.toDate now)
                                :date_and_hour (tf/unparse date-and-hour-formatter now)})))))

(defn new-database
  [{:keys [hosts keyspace] :as opts}]
  (assert hosts "Cassandra hosts are not configured!")
  (assert keyspace "Cassandra keyspace is not configured!")
  (map->Database opts))
