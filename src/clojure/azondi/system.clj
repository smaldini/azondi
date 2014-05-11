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
   [clojure.tools.logging :refer (infof)]

   ;; Pre-baked components
   [modular.bidi :refer (new-router WebService)]
   [modular.cljs :refer (new-cljs-module new-cljs-builder)]
   [modular.clostache :refer (new-clostache-templater)]
   [modular.http-kit :refer (new-webserver)]
   [modular.maker :refer (make)]
   [modular.menu :refer (new-menu-index new-bootstrap-menu MenuItems)]
   [modular.netty :refer (new-netty-server)]
   [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
   [modular.ring :refer (new-ring-binder RingBinding)]
   [modular.template :refer (new-template new-template-model-contributor)]
   [modular.wire-up :refer (autowire-dependencies-satisfying)]
   [cylon.impl.login-form :refer (new-login-form)]
   [cylon.impl.password :refer (new-password-file new-user-domain)]
   [cylon.impl.session :refer (new-atom-backed-session-store)]
   [cylon.impl.request :refer (new-auth-request-binding)]
   [cylon.impl.authentication :refer (new-static-authenticator)]
   [cylon.impl.authorization :refer (new-role-based-authorizer)]

   ;; Custom components
   [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
   [azondi.reactor :refer (new-reactor)]
   [azondi.bridges.ws :refer (new-websocket-bridge)]
   [azondi.data.messages :refer (new-message-archiver)]
   [azondi.website :refer (new-website)]
   [azondi.sse :refer (new-event-service)]
   [azondi.postgres :refer (new-database)]
   [azondi.api :refer (new-api new-user-based-authorizer)]
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
     :bootstrap-menu (make new-bootstrap-menu)
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
     ;; :protection-domain (make new-default-protection-system config :password-file :modular.maker/required)
     #_:login-form #_(new-login-form)
     #_:user-authenticator #_(new-user-domain)
     #_:password-store #_(make new-password-file config
                                 :password-file (io/file (System/getProperty "user.home")
                                                         ".azondi-passwords.edn"))
     #_:session-store #_(new-atom-backed-session-store)
     :auth-binding (new-auth-request-binding)
     :authenticator (new-static-authenticator :user "alice")
     :user-authorizer (new-user-based-authorizer)
     :authorizer (new-role-based-authorizer)

     :message-archiver (new-message-archiver))))

(defn new-dependency-map [system-map]
  (->
   {:webserver [:ring-binder]
    :ring-binder {:ring-handler :router}
;;    :auth-binding {:authorizer :role-authorizer}
    :mqtt-handler {:db :database}
    :mqtt-server [:mqtt-handler :mqtt-decoder :mqtt-encoder]
    :ws [:reactor :database]
    :html-template {:templater :clostache
                    :web-meta :web-meta
                    :cljs-builder :main-cljs-builder
                    :bootstrap-menu :bootstrap-menu}
    :main-cljs-builder [:cljs-core :cljs-main :cljs-logo]
    :bootstrap-menu [:menu-index]}

   (autowire-dependencies-satisfying system-map :router WebService)
   (autowire-dependencies-satisfying system-map :ring-binder RingBinding)
   (autowire-dependencies-satisfying system-map :menu-index MenuItems)))

(defn new-prod-system []
  (let [s-map (-> (configurable-system-map (config))
                  (assoc :database (new-database (get config :postgres))))
        d-map (new-dependency-map s-map)]

    (component/system-using s-map d-map)))
