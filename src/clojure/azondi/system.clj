(ns azondi.system
  "(Component-based) system configuration and inter-component dependencies"
  (:refer-clojure :exclude (read))
  (:require [com.stuartsierra.component :as component :refer (system-map system-using)]
            [clojure.java.io :as io]
            [clojure.tools.reader :refer (read)]
            [clojure.tools.reader.reader-types :refer (indexing-push-back-reader)]
            [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
            [modular.netty :refer (new-netty-server)]
            [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
            [azondi.reactor :refer (new-reactor)]
            [azondi.bridges.ws :refer (new-websocket-bridge)]
            [azondi.db :refer (new-database)]
            [azondi.authentication :as auth]))

;;
;; Implementation
;;

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


;;
;; API
;;

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
   :reactor (new-reactor)
   :ws (new-websocket-bridge {:port 8083})
   :database (new-database (get config :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
   :device-authenticator (auth/new-postgres-authenticator (get config :postgres))))

(defn new-dependency-map
  []
  {:server       [:mqtt-handler :mqtt-decoder :mqtt-encoder]
   :ws           [:reactor]
   :mqtt-handler [:device-authenticator]})

(defn new-prod-system
  []
  (system-using
   (configurable-system-map (config))
   (new-dependency-map)))
