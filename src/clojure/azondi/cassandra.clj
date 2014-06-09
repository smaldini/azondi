(ns azondi.cassandra
  "Cassandra connectivity and schema management"
  (:require [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql    :as cql]
            [com.stuartsierra.component     :as component]))

(defrecord Database [hosts keyspace]
  component/Lifecycle
  (start [this]
    (let [conn (cc/connect hosts)]
      (cql/use-keyspace conn keyspace)
      (assoc this :session conn)))
  (stop [this] this))

(defn new-database
  [{:keys [hosts keyspace] :as opts}]
  (assert hosts "Cassandra hosts are not configured!")
  (assert keyspace "Cassandra keyspace is not configured!")
  (map->Database opts))
