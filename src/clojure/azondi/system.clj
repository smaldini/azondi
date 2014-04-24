(ns azondi.system
  "(Component-based) system configuration and inter-component dependencies"
  (:refer-clojure :exclude (read))
  (:require [com.stuartsierra.component :as component :refer (system-map system-using)]
            [clojure.java.io :as io]
            [clojure.tools.reader :refer (read)]
            [clojure.tools.reader.reader-types :refer (indexing-push-back-reader)]
            [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
            [modular.netty :refer (new-netty-server)]
            [modular.http-kit :refer (new-webserver)]
            [modular.bidi :refer (new-bidi-ring-handler-provider)]
            [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
            [azondi.reactor :refer (new-reactor)]
            [azondi.bridges.ws :refer (new-websocket-bridge)]
            [azondi.data.messages :refer (new-message-archiver)]
            [azondi.data.cassandra :as cass]
            [azondi.data.postgres  :as pg]
            [azondi.authentication :as auth]
            [azondi.api :as api]
            [azondi.db :as db]))

(defn ^:private read-file
  [f]
  (read
   ;; This indexing-push-back-reader gives better information if the
   ;; file is misconfigured.
   (indexing-push-back-reader
    (java.io.PushbackReader. (io/reader f)))))

(defn ^:private config-from
  [f]
  (if (.exists f)
    (read-file f)
    {}))

(defn ^:private system-wide-config
  []
  (config-from (io/file (System/getProperty "user.home") ".azondi.edn")))

(defn ^:private config-from-classpath
  []
  (if-let [res (io/resource "azondi.edn")]
    (config-from (io/file res))
    {}))

(defn config
  "Return a map of the static configuration used in the component
  constructors."
  []
  (merge (system-wide-config)
         (config-from-classpath)))

(defn configurable-system-map
  [config]
  (system-map
   ;; We create the system map by calling a constructor for each
   ;; component.
   :mqtt-decoder (new-mqtt-decoder)
   :mqtt-encoder (new-mqtt-encoder)
   :mqtt-handler (new-netty-mqtt-handler)
   :server (new-netty-server {:port 1883})

   :webserver (new-webserver :port 8010)
   :webrouter (new-bidi-ring-handler-provider)

   :reactor (new-reactor)
   :ws (new-websocket-bridge {:port 8083})
;;   :cassandra (cass/new-database (get config :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
   :message-archiver (new-message-archiver)
   :postgres (pg/new-database (get config :postgres))
   :device-authenticator (auth/new-postgres-authenticator (get config :postgres))
   :api (api/new-api :context "/api/1.0")
   :database (db/new-atom-backed-datastore)))

(defn new-dependency-map []
  {:device-authenticator [:postgres]
   :server [:mqtt-handler :mqtt-decoder :mqtt-encoder :postgres]
   :ws [:reactor]
   :mqtt-handler [:device-authenticator]
   :webserver [:webrouter]
   :webrouter [:api]})

(defn new-prod-system []
  (system-using
   (configurable-system-map (config))
   (new-dependency-map)))
