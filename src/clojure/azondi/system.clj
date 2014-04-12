(ns azondi.system
  (:refer-clojure :exclude (read))
  (:require
   [com.stuartsierra.component :as component :refer (system-map system-using)]
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

(defn config
  "Return a map of the static configuration used in the component
  constructors."
  []
  ;; In the future, dynamic configurators will be available, such as
  ;; juxt/stoic. Here, we simply use a local file in the user's home
  ;; directory.
  (let [f (io/file (System/getProperty "user.home") ".azondi.edn")]
    (if (.exists f)
      (read
       ;; This indexing-push-back-reader gives better information if the
       ;; file is misconfigured.
       (indexing-push-back-reader
        (java.io.PushbackReader. (io/reader f))))
      ;; If the file isn't there, we assume defaults.
      {})))

(defn configurable-system-map
  [config]
  (system-map
   ;; We create the system map by calling a constructor for each
   ;; component.
   :mqtt-decoder (new-mqtt-decoder)
   :mqtt-encoder (new-mqtt-encoder)
   :mqtt-handler (new-netty-mqtt-handler)
   :server (new-netty-server :port 1883)
   :reactor (new-reactor)
   :ws (new-websocket-bridge :port 8083)
   :database (new-database :hosts ["127.0.0.1"] :keyspace "opensensors")
   :device-authenticator (auth/new-postgres-authenticator
                            :host (-> config :postgres :host)
                            :dbname (-> config :postgres :dbname)
                            :user (-> config :postgres :user)
                            :password (-> config :postgres :password))))

(defn new-dependency-map
  []
  {:server [:mqtt-handler :mqtt-decoder :mqtt-encoder]
   :ws [:reactor]
   :mqtt-handler [:device-authenticator]})

(defn new-prod-system
  []
  (system-using
   (configurable-system-map (config))
   (new-dependency-map)))
