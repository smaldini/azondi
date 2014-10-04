(ns azondi.seeds.cassandra
  (:require [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query  :refer :all]
            [joplin.cassandra.database :refer [get-connection]]
            [clj-time.core   :as tc]
            [clj-time.format :as tf]
            [byte-streams :refer [convert]]
            [azondi.cassandra :refer [date-and-hour-formatter]]))

(defn bytes
  [^String s]
  (.getBytes s "UTF-8"))

;;
;; API
;;

(defn run
  [target & args]
  (let [conn (get-connection (-> target :db :hosts)
                             (-> target :db :keyspace))]
    (let [t "messages"
          o "juan"]
      (let [now (tc/date-time 2014 1 15 0)]
        (cql/insert conn t {:device_id "1001" :topic "/users/juan/test-public" :owner o
                            :payload (bytes "message1") :content_type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)}))
      (let [now (tc/date-time 2014 1 16 0)]
        (cql/insert conn t {:device_id "1001" :topic "/users/juan/test-public" :owner o
                            :payload (bytes "message2") :content_type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)}))
      (let [now (tc/date-time 2014 1 17 0)]
        (cql/insert conn t {:device_id "1002" :topic "/users/juan/test-private" :owner o
                            :payload (bytes "message3") :content_type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)}))
      (let [now (tc/date-time 2014 1 18 0)]
        (cql/insert conn t {:device_id "1002" :topic "/users/juan/test-private" :owner o
                            :payload (bytes "message4") :content_type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)}))
      (let [now (tc/date-time 2014 9 18 0)]
        (cql/insert conn t {:device_id "4" :topic "/users/michaelklishin/topic1" :owner "michaelklishin"
                            :payload (bytes "message") :content_type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)}))
      (let [now (tc/date-time 2014 9 18 1)]
        (cql/insert conn t {:device_id "4" :topic "/users/michaelklishin/topic1" :owner "michaelklishin"
                            :payload (bytes "message") :content_type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)})))))
