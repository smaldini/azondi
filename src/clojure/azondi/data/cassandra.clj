(ns azondi.data.cassandra
  "Cassandra connectivity and schema management"
  (:require [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql :refer :all]
            [clojurewerkz.cassaforte.query :refer :all]
            [com.stuartsierra.component :as component]))

(defn converge-schema
  [_]
  )

(defrecord Database [hosts keyspace]
  component/Lifecycle
  (start [this]
    (let [session (cc/connect! hosts)]
      (create-keyspace keyspace
                       (with {:replication
                              {:class              "SimpleStrategy"
                               ;; TODO: this needs to be dynamically configured
                               :replication_factor 3}})
                       (if-not-exists))
      (use-keyspace keyspace)
      (converge-schema session)
      this))
  (stop [this] this))

(defn new-database
  [{:keys [hosts keyspace] :as opts}]
  (assert hosts "Cassandra hosts are not configured!")
  (assert keyspace "Cassandra keyspace is not configured!")
  (map->Database opts))
