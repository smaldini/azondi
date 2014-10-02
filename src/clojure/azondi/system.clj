(ns azondi.system
  "(Component-based) system configuration and inter-component dependencies"
  (:require
   [com.stuartsierra.component :as component :refer (system-map system-using using)]
   [azondi.config :refer [user-config config-from-classpath]]
   [azondi.passwords :refer (new-scrypt-hash-algo)]
   [clojure.string :as str]
   [clojure.core.async :as async]
   [clojure.tools.logging :refer :all]
   [schema.core :as s]

   [bidi.bidi :refer (->ResourcesMaybe)]

   ;; Pre-baked components
   [modular.cljs :refer (new-cljs-builder new-cljs-module)]
   [modular.netty :refer (new-netty-server)]
   [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
   [modular.http-kit :refer (new-webserver) :rename {new-webserver new-http-listener}]
   [modular.bidi :refer (new-router new-web-service)]

   [modular.bootstrap.cylon.user-forms :refer (new-bootstrap-user-form-renderer)]

   [azondi.emails :refer (new-emailer)]

   [cylon.authentication.login :refer (new-login)]
   [cylon.authentication :refer (new-dispatching-request-authenticator)]
   [cylon.oauth.server.server :refer (new-authorization-server)]
   [cylon.oauth.server.logout :refer (new-logout)]
   [cylon.oauth.client.web-client :refer (new-web-client)]
   [cylon.oauth.registry.ref-backed-registry :refer (new-ref-backed-client-registry)]
   [cylon.oauth.resource :refer (new-access-token-request-authenticator
                                 new-personal-access-token-request-authenticator)]
   [cylon.password :refer (new-durable-password-verifier)]
   [cylon.session.cookie-session-store :refer (new-cookie-session-store)]
   [cylon.signup.signup :refer (new-signup-with-totp)]
   [cylon.token-store.atom-backed-store :refer (new-atom-backed-token-store)]

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
   [azondi.postgres :refer (new-database new-sql-backed-token-store)]
   [azondi.cassandra :as cass]
   [azondi.api :refer (new-api)]
   [azondi.webapp :refer (new-webapp)]
   [azondi.stream-summary :refer (new-topic-summarizer)]
   [azondi.basepage :refer (new-basepage-content-boilerplate new-auth-basepage-content-boilerplate)]
   )
  (:import [modular.cljs ClojureScriptBuilder]))

(defn config
  "Return a map of the static configuration used in the component
  constructors."
  []
  (merge
   (config-from-classpath)
   (user-config)))

(defn add-database
  "Add the PostgreSQL database."
  [system config]
  (assoc system
    :database (new-database (get config :postgres))))

(defn add-broker
  "The heart of Azondi is an MQTT broker."
  [system]
  (assoc system
    :mqtt-decoder (new-mqtt-decoder)
    :mqtt-encoder (new-mqtt-encoder)

    :mqtt-handler (-> (new-netty-mqtt-handler)
                      (using {:db :database}))

    :mqtt-server (-> (new-netty-server {:port 1883})
                     (using [:mqtt-handler :mqtt-decoder :mqtt-encoder]))))

(defn add-see-debug-channel
  [system]
  (assoc system
    #_:sse-debug #_(let [sse-ch (async/chan 64)
                         ;; SSE splits on client-id
                         sse-pub (async/pub (async/tap debug-mult sse-ch) :client-id)]
                     (new-event-service :async-pub sse-pub))))

(defn add-reactor
  "Add the Reactor."
  [system]
  (assoc system
    :reactor (new-reactor)))

(defn add-metrics [system]
  (assoc system
    :metrics (new-metrics {:hostname (.. java.net.InetAddress getLocalHost getHostName)
                           :prefix "azondi"})))

(defn add-topic-injector [system]
  (assoc system
     :topic-injector (-> (new-topic-injector)
                       (using {:reactor :reactor
                               :database :database}))))

(defn add-websocket-bridge [system]
  (assoc system
    :ws-bridge (-> (new-websocket-bridge {:port 8083})
                   (using {:reactor :reactor
                           :database :database}))))

(defn add-message-store
  "Add Cassandra for storing messages."
  [system config]
  (assoc system
    :cassandra
    (cass/new-database
     (get config :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))

    :message-archiver
    (-> (new-message-archiver)
        (using {:reactor :reactor
                :cassandra :cassandra}))))

(defn add-clojurescript
  "Add ClojureScript modules and a builder."
  [system]
  (assoc system
    :cljs-core (new-cljs-module :name :cljs
                                :mains ['cljs.core]
                                :dependencies #{})

    :cljs-main (new-cljs-module :name :azondi
                                :mains ['azondi.main]
                                :dependencies #{:cljs})

    :cljs-logo (new-cljs-module :name :logo
                                :mains ['azondi.logo]
                                :dependencies #{:cljs})

    :cljs-topic-browser (new-cljs-module :name :topic-browser
                                         :mains ['azondi.topic-browser]
                                         :dependencies #{:cljs})
    :main-cljs-builder
    (-> (new-cljs-builder :source-path "src/cljs")
        (using [:cljs-core :cljs-main :cljs-logo :cljs-topic-browser]))))

(defn add-authorization-server
  "Add an OAuth2 authorization server. These components handle a wide
  range of authentication and authorization concerns, including user
  authentication (possibly multi-factor), user sign-up, password
  verification and reset, email verification, scopes, issuing access
  tokens and authorizing clients to use Azondi resources on behalf of
  users.

  One benefit of separating out the authorization server from other
  parts of the system is to allow other clients (web applications) to
  secure access to Azondi's capabilities. This may help to popularize
  Azondi further, and help to make it part of the rich fabric of cloud
  web services available today.

  See RFC-6749 for a more details on OAuth2."
  [system config]
  (assoc system

    ;; We create a token store to track logged-in users.
    :authorization-server-token-store
    (new-sql-backed-token-store
     :token-type "AUTH-SERVER"
     :ttl-in-secs (* 60 60 24))

    ;; We layer on a session store, using HTTP cookies to keep users
    ;; logged in.
    :authorization-server-session-store
    (-> (new-cookie-session-store :cookie-id "azondi-authorization-server-session-id")
        (using {:token-store :authorization-server-token-store}))

    ;; Custom rendered forms will be wrapped in boilerplate. This uses
    ;; basepage.clj right now but will be changed to use the new design.
    ;; The boilerplate needs access to an authenticator to determine
    ;; whether the user is known, logged in, etc..
    ;; Since we're the authorization server, credentials can be found in the http
    ;; session. (Cookie session stores satisfy the RequestAuthenticator
    ;; protocol).
    :user-form-boilerplate
    (-> (new-auth-basepage-content-boilerplate)
        (using {:authenticator :authorization-server-session-store}))

    ;; For custom rendering of user forms (login, signup, reset
    ;; password...) we will use Bootstrap, provided by modular. We can
    ;; choose to provide our own at any point, but the modular one
    ;; should do for standard formatted forms.
    :user-form-renderer (-> (new-bootstrap-user-form-renderer :totp-appname "OpenSensorsIO")
                            (using {:boilerplate :user-form-boilerplate}))

    ;; We now specify the password hashing algorithm
    :password-hash-algo (new-scrypt-hash-algo)

    ;; The durable password verifier is responsible for storing and
    ;; verifying passwords, and generating and storing salts. Our
    ;; database implementation satisfies cylon.user.protocols/UserStore.
    :password-verifier
    (-> (new-durable-password-verifier)
        (using {:password-hash-algo :password-hash-algo
                :user-store :database}))

    ;; A login form, which manages the authentication 'interaction' with
    ;; a user, providing the outcome to other interested components.
    :login
    (-> (new-login)
        (using {:renderer :user-form-renderer
                :session-store :authorization-server-session-store
                :password-verifier :password-verifier}))

    ;; When OAuth clients contact the authorization server, it looks them up
    ;; in its registry. Since registration of all clients is part of
    ;; this system, we don't (yet) use a durable registry.
    :oauth-client-registry (new-ref-backed-client-registry)

    ;; One of the roles of an OAuth2 authorization server is to issue
    ;; access
    ;; tokens that can be used to access resources. This is specified here.
    ;; Access tokens last 24 hours, but this is expected to be reduced
    ;; once the capability to refresh tokens has been implemented.
    :oauth-access-token-store (new-sql-backed-token-store
                         :token-type "ACCESS-TOKENS"
                         :ttl-in-secs (* 60 60 24))

    ;; Now for the authorization server.
    :authorization-server
    (-> (new-authorization-server
         :scopes { ;; These you get when you sign up
                  :user {:description "Read all your devices and topics"} ; allows to read your devices/topics
                  :user/write-devices {:description "Create new devices, and modify and delete your existing devices "}

                  :user/write-topics  {:description "Create new topics, and modify and delete your existing devices "}

                  ;; These you get when you pay money
                  :user/create-private-topics {:description "Create private topics"}

                  ;; These you get when you're a superuser
                  :superuser/read-users {:description "List users"}
                  :superuser/create-topics {:description "Create any topic"}

                  ;; These are available through the API, not via OSIO's UI however.
                  :superuser/dba {:description "Restart the database"}
                  :superuser/reboot {:description "Reboot hosts"}}
         :iss "https://opensensors.io")
        (using {:session-store :authorization-server-session-store
                :authentication-interaction :login
                :client-registry :oauth-client-registry
                :access-token-store :oauth-access-token-store}))

    ;; It is desirable for users to be able to explicitly logout of
    ;; sessions.
    :logout (-> (new-logout)
                (using
                 {:session-store :authorization-server-session-store}))

    ;; When users sign up, a verification code will be emailed to them,
    ;; which allows us to authenticate email addresses. We must store
    ;; these codes so that we know which user has been issued which
    ;; code, and to verify the authenticity of a link when the user
    ;; clicks on it from their email. Not every user will check their
    ;; email immediately, so we set a grace period of 90 days.
    :verification-code-store
    (new-sql-backed-token-store
     :ttl-in-secs (* 60 60 24 90)       ; 90 days
     :token-type "EMAIL")

    ;; Emails are sent via this component
    :emailer (new-emailer ;;:settings (get config :sendgrid)
              )

    ;; The sign-up form, like the login-form, takes a renderer and has
    ;; dependencies on many of the components already defined.
    :signup-form
    (-> (new-signup-with-totp)
        (using {:user-store :database
                :password-verifier :password-verifier
                :session-store :authorization-server-session-store
                :renderer :user-form-renderer
                :verification-code-store :verification-code-store
                :emailer :emailer}))

    ;; Web resources include static HTML, CSS, JavaScript, etc.
    :web-resources
    (new-web-service
     :request-handlers {}
     :routes ["/" [[""
                    (->ResourcesMaybe {:prefix "public/"})]
                   ["js/" (->ResourcesMaybe {:prefix "react/"})]]]
     :uri-context "")

    ;; A bidi-compatible router brings together components that provide
    ;; web services.
    :authorization-server-webrouter
    (-> (new-router)
        (using [:authorization-server :login :logout :signup-form :main-cljs-builder :web-resources]))

    ;; Finally, the router is made accessible over HTTP, using an
    ;; http-kit listener. The authorization server is now fully defined
    ;; and ready to start.
    :authorization-server-http-listener
    (-> (new-http-listener :port 8020)
        (using {:request-handler :authorization-server-webrouter}))))

(defn add-resource-server
  "Add a resource server.

   There wouldn't be much point in all this authorization apparatus
  unless there was something to authorize access to. These resources are
  defined here. They include the Azondi API (defined as Liberator
  resources, SSE fire-hoses and other web routes)"
  [system]
  (assoc system

    ;; We have already defined an oauth-access-token-store which the
    ;; authorization server uses to store the access tokens it has
    ;; issued. We need this token store to correlate incoming requests
    ;; bearing access tokens with the authorization rights (scopes) that
    ;; have been granted. Such requests will have an Authorization
    ;; header using the Bearer token method of authorization (see
    ;; RFC-6749).
    :oauth-access-token-request-authenticator
    (-> (new-access-token-request-authenticator)
        (using {:access-token-store :oauth-access-token-store}))

    ;; API keys are 'personal access tokens' that are issued to
    ;; users. Azondi calls these api-keys, Cylon calls them personal
    ;; access tokens. They are the same thing. This component defines
    ;; the storage for these tokens. In this case, the tokens do not
    ;; expire, although we may revisit this policy. Tokens can be
    ;; revoked by being purged from storage.
    :api-key-token-store (new-sql-backed-token-store
                          :token-type "API-KEYS"
                          :ttl-in-secs nil)

    ;; Requests bearing Authorization headers containing the token
    ;; 'api-key' are authenticated by this component.
    :api-key-request-authenticator
    (-> (new-personal-access-token-request-authenticator
         :header-token "api-key")
        (using {:token-store :api-key-token-store}))

    ;; This dispatching authenticator dispatches based on the
    ;; Authorization header in the request. Since we have multiple ways
    ;; of authorizing access to resources, this component dispatches to
    ;; the correct authenticator. (Note: we could easily add support for
    ;; other authorization methods, such as Basic and Digest
    ;; authorization).
    :api-request-authenticator
    (new-dispatching-request-authenticator
     :mappings {"Bearer" :oauth-access-token-request-authenticator
                "api-key" :api-key-request-authenticator})

    ;; The API is set of Liberator resources. The password verifier is
    ;; only used by the API to hash passwords for new users that are
    ;; created via the API. It does not use the password verifier for
    ;; authentication.
    :api
    (-> (new-api :uri-context "/api/1.0")
        (using {:database :database
                :password-verifier :password-verifier
                :messages-store :cassandra
                :authenticator :api-request-authenticator}))

    ;; The SSE fire-hose is restricted in just the same way as the API.
    :sse-bridge
    (-> (new-sse-bridge)
        (using {:reactor :reactor
                :authenticator :api-request-authenticator
                :database :database}))

    ;; We combine these resources into a bidi-compatible router.
    :resource-router
    (-> (new-router)
        (using [:api :sse-bridge]))

    ;; Finally, the router is made accessible over HTTP, using an
    ;; http-kit listener. The resource server is now fully defined
    ;; and ready to start.
    :resource-listener (-> (new-http-listener :port 8030)
                           (using {:request-handler :resource-router}))))

(defn add-webapp-server
  "Add a web application.

  Web applications are OAuth2 clients.

  This is the web application formerly known as 'le web', providing the
  opensensors.io welcome screen, docs, device and topic management,
  etc. Although it is branded as opensensors.io, it is no more
  privileged with respect to Azondi than potentially any other web
  application. It must collaborate fully with the authorization server
  in order to gain access to Azondi's resources. Consequently, these
  components can be hosted out-of-process, or ultimately on a separate
  host. We may consider doing that sometime in the future."
  [system]
  (assoc system
    ;; TODO: Why doesn't web app need :web-resources? Is it duplicating
    ;; these routes?

    ;; The webapp establishes long running sessions with its users,
    ;; represented by durable tokens stored in PostgreSQL.
    :webapp-token-store (new-sql-backed-token-store :token-type "OSIOWEB")

    :webapp-session-store
    (-> (new-cookie-session-store :cookie-id "opensensors-webapp-session-id")
        (using {:token-store :webapp-token-store}))

    ;; Clients generate state tokens to ensure the authenticity of the
    ;; authorization server that contact it
    :state-store
    (new-atom-backed-token-store :ttl-in-secs 60)

    ;; The webapp defines the configuration of an OAuth2 client, which
    ;; it can then use to determine a user's identity and authorization
    ;; rights.
    ;;
    :webapp-oauth-client
    (-> (new-web-client
         :application-name "OpenSensors UI"
         :homepage-uri "https://opensensors.io"
         ;; TODO This isn't going to work in PROD - need to compose the uri - also, beware of reverse proxies
         :redirection-uri "http://localhost:8010/oauth/grant"
         :post-logout-redirect-uri "http://localhost:8010/"

         :required-scopes #{:user
                            :user/write-devices
                            :user/write-topics
                            :user/create-private-topics
                            :superuser/read-users
                            :superuser/create-topics}

         ;; Note that since this client component is implemented according to
         ;; the OAuth2 standard, it could be used by the Azondi resource
         ;; server in order to establish secure access to the APIs of other
         ;; services, such as Github, Twitter, Facebook, Google and a vast
         ;; array of other web services. Therefore, there is no reason
         ;; why these URIs have to target the Azondi authorization
         ;; server. Some other organization's OAuth2 authorization
         ;; server could be used to gain access to other services. In
         ;; that case, a client would have to be registered with that
         ;; service and details (client-id, client-secret) configured
         ;; here.
                                        ;
         ;; Perhaps we could get these during dynamic registration with
         ;; the client-registry?
         :authorize-uri "http://localhost:8020/login/oauth/authorize"
         :access-token-uri "http://localhost:8020/login/oauth/access_token"
         :end-session-endpoint "http://localhost:8020/logout"

         ;; Specify this client is special doesn't require the user to
         ;; authorize the application. This should only be false for
         ;; standard opensensors applications, and always set to true
         ;; for third-party ones.
         :requires-user-acceptance? false)

        (using
         { ;; Clients auto-register if :client-registry is specified.
          :client-registry :oauth-client-registry
          :state-store :state-store
          :session-store :webapp-session-store}))

    ;; The webapp component defines all the web routes (web pages) that
    ;; are served by the application. The OAuth2 client component is
    ;; passed in as a dependency that the web application can use to
    ;; determine the user's identity and authorization.
    :webapp
    (-> (new-webapp)
        (using {:oauth-client :webapp-oauth-client}))

    ;; We combine these resources into a bidi-compatible router.
    :webapp-router
    (-> (new-router)
        (using [:webapp :webapp-oauth-client :main-cljs-builder]))

    ;; Finally, the router is made accessible over HTTP, using an
    ;; http-kit listener. The web application is now fully defined
    ;; and ready to start.
    :webapp-listener
    (-> (new-http-listener :port 8010)
        (using {:request-handler :webapp-router}))))

(defn configurable-system-map
  "Build the system map, piece by piece"
  [config]
  (infof "Building system map")
  (apply system-map
         (apply concat
                (-> {}
                    (add-database config)
                    add-broker
                    add-reactor
                    add-metrics
                    add-topic-injector
                    add-websocket-bridge
                    (add-message-store config)
                    add-clojurescript
                    (add-authorization-server config)
                    add-resource-server
                    add-webapp-server))))

(defn new-prod-system []
  (let [s-map (configurable-system-map (config))]
    (component/system-using s-map {})))
