(ns azondi.tests.test-helpers
  (:require [clojure.java.io :as io]
            [clojure.java.jdbc :as psql]
            [clojure.java.shell :as sh]
            [clojure.core.async :as async]
            [byte-streams :refer (convert)]
            [clj-time.core   :as tc]
            [clj-time.format :as tf]
            [com.stuartsierra.component :as component :refer (system-map system-using)]
            [azondi.config :refer [user-config config-from-classpath]]
            [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query :refer :all]
            [cylon.impl.login-form :refer (new-login-form)]
            [cylon.impl.authentication :refer (new-composite-disjunctive-authenticator
                                               new-http-basic-authenticator)]
            [bidi.bidi :refer (path-for)]
            [modular.netty :refer (new-netty-server)]
            [modular.netty.mqtt :refer (new-mqtt-decoder new-mqtt-encoder)]
            [modular.http-kit :refer (new-webserver)]
            [modular.bidi :refer (new-router routes uri-context)]
            [azondi.transports.mqtt :refer (new-netty-mqtt-handler)]
            [azondi.reactor :refer (new-reactor)]
            [azondi.bridges.ws :refer (new-websocket-bridge)]
            [azondi.topics :refer (new-topic-injector)]
            [azondi.metrics :refer (new-metrics)]
            [azondi.messages :refer (new-message-archiver)]
            [azondi.postgres :refer (new-database new-postgres-user-domain)]
            [azondi.webapp :refer (new-webapp)]
            [azondi.api :refer (new-api new-user-authorizer new-api-key-authenticator)]
            [azondi.cassandra :as cass]
            [azondi.tests.joplin-helpers :as jh]))


(def ^:dynamic *system* nil)

(defn new-api-system
  "Define a minimal system which is just enough for the tests in this
  namespace to run"
  []
  (component/system-using
   (component/system-map
    :webserver (new-webserver :port 8020)
    :webrouter (new-router)
    :database (new-database {:host "127.0.0.1"
                             :dbname jh/test-postgresql-db
                             :user jh/test-postgresql-user
                             :password "opendata"})
    :cassandra (cass/new-database
                {:keyspace "opensensors_test"
                 :hosts ["127.0.0.1"]})
    :api (new-api :uri-context "/api/1.0")
    :authorizer (new-user-authorizer)
    :http-authenticator (new-http-basic-authenticator)
    :api-key-authenticator (new-api-key-authenticator)
    :authenticator (new-composite-disjunctive-authenticator
                    :http-authenticator
                    :api-key-authenticator)
    :user-domain (new-postgres-user-domain))

   {:webserver {:request-handler :webrouter}
    :webrouter [:api]}))

(defn make-uri
  [target & args]
  (format "http://localhost:%d%s%s"
          (-> *system* :webserver :port)
          (uri-context (-> *system* :api))
          (apply path-for (routes (-> *system* :api)) target args)))

(defmacro with-system
  [system & body]
  `(let [s# (component/start ~system)]
     (try
       (binding [*system* s#] ~@body)
       (finally
         (component/stop s#)))))

(defn with-system-fixture
  [system]
  (fn [f]
    (with-system (system)
      (f))))
