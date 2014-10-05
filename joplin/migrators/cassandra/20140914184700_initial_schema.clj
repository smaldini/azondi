(ns migrators.cassandra.20140914184700-initial-schema
  (:require [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query  :refer :all]
            [joplin.cassandra.database      :as jc]))

(defn up
  [db]
  (let [conn (jc/get-connection (:hosts db) (:keyspace db))]
    (cql/create-table conn "messages"
                      (if-not-exists)
                      (column-definitions {:device_id     :text
                                           :date_and_hour :text
                                           :created_at    :timestamp
                                           :topic         :text
                                           :owner         :text
                                           :payload       :blob
                                           :content_type  :text
                                           :primary-key   [[:device_id :date_and_hour] :created_at]}))
    (cql/create-index conn "messages" "device_id"
                      (if-not-exists))
    (cql/create-index conn "messages" "owner"
                      (if-not-exists))
    (cql/create-index conn "messages" "topic"
                      (if-not-exists))

    (cql/create-table conn "topic_summary"
                      (if-not-exists)
                      (column-definitions {:created_at    :timestamp
                                           :date_and_hour :text
                                           :topic         :text
                                           :topic_summary :text
                                           :primary-key   [[:topic :date_and_hour] :created_at]}))))

(defn down
  [db]
  (let [conn (jc/get-connection (:hosts db) (:keyspace db))]
    (cql/drop-table conn "messages")
    (cql/drop-table conn "topic_summary")))
