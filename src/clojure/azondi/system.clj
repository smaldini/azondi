(ns azondi.system
  "(Component-based) system configuration and inter-component dependencies"
  (:require
   [com.stuartsierra.component :as component :refer (system-map system-using using)]
   [azondi.config :refer [user-config config-from-classpath]]
   [clojure.string :as str]
   [clojure.core.async :as async]
   [clojure.tools.logging :refer :all]
   [schema.core :as s]

   ;; Pre-baked components
   [modular.cljs :refer (new-cljs-builder new-cljs-module)]
   [modular.netty :refer (new-netty-server)]
   [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
   [modular.http-kit :refer (new-webserver)]
   [modular.ring :refer (new-web-request-handler-head)]
   [modular.bidi :refer (new-router)]
   [cylon.impl.login-form :refer (new-login-form)]
   ;;[cylon.bootstrap-login-form :refer (new-bootstrap-login-form-renderer)]
   [cylon.impl.session :refer (new-atom-backed-session-store
                               new-cookie-authenticator)]
   [cylon.impl.authentication :refer (new-composite-disjunctive-authenticator)]
   [cylon.impl.authorization :refer (new-valid-user-authorizer)]
   ;;[cylon.impl.webrequest :refer (new-authenticator-request-middleware)]
   ;; We require this to ensure we can use Cylon default authenticators as Ring middleware
   ;;cylon.impl.webrequest

   ;; Custom components
   [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
   [azondi.reactor :refer (new-reactor)]
   [azondi.bridges.ws :refer (new-websocket-bridge)]
   [azondi.bridges.sse :refer (new-sse-bridge)]
   [azondi.topics :refer (new-topic-injector)]
   [azondi.metrics :refer (new-metrics)]
   [azondi.messages :refer (new-message-archiver)]

   [azondi.sse :refer (new-event-service)]
   [azondi.postgres :refer (new-database new-postgres-user-domain)]
   [azondi.cassandra :as cass]
   [azondi.api :refer (new-api new-api-key-authenticator new-user-authorizer)]
   [azondi.webapp :refer (new-webapp)]
   [azondi.login :refer (new-custom-login-form-renderer)]

   )
  (:import [modular.cljs ClojureScriptBuilder]))

(defn config
  "Return a map of the static configuration used in the component
  constructors."
  []
  (merge
   (config-from-classpath)
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
     :sse-bridge (using (new-sse-bridge) {:reactor :reactor})

     ;; Webserver and routing

     :cljs-core (new-cljs-module :name :cljs :mains ['cljs.core] :dependencies #{})
     :cljs-main (new-cljs-module :name :azondi :mains ['azondi.main] :dependencies #{:cljs})

     :cljs-logo (new-cljs-module :name :logo :mains ['azondi.logo] :dependencies #{:cljs})
     :cljs-view (new-cljs-module :name :view :mains ['azondi.view] :dependencies #{:cljs})
     ;;     :cljs-reset (new-cljs-module :name :reset-password :mains ['azondi.reset-password] :dependencies #{:cljs})

     :main-cljs-builder (new-cljs-builder :source-path "src/cljs")

     ;; API
     :webserver (new-webserver :port 8010)

     :webrouter (new-router)
     :webapp (new-webapp)
     :api (new-api :uri-context "/api/1.0")

     :session-authenticator (new-cookie-authenticator)
     :api-key-authenticator (new-api-key-authenticator)
     :authenticator (new-composite-disjunctive-authenticator :session-authenticator :api-key-authenticator)
     :authorizer (new-user-authorizer)

     :valid-user-authorizer (new-valid-user-authorizer)

     ;; Server Sent Events (part of HTML5 spec.)
     :sse-debug (let [sse-ch (async/chan 64)
                      ;; SSE splits on client-id
                      sse-pub (async/pub (async/tap debug-mult sse-ch) :client-id)]
                  (new-event-service :async-pub sse-pub))

     ;; Security

     :login-form (new-login-form
                  :renderer (new-custom-login-form-renderer)
                  :requested-uri "/devices"
                  )                     ; start with the login form
     ;; Cylon login-forms depend on a session-store. This default impl
     ;; won't survive system reset but will do for now
     :session-store (new-atom-backed-session-store)

     :topic-injector (new-topic-injector)
     :metrics (new-metrics {:hostname (.. java.net.InetAddress getLocalHost getHostName)
                            :prefix "azondi"})

     :database (new-database (get config :postgres))
     :cassandra (cass/new-database
                 (get config :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
     :message-archiver (new-message-archiver)
     :user-domain (new-postgres-user-domain)
     )))

(defn new-dependency-map [system-map]
  {:mqtt-handler {:db :database}
   :mqtt-server [:mqtt-handler :mqtt-decoder :mqtt-encoder]
   :ws [:reactor :database]
   :main-cljs-builder [:cljs-core :cljs-main :cljs-logo :cljs-view]

   :webserver {:request-handler :webrouter}
   :webrouter [:webapp :api :sse-debug :main-cljs-builder :login-form :sse-bridge]
   :login-form {:authorizer :valid-user-authorizer}
   :webapp {:authorizer :valid-user-authorizer}
   :valid-user-authorizer {:authenticator :authenticator}
   })

(defn new-prod-system []
  (let [s-map (configurable-system-map (config))
        d-map (new-dependency-map s-map)]
    (component/system-using s-map d-map)))
