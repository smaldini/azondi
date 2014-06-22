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
   [schema.core :as s]

   ;; Pre-baked components
   [modular.cljs :refer :all]
   [modular.netty :refer (new-netty-server)]
   [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
   [modular.http-kit :refer (new-webserver)]
   [modular.ring :refer (new-web-request-handler-head)]
   [modular.bidi :refer (new-router)]
   [cylon.impl.login-form :refer (new-login-form)]
   [cylon.bootstrap-login-form :refer (new-bootstrap-login-form-renderer)]
   [cylon.impl.session :refer (new-atom-backed-session-store
                               new-cookie-authenticator)]
   ;;[cylon.impl.webrequest :refer (new-authenticator-request-middleware)]
   ;; We require this to ensure we can use Cylon default authenticators as Ring middleware
   ;;cylon.impl.webrequest

   ;; Custom components
   [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
   [azondi.reactor :refer (new-reactor)]
   [azondi.bridges.ws :refer (new-websocket-bridge)]
   [azondi.topics :refer (new-topic-injector)]
   [azondi.metrics :refer (new-metrics)]

   [azondi.sse :refer (new-event-service)]
   [azondi.postgres :refer (new-database)]
   [azondi.cassandra :as cass]
   [azondi.api :refer (new-api)]
   [azondi.webapp :refer (new-webapp)]

   )
  (:import [modular.cljs ClojureScriptBuilder]))

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
  (merge 
   (config-from-classpath)
   (user-config)))

(defn new-azondi-cljs-builder [& {:as opts}]
  (->> opts
       (merge {:id ::default
               :context (if-let [id (:id opts)]
                              (format "/cljs-%s/" (name id))
                              "/cljs/")
               :source-path "src-cljs"
               :target-dir (if-let [id (:id opts)]
                             (str "resources/public/cljs/" (name id))
                             "resources/public/cljs")
               :work-dir "target/cljs-work"
               :optimizations :none
               :pretty-print true})
       (s/validate new-cljs-builder-schema)
       map->ClojureScriptBuilder))

(defn configurable-system-map
  [config]
  (let [debug-ch (async/chan 64)
        debug-mult (async/mult debug-ch)]

    (infof "Building system map")
    (system-map
     ;; We create the system map by calling a constructor for each
     ;; component.

     ;; MQTT
     ;;:mqtt-decoder (new-mqtt-decoder)
;;     :mqtt-encoder (new-mqtt-encoder)
;;     :mqtt-handler (new-netty-mqtt-handler debug-ch)
;;     :mqtt-server (new-netty-server {:port 1883})
;;     :reactor (new-reactor)
;;     :ws (new-websocket-bridge {:port 8083})

     ;; Webserver and routing

;;     :cljs-core (new-cljs-module :name :cljs :mains ['cljs.core] :dependencies #{})
;;     :cljs-main (new-cljs-module :name :azondi :mains ['azondi.main] :dependencies #{:cljs})
;;     :cljs-logo (new-cljs-module :name :logo :mains ['azondi.logo] :dependencies #{:cljs})
;;     :cljs-reset (new-cljs-module :name :reset-password :mains ['azondi.reset-password] :dependencies #{:cljs})

     #_:main-cljs-builder #_(new-azondi-cljs-builder :source-path "src/cljs")

     ;; API
     :api (new-api :uri-context "/api/1.0")
     :webserver (new-webserver :port 8010)
     :webhead (new-web-request-handler-head)
     :webrouter (new-router)
     :webapp (new-webapp)

     :authenticator (new-cookie-authenticator)
     ;;new-authenticator-request-middleware

     :sse (let [sse-ch (async/chan 64)
                ;; SSE splits on client-id
                sse-pub (async/pub (async/tap debug-mult sse-ch) :client-id)]
            (new-event-service :async-pub sse-pub))

     ;; Security

     :login-form (new-login-form) ; start with the login form
     ;; Cylon login-forms depend on a session-store. This default impl
     ;; won't survive system reset but will do for now
     :session-store (new-atom-backed-session-store)

;;     :topic-injector (new-topic-injector)
     #_:metrics #_(new-metrics {:hostname (.. java.net.InetAddress getLocalHost getHostName)
                            :prefix   "azondi"}))))

(defn new-dependency-map [system-map]
  {#_:mqtt-handler #_{:db :database}
   #_:mqtt-server #_[:mqtt-handler :mqtt-decoder :mqtt-encoder]
   #_:ws #_[:reactor :database]
   #_:main-cljs-builder #_[:cljs-core :cljs-main #_:cljs-logo]

   :webserver {:request-handler :webhead}
   :webhead {:request-handler :webrouter
             :authenticator-middleware :authenticator}
   :webrouter [:webapp :api #_:sse #_:main-cljs-builder :login-form]})

(defn new-prod-system []
  (let [s-map (-> (configurable-system-map (config))
                  (assoc :database (new-database (get (config) :postgres))
                         :cassandra (cass/new-database (get (config) :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))))
        d-map (new-dependency-map s-map)]

    (component/system-using s-map d-map)))
