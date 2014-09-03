(ns azondi.public-topic-test
  (:require [clojure.test :refer :all]
            [azondi.transports.test-helpers :as th]
            [com.stuartsierra.component :as component :refer (system-map system-using)]
            [bidi.bidi :refer (path-for)]
            [modular.http-kit :refer (new-webserver)]
            [modular.bidi :refer (new-router routes uri-context)]
            [azondi.webapp :refer (new-webapp)]
            [azondi.api :refer (new-api new-user-authorizer new-api-key-authenticator)]
            [azondi.postgres :refer (new-database)]
            [azondi.cassandra :as cass]
            [azondi.dev-system :refer (new-dev-user-domain)]
            [cylon.impl.login-form :refer (new-login-form)]
            [cylon.impl.authentication :refer (new-composite-disjunctive-authenticator
                                               new-http-basic-authenticator)]
            ))



(defn new-api-system
  "Define a minimal system which is just enough for the tests in this
  namespace to run"
  []
  (component/system-using
   (component/system-map
    :webserver (new-webserver :port 8020)
    :webrouter (new-router)
    :database (new-database {:host "127.0.0.1"
                               :dbname th/test-postgresql-db
                               :user th/test-postgresql-user
                               :password "opendata"})
    :cassandra  (cass/new-database
                  {:keyspace "opensensors_test"
                   :hosts ["127.0.0.1"]})
    :api (new-api :uri-context "/api/1.0")
    :authorizer (new-user-authorizer)
    :http-authenticator (new-http-basic-authenticator)
    :api-key-authenticator (new-api-key-authenticator)
    :authenticator (new-composite-disjunctive-authenticator
                    :http-authenticator
                    :api-key-authenticator
                    )
    :user-domain (new-dev-user-domain))

   {:webserver {:request-handler :webrouter}
    :webrouter [:api]
    }))

(def ^:dynamic *system* nil)

(defn web-system-fixture
  [f]
  (th/with-system (new-api-system)
    (f)))


(use-fixtures :once th/maybe-load-schema-fixture)
(use-fixtures :each web-system-fixture)

(defn make-uri [target & args]
  (format "http://localhost:%d%s%s"
          (-> *system* :webserver :port)
          (uri-context (-> *system* :api))
          (apply path-for (routes (-> *system* :api)) target args)))

(deftest test-welcome
  (testing "control"
    (is (= (+ 2 2) 4)))

  (testing "welcome path"
    (is (= (make-uri :azondi.api/welcome)
           (format "http://localhost:%d/api/1.0" 8020)))))
