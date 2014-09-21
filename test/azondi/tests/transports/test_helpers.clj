(ns azondi.tests.transports.test-helpers
  (:require [clojure.java.io :as io]
            [clojure.java.jdbc :as psql]
            [clojure.java.shell :as sh]
            [clojure.core.async :as async]
            [com.stuartsierra.component :as component :refer (system-map system-using)]
            [azondi.config :refer [user-config config-from-classpath]]
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
            [azondi.tests.joplin-helpers :as jh]))


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
                               :dbname jh/test-postgresql-db
                               :user jh/test-postgresql-user
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
