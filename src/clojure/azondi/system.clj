(ns azondi.system
  "(Component-based) system configuration and inter-component dependencies"
  (:refer-clojure :exclude (read))
  (:require
   [com.stuartsierra.component :as component :refer (system-map system-using)]
   [clojure.java.io :as io]
   [clojure.tools.reader :refer (read)]
   [clojure.string :as str]
   [clojure.tools.reader.reader-types :refer (indexing-push-back-reader)]
   [clojure.core.async :as async]
   [clojure.tools.logging :refer :all]

   ;; Pre-baked components
   [modular.cljs :refer (new-cljs-module new-cljs-builder)]
   [modular.netty :refer (new-netty-server)]
   [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
   
   ;; Custom components
   [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
   [azondi.reactor :refer (new-reactor)]
   [azondi.bridges.ws :refer (new-websocket-bridge)]
   [azondi.data.messages :refer (new-message-archiver)]
   [azondi.sse :refer (new-event-service)]
   [azondi.postgres :refer (new-database)]
   [azondi.data.cassandra :as cass]
   [azondi.api :refer (new-api)]
   [azondi.webapp :refer (new-webserver)]
   ))

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

(defn ^:private user-config
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
  (merge (config-from-classpath)
         (user-config)))

(defn configurable-system-map
  [config]
  (let [debug-ch (async/chan 64)
        debug-mult (async/mult debug-ch)]

    (infof "Building system map")
    (system-map
     ;; We create the system map by calling a constructor for each
     ;; component.

     ;; MQTT
     :mqtt-decoder (new-mqtt-decoder)
     :mqtt-encoder (new-mqtt-encoder)
     :mqtt-handler (new-netty-mqtt-handler debug-ch)
     :mqtt-server (new-netty-server {:port 1883})
     :reactor (new-reactor)
     :ws (new-websocket-bridge {:port 8083})

     ;; Webserver and routing
     :webserver (new-webserver)
     :cljs-core (new-cljs-module :name :cljs :mains ['cljs.core] :dependencies #{})
     :cljs-main (new-cljs-module :name :azondi :mains ['azondi.main] :dependencies #{:cljs})
     :cljs-logo (new-cljs-module :name :logo :mains ['azondi.logo] :dependencies #{:cljs})
     :main-cljs-builder (new-cljs-builder :source-path "src/cljs")

     ;; API
     :api (new-api :uri-context "/api/1.0")
     :sse (let [sse-ch (async/chan 64)
                ;; SSE splits on client-id
                sse-pub (async/pub (async/tap debug-mult sse-ch) :client-id)]
            (new-event-service :async-pub sse-pub))

          

     :message-archiver (new-message-archiver))))

(defn new-dependency-map [system-map]
  {:mqtt-handler {:db :database}
   :mqtt-server [:mqtt-handler :mqtt-decoder :mqtt-encoder]
   :ws [:reactor :database]
   :main-cljs-builder [:cljs-core :cljs-main :cljs-logo]})

(defn new-prod-system []
  (let [s-map (-> (configurable-system-map (config))
                  (assoc :database (new-database (get (config) :postgres))
                         :cassandra (cass/new-database (get (config) :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))))
        d-map (new-dependency-map s-map)]

    (component/system-using s-map d-map)))
