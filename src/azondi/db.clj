(ns azondi.db
  "Database connectivity."
  (:require [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql :refer :all]
            [clojurewerkz.cassaforte.query :refer :all])
  (:import jig.Lifecycle))

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
  (create-index "topics" "publisher"
                (if-not-exists)))

(deftype Database [config]
  Lifecycle
  (init [_ system]
    system)
  (start [_ system]
    (let [host    (:hosts config)
          ks      (:keyspace config)
          session (cc/connect! host)]
      (use-keyspace ks)
      (converge-schema session)
      system))
  (stop [_ system]
    system))
