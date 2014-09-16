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
            [azondi.cassandra :as cass]
            [joplin.core :as jp]
            joplin.jdbc.database
            joplin.cassandra.database))


;;
;; Implementation
;;

(def test-postgresql-db   "opensensors_test")
(def test-postgresql-user "azondi")

(def migrated? (atom false))

(def pg-target
  {:db {:type :jdbc
        :url  (format "jdbc:postgresql://127.0.0.1/%s?user=%s&password=opendata"
                      test-postgresql-db
                      test-postgresql-user)}
   :migrator "joplin/migrators/sql"
   :seed     "azondi.seeds.sql/run"})

(def c*-target
  {:db {:type :cass
        :hosts ["127.0.0.1"] :keyspace "opensensors_test"}
   :migrator "joplin/migrators/cassandra"
   :seed     "azondi.seeds.cassandra/run"})

(defn migrate!
  []
  (jp/reset-db pg-target)
  (jp/reset-db c*-target))

;;
;; API
;;

(defn maybe-migrate
  []
  (when-not @migrated?
    (do
      (migrate!)
      (reset! migrated? true))))

(defn maybe-migrate-fixture
  [f]
  (maybe-migrate)
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
