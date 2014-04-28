(ns azondi.system
  "(Component-based) system configuration and inter-component dependencies"
  (:refer-clojure :exclude (read))
  (:require [com.stuartsierra.component :as component :refer (system-map system-using)]
            [clojure.java.io :as io]
            [clojure.tools.reader :refer (read)]
            [clojure.string :as str]
            [clojure.tools.reader.reader-types :refer (indexing-push-back-reader)]

            [modular.bidi :refer (new-router WebService)]
            [modular.cljs :refer (new-cljs-module new-cljs-builder ClojureScriptModule)]
            [modular.clostache :refer (new-clostache-templater)]
            [modular.http-kit :refer (new-webserver)]
            [modular.maker :refer (make)]
            [modular.menu :refer (new-menu-index MenuItems)]
            [modular.netty :refer (new-netty-server)]
            [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
            [modular.ring :refer (new-ring-binder RingBinding)]
            [modular.template :refer (new-single-template new-template-model-contributor TemplateModel)]
            [modular.wire-up :refer (autowire-dependencies-satisfying)]

            [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
            [azondi.reactor :refer (new-reactor)]
            [azondi.bridges.ws :refer (new-websocket-bridge)]
            [azondi.data.messages :refer (new-message-archiver)]
            [azondi.data.cassandra :as cass]
            [azondi.data.postgres  :as pg]
            [azondi.authentication :as auth]
            [azondi.api :as api]
            [azondi.db :as db]
            [azondi.website :refer (new-website)]))

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
  (system-map
   ;; We create the system map by calling a constructor for each
   ;; component.
   :mqtt-decoder (new-mqtt-decoder)
   :mqtt-encoder (new-mqtt-encoder)
   :mqtt-handler (new-netty-mqtt-handler)
   :mqtt-server (new-netty-server {:port 1883})

   :webserver (new-webserver :port 8010)
   ;; bidi's route compilation doesn't yet work with pattern segments
   ;; used in the routes, so we tell it not to compile
   :router (make new-router config :compile-routes? false)

   ;; TODO Make this entire section a sub-system, ala cylon
   :website (make new-website)
   :html-template (make new-single-template config :template "templates/page.html.mustache")
   :menu (make new-menu-index)
   :clostache (make new-clostache-templater)
   :ring-binder (make new-ring-binder)
   :web-meta (make new-template-model-contributor config
                   :title "Azondi"
                   :description "OpenSensors.IO MQTT broker"
                   :app-name "Azondi")
   :cljs-core (new-cljs-module :name :cljs :mains ['cljs.core] :dependencies #{})
   :cljs-main (new-cljs-module :name :azondi :mains ['azondi.main] :dependencies #{:cljs})
   :cljs-builder (new-cljs-builder :source-path "src/cljs")

   :reactor (new-reactor)
   :ws (new-websocket-bridge {:port 8083})
   ;;   :cassandra (cass/new-database (get config :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
   :message-archiver (new-message-archiver)
   :postgres (pg/new-database (get config :postgres))
   :device-authenticator (auth/new-postgres-authenticator (get config :postgres))
   :api (api/new-api :uri-context "/api/1.0")
   :database (db/new-atom-backed-datastore)))

(defn new-dependency-map [system-map]
  (->
   {:webserver [:ring-binder]
    :ring-binder {:ring-handler :router}
    :device-authenticator [:postgres]
    :mqtt-server [:mqtt-handler :mqtt-decoder :mqtt-encoder :postgres]
    :ws [:reactor]
    :mqtt-handler [:device-authenticator]
    :html-template {:templater :clostache}}

   (autowire-dependencies-satisfying system-map :router WebService)
   (autowire-dependencies-satisfying system-map :ring-binder RingBinding)
   (autowire-dependencies-satisfying system-map :html-template TemplateModel)
   (autowire-dependencies-satisfying system-map :menu MenuItems)
   (autowire-dependencies-satisfying system-map :cljs-builder ClojureScriptModule)))

(defn new-prod-system []
  (let [s-map (configurable-system-map (config))
        d-map (new-dependency-map s-map)]
    (component/system-using s-map d-map)))
