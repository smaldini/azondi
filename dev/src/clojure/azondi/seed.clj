(ns azondi.seed
  "Seeds the database with data useful for development"
  (:require [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql :refer :all]
            [clojurewerkz.cassaforte.query :refer :all]
            [com.stuartsierra.component :as component]))

(defn seed
  []
  )

(defrecord DatabaseSeed []
  component/Lifecycle
  (start [this]
    (let [ks (get-in this [:database :keyspace])]
      (use-keyspace ks)
      (seed this))
    this)
  (stop [this] this))

(defn new-database-seed []
  (->DatabaseSeed))
