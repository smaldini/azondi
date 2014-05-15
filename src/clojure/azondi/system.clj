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
   [modular.bidi :refer (new-router WebService)]
   [modular.cljs :refer (new-cljs-module new-cljs-builder)]
   [modular.clostache :refer (new-clostache-templater)]
   [modular.http-kit :refer (new-webserver)]
   [modular.maker :refer (make)]
   [modular.menu :refer (new-menu-index MenuItems)]
   [modular.netty :refer (new-netty-server)]
   [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
   [modular.ring :refer (new-ring-binder RingBinding)]
   [modular.template :refer (new-template new-template-model-contributor wrap-template)]
   [modular.wire-up :refer (autowire-dependencies-satisfying)]
   [cylon.impl.login-form :refer (new-login-form LoginFormRenderer)]
   [cylon.impl.user :refer (new-user-file new-default-user-domain)]
   [cylon.impl.session :refer (new-cookie-authenticator new-atom-backed-session-store)]
   [cylon.impl.request :refer (new-auth-request-binding)]
   [cylon.impl.authentication :refer (new-static-authenticator)]
   [cylon.impl.pbkdf2 :refer (new-pbkdf2-password-hash)]

   ;; Custom components
   [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
   [azondi.menu-views :refer (new-sidebar-menu new-navbar-menu)]
   [azondi.reactor :refer (new-reactor)]
   [azondi.bridges.ws :refer (new-websocket-bridge)]
   [azondi.data.messages :refer (new-message-archiver)]
   [azondi.website :refer (new-website render-custom-login-form)]
   [azondi.sse :refer (new-event-service)]
   [azondi.postgres :refer (new-database)]
   [azondi.data.cassandra :as cass]
   [azondi.api :refer (new-api)]
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
     :webserver (make new-webserver config {:port [:webserver :port]} 8010)
     :ring-binder (make new-ring-binder) ; one ring (binder) to bind them all
     ;; bidi's route compilation doesn't yet work with pattern segments
     ;; used in the routes, so we tell it not to compile
     :router (make new-router config :compile-routes? false)

     ;; Website
     :website (make new-website)
     :html-template (make new-template config :template "templates/page.html.mustache")
     :clostache (make new-clostache-templater)
     :menu-index (make new-menu-index)

     :navbar-menu (make new-navbar-menu)
     :sidebar-menu (make new-sidebar-menu)

     :web-meta (make new-template-model-contributor config
                     :org "OpenSensors.IO"
                     :title "Azondi"
                     :description "OpenSensors.IO MQTT broker"
                     :app-name "Azondi"
                     :home-href "/")
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

     ;; Security
     :login-form (new-login-form
                  :renderer
                  (reify LoginFormRenderer
                    (render-login-form [_ request requested-uri action login-status]
                      (render-custom-login-form requested-uri action login-status)))
                  :middleware wrap-template)

     #_:user-domain #_(new-default-user-domain)
     #_:password-hash-algo #_(new-pbkdf2-password-hash)
     #_:user-store #_(make new-user-file config
                           :file (io/file (System/getProperty "user.home")
                                          ".azondi-passwords.edn"))
     :session-store (new-atom-backed-session-store)
     :auth-binding (new-auth-request-binding)

     ;; Use a static authenticator when you want to force login to be a particular user
     ;;:authenticator (new-static-authenticator :user "alice")
     :authenticator (new-cookie-authenticator)

     :message-archiver (new-message-archiver))))

(defn new-dependency-map [system-map]
  (->
   {:webserver [:ring-binder]
    :ring-binder {:ring-handler :router}
    :mqtt-handler {:db :database}
    :mqtt-server [:mqtt-handler :mqtt-decoder :mqtt-encoder]
    :ws [:reactor :database]

    :html-template {:templater :clostache,
                    :web-meta :web-meta,
                    :cljs-builder :main-cljs-builder,
                    :navbar-menu :navbar-menu,
                    :sidebar-menu :sidebar-menu}
    :main-cljs-builder [:cljs-core :cljs-main :cljs-logo]

    ;; Both these components share the menu-index, but they filter on the :location key in each menu-item
    :navbar-menu [:menu-index]
    :sidebar-menu [:menu-index]}

   (autowire-dependencies-satisfying system-map :router WebService)
   (autowire-dependencies-satisfying system-map :ring-binder RingBinding)
   (autowire-dependencies-satisfying system-map :menu-index MenuItems)))

(defn new-prod-system []
  (let [s-map (-> (configurable-system-map (config))
                  (assoc :database (new-database (get (config) :postgres))
                         :cassandra (cass/new-database (get (config) :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))))
        d-map (new-dependency-map s-map)]

    (component/system-using s-map d-map)))
