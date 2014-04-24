(ns azondi.data.cassandra
  "Cassandra connectivity and schema management"
  (:require
            [com.stuartsierra.component :as component]))

(defn converge-schema
  [_]
  )

(defrecord Database [hosts keyspace]
  component/Lifecycle
  (start [this]
    (let [session nil #_(cc/connect! hosts)]
      #_(create-keyspace keyspace
                       (with {:replication
                              {:class              "SimpleStrategy"
                               ;; TODO: this needs to be dynamically configured
                               :replication_factor 3}})
                       (if-not-exists))
      #_(use-keyspace keyspace)
      #_(converge-schema session)
      this))
  (stop [this] this))

(defn new-database
  [{:keys [hosts keyspace] :as opts}]
  (assert hosts "Cassandra hosts are not configured!")
  (assert keyspace "Cassandra keyspace is not configured!")
  (map->Database opts))
