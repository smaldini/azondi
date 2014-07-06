(ns azondi.transports.test-helpers
  (:require [clojure.java.io :as io]
            [clojure.java.jdbc :as psql]
            [clojure.java.shell :as sh]
            dev
            [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query :refer :all]))


;;
;; Implementation
;;

(def schema-file-location (io/resource "schema.sql"))
(def seed-file-location   (io/resource "seed.sql"))
(def cassandra-schema-file-location (io/resource "schema.cql"))

(def loaded-schema? (atom false))

(def ^:const test-postgresql-db (or (System/getenv "AZONDI_TEST_POSTGRESQL_DATABASE")
                                    "opensensors_test"))
(def ^:const test-cassandra-ks  (or (System/getenv "AZONDI_TEST_CASSANDRA_KEYSPACE")
                                    "opensensors_test"))

(def ^:const test-postgresql-user (or (System/getenv "AZONDI_TEST_POSTGRESQL_USER")
                                      "azondi"))

(def tables ["users" "api_keys" "devices" "topics"
             "subscriptions" "ws_session_tokens"])

(defn truncate-postgresql-tables
  [db]
  (doseq [t tables]
    ;; we intentionally don't use SQL escaping for table names here. MK.
    (psql/execute! db [(format "TRUNCATE TABLE %s CASCADE" t)])))

(defn load-postgresql-schema!
  []
  (let [db         {:user        test-postgresql-user
                    :password    "opendata"
                    :subprotocol "postgresql"
                    :subname     (format "//localhost:5432/%s" test-postgresql-db)
                    :classname   "org.postgresql.Driver"}
        schema-sql (slurp schema-file-location)
        seed-sql   (slurp seed-file-location)]
    ;; can't drop current DB with JDBC. MK.
    (sh/sh "dropdb"   "-U" test-postgresql-user test-postgresql-db)
    (sh/sh "createdb" "-U" test-postgresql-user test-postgresql-db)
    (psql/execute! db [schema-sql] :transaction? false)
    (psql/execute! db [seed-sql])
    (println (psql/query db ["SELECT * FROM devices;"]))))

(defn load-cassandra-schema!
  []
  (let [s (cc/connect ["127.0.0.1"])]
    (cql/create-keyspace s test-cassandra-ks
                         (with {:replication
                                {:class "SimpleStrategy"
                                 :replication_factor 1 }})
                         (if-not-exists))
    (cql/use-keyspace s test-cassandra-ks)
    (cql/create-table s "messages"
                  (column-definitions {:device_id     :text
                                       :date_and_hour :text
                                       :created_at    :timestamp
                                       :topic         :text
                                       :owner         :text
                                       :payload       :blob
                                       :content_type  :text
                                       :primary-key [[:device_id :date_and_hour]
                                                     :created_at]})
                  (if-not-exists))))

(dev/set-env! :messaging)
(dev/init :messaging)

;;
;; API
;;

(defn load-schema!
  []
  (println "[fixutres] Loading PostgreSQL schema")
  (load-postgresql-schema!)
  (println "[fixutres] Loading Cassandra schema")
  (load-cassandra-schema!))

(defn maybe-load-schema
  []
  (when-not @loaded-schema?
    (do
      (load-schema!)
      (swap! loaded-schema? (constantly true)))))

(defn maybe-load-schema-fixture
  [f]
  (maybe-load-schema)
  (f))

(defn with-system-fixture
  [f]
  (dev/start)
  (f)
  (dev/stop))
