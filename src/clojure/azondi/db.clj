(ns azondi.db
  "Database connectivity."
  (:require [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql :refer :all]
            [clojurewerkz.cassaforte.query :refer :all]
            [com.stuartsierra.component :as component]))

(defn converge-schema
  [_]
  (create-table "users" (column-definitions {:fname :varchar
                                             :sname :varchar
                                             :id :varchar
                                             :email :varchar
                                             :pword :varchar
                                             :role :varchar
                                             :publisher :boolean
                                             :primary-key [:email]})
                (if-not-exists))

  (create-table "userSubscriptions" (column-definitions {:email :varchar
                                                         :topic :varchar
                                                         :time :timestamp
                                                         :primary-key [:email :time :topic]})
                (if-not-exists))

  (create-index "userSubscriptions" :topic (if-not-exists))

  (create-table "topics" (column-definitions {:topic_name :varchar
                                              :publisher :varchar
                                              :device_type :varchar
                                              :device_name :varchar
                                              :description :varchar
                                              :measurement_units :varchar
                                              :open_data :boolean
                                              :latitude :varchar
                                              :longitude :varchar
                                              :created_date :timestamp
                                              :primary-key [:topic_name]})
                (if-not-exists))
  (create-index "topics" :publisher
                (if-not-exists)))

(defrecord Database [hosts keyspace]
  component/Lifecycle
  (start [this]
    (let [session (cc/connect! hosts)]
      (create-keyspace keyspace
                       (with {:replication
                              {:class              "SimpleStrategy"
                               ;; TODO: this needs to be dynamically configured
                               :replication_factor 1}})
                       (if-not-exists))
      (use-keyspace keyspace)
      (converge-schema session)
      this))
  (stop [this] this))

(defn new-database
  [& {:keys [hosts keyspace] :as opts}]
  (assert hosts "Database hosts are not configured!")
  (assert keyspace "Database keyspace is not configured!")
  (map->Database opts))
