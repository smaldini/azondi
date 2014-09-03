(ns azondi.transports.test-helpers
  (:require [clojure.java.io :as io]
            [clojure.java.jdbc :as psql]
            [clojure.java.shell :as sh]
            [clojure.core.async :as async]
            [com.stuartsierra.component :as component :refer (system-map system-using)]
            [azondi.config :refer [user-config config-from-classpath]]
            [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query :refer :all]
            [modular.netty :refer (new-netty-server)]
            [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
            [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
            [azondi.reactor :refer (new-reactor)]
            [azondi.bridges.ws :refer (new-websocket-bridge)]
            [azondi.topics :refer (new-topic-injector)]
            [azondi.metrics :refer (new-metrics)]
            [azondi.messages :refer (new-message-archiver)]
            [azondi.postgres :refer (new-database new-postgres-user-domain)]
            [azondi.cassandra :as cass]))


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

(defn drop-postgresql-tables!
  []
  (let [db         {:user        test-postgresql-user
                    :password    "opendata"
                    :subprotocol "postgresql"
                    :subname     (format "//localhost:5432/%s" test-postgresql-db)
                    :classname   "org.postgresql.Driver"}]
    (doseq [t tables] (psql/execute! db [(format "DROP TABLE IF EXISTS %s CASCADE;" t)]))))


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

     ;; in case tables exist
    (drop-postgresql-tables!)
    (psql/execute! db [schema-sql] :transaction? false)
    (psql/execute! db [seed-sql])))



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

;;
;; API
;;

(defn load-schema!
  []
  (println "[fixtures] Loading PostgreSQL schema")
  (load-postgresql-schema!)
  (println "[fixtures] Loading Cassandra schema")
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

(def ^:dynamic *system* nil)

(defn new-messaging-system
  "Define a minimal system which is just enough for the messaging tests to run"
  []
  (let [debug-ch (async/chan 64)
        debug-mult (async/mult debug-ch)]
    (component/system-using
     (component/system-map
      :mqtt-decoder (new-mqtt-decoder)
      :mqtt-encoder (new-mqtt-encoder)
      :mqtt-handler (new-netty-mqtt-handler debug-ch)
      :mqtt-server (new-netty-server {:port 1883})
      :reactor (new-reactor)
      :ws (new-websocket-bridge {:port 8083})
      :topic-injector (new-topic-injector)
      :metrics (new-metrics {:hostname (.. java.net.InetAddress getLocalHost getHostName)
                             :prefix "azondi"})
      :database (new-database {:host "127.0.0.1"
                               :dbname test-postgresql-db
                               :user test-postgresql-user
                               :password "opendata"})
      :cassandra (cass/new-database
                  {:keyspace "opensensors_test"
                   :hosts ["127.0.0.1"]})
      :message-archiver (new-message-archiver)
      :user-domain (new-postgres-user-domain))
     {:mqtt-handler {:db :database}
      :mqtt-server [:mqtt-handler :mqtt-decoder :mqtt-encoder]})))

(defmacro with-system
  [system & body]
  `(let [s# (component/start ~system)]
     (try
       (binding [*system* s#] ~@body)
       (finally
         (component/stop s#)))))

(defn with-system-fixture
  [f]
  (with-system (new-messaging-system)
    (f)))
