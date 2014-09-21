(ns azondi.cassandra
  "Cassandra connectivity and schema management"
  (:require [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query :refer (where allow-filtering)]
            [clj-time.core   :as tc]
            [clj-time.format :as tf]
            [clj-time.core :as t]
            [clojure.tools.logging :refer :all]
            [com.stuartsierra.component  :as component]
            [azondi.db.protocol :refer (MessageStore TopicSummaryStore)]))

(def ^:const table "messages")
(def ^:const summary-table "topic_summary")
(def date-and-hour-formatter (tf/formatter "yyyy-MM-dd HH"))


(defn- filter-date [start-date end-date]
  [:created_at [>= (.toDate start-date)]
   :created_at [<= (.toDate end-date)]])

(defrecord Database [hosts keyspace]
  component/Lifecycle
  (start [this]
    (let [conn (cc/connect hosts)]
      (cql/use-keyspace conn keyspace)
      (assoc this :session conn)))
  (stop [this] this)
  MessageStore
  (messages-by-owner [this owner]
    (cql/select (:session this) table (where {:owner owner})))

  (messages-by-owner-and-date [this owner start-date end-date]
    (cql/select (:session this) table
                (apply where (conj (filter-date start-date end-date) :owner owner))
                (allow-filtering true)))

  (messages-by-device [this device-id]
    (cql/select (:session this) table (where {:device_id device-id})))

  (messages-by-device-and-date [this device-id start-date end-date]
    (cql/select (:session this) table
                (apply where (conj (filter-date start-date end-date) :device_id device-id))
                (allow-filtering true)))

  (messages-by-topic [this topic]
    (cql/select (:session this) table (where {:topic topic})))

  (messages-by-topic-and-date [this topic start-date end-date]
    (cql/select (:session this) table
                (apply where (conj (filter-date start-date end-date) :topic topic))
                (allow-filtering true)))

  (messages-by-date [this  start-date end-date]
    (cql/select (:session this) table
                (apply where (conj (filter-date start-date end-date)))
                (allow-filtering true)))

  (archive-message! [this data]
    (let [now (tc/now)]
      (cql/insert (:session this) table
                  (merge data
                         {:created_at    (.toDate now)
                          :date_and_hour (tf/unparse date-and-hour-formatter now)}))))

  TopicSummaryStore
  (archive-summary! [this data]
    (let [now (tc/now)]
      (cql/insert (:session this) summary-table
                  (merge data
                         {:created_at    (.toDate now)
                          :date_and_hour (tf/unparse date-and-hour-formatter now)})))))

(defn new-database
  [{:keys [hosts keyspace] :as opts}]
  (assert hosts "Cassandra hosts are not configured!")
  (assert keyspace "Cassandra keyspace is not configured!")
  (map->Database opts))
