(ns azondi.seeds.cassandra
  (:require [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query  :refer :all]
            [joplin.cassandra.database :refer [get-connection]]
            [clj-time.core   :as tc]
            [clj-time.format :as tf]
            [byte-streams :refer [convert]]
            [azondi.cassandra :refer [date-and-hour-formatter]]))

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
        (cql/insert conn t {:device-id "1001" :topic "/users/juan/test-public" :owner o
                            :payload (convert "message-1" java.nio.ByteBuffer) :content-type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)}))
      (let [now (tc/date-time 2014 1 16 0)]
        (cql/insert conn t {:device-id "1001" :topic "/users/juan/test-public" :owner o
                            :payload (convert "message-2" java.nio.ByteBuffer) :content-type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)}))
      (let [now (tc/date-time 2014 1 17 0)]
        (cql/insert conn t {:device-id "1002" :topic "/users/juan/test-private" :owner o
                            :payload (convert "message-3" java.nio.ByteBuffer) :content-type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)}))
      (let [now (tc/date-time 2014 1 18 0)]
        (cql/insert conn t {:device-id "1002" :topic "/users/juan/test-private" :owner o
                            :payload (convert "message-4" java.nio.ByteBuffer) :content-type "text"
                            :created_at (.toDate now) :date_and_hour (tf/unparse date-and-hour-formatter now)})))))
