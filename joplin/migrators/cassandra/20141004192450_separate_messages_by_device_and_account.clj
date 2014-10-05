(ns migrators.cassandra.20141004192450-separate-messages-by-device-and-account
  (:require [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query  :refer :all]
            [joplin.cassandra.database      :as jc]
            [clj-time.format :as tf]))

(def in-formatter  (tf/formatter "yyyy-MM-dd HH"))
(def out-formatter (tf/formatter "yyyy-MM-dd"))

(defn day-from
  [^String s]
  (let [dt (tf/parse in-formatter s)]
    (tf/unparse out-formatter dt)))

(defn up
  [db]
  (let [conn (jc/get-connection (:hosts db) (:keyspace db))]
    ;; messages by device
    (cql/create-table conn "messages_by_device"
                      (if-not-exists)
                      (column-definitions {:device_id     :text
                                           :date          :text
                                           :created_at    :timestamp
                                           :topic         :text
                                           :owner         :text
                                           :payload       :blob
                                           :content_type  :text
                                           :primary-key   [[:device_id :date] :created_at]}))

    (cql/create-index conn "messages_by_device" "device_id"
                      (if-not-exists))
    (cql/create-index conn "messages_by_device" "topic"
                      (if-not-exists))

  ;; messages by account
  (cql/create-table conn "messages_by_account"
                      (if-not-exists)
                      (column-definitions {:owner         :text
                                           :date          :text
                                           :created_at    :timestamp
                                           :device_id     :text
                                           :topic         :text
                                           :payload       :blob
                                           :content_type  :text
                                           :primary-key   [[:owner :date] :created_at]}))
  (cql/create-index conn "messages_by_account" "owner"
                 (if-not-exists))
  (cql/create-index conn "messages_by_account" "device_id"
                 (if-not-exists))
  (cql/create-index conn "messages_by_account" "topic"
                    (if-not-exists))

  ;; migrate existing data
  (doseq [row (cql/iterate-table conn "messages" [:device_id :date_and_hour] 1024)]
    (cql/insert conn "messages_by_device" {:device_id    (:device_id row)
                                           :date         (day-from (:date_and_hour row))
                                           :created_at   (:created_at row)
                                           :topic        (:topic row)
                                           :owner        (:owner row)
                                           :payload      (:payload row)
                                           :content_type (:content_type row)})
    (cql/insert conn "messages_by_account" {:device_id    (:device_id row)
                                            :date         (day-from (:date_and_hour row))
                                            :created_at   (:created_at row)
                                            :topic        (:topic row)
                                            :owner        (:owner row)
                                            :payload      (:payload row)
                                            :content_type (:content_type row)}))

  ;; drop the old table
  (cql/drop-table conn "messages")))

(defn down
  [db]
  (let [conn (jc/get-connection (:hosts db) (:keyspace db))]
    (cql/drop-table conn "messages_by_device")
    (cql/drop-table conn "messages_by_account")
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
                      (if-not-exists))))
