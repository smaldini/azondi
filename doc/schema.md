# What This Guide Covers

This guide covers the CQL schema Azondi uses.


## Setup

The following code can be used to set the schema up (

``` clojure
(require '[clojurewerkz.cassaforte.client :refer :all])
(require '[clojurewerkz.cassaforte.cql :refer :all])
(require '[clojurewerkz.cassaforte.query :refer :all])

(create-keyspace "opensensors"
                 (with {:replication {:class "SimpleStrategy" :replication_factor 2}}))
(use-keyspace "opensensors")
(create-table "users" (column-definitions {:fname :varchar
                                           :sname :varchar
                                           :id :varchar
                                           :email :varchar
                                           :pword :varchar
                                           :role :varchar
                                           :publisher :boolean
                                           :primary-key [:email]}))

(create-table :userSubscriptions (column-definitions {:email :varchar
                                                      :topic :varchar
                                                      :time :timestamp
                                                      :primary-key [:email :time :topic]}))

(create-table :topics (column-definitions {:topic_name :varchar
                                           :publisher :varchar
                                           :device_type :varchar
                                           :device_name :varchar
                                           :description :varchar
                                           :open_data :boolean
                                           :latitude :varchar
                                           :longitude :varchar
                                           :created_date :timestamp
                                           :primary-key [:topic_name]}))
(create-index :topics :publisher)
```