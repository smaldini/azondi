(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [clojure.tools.logging :refer :all]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map new-prod-system)]
   [azondi.api-tests :refer (new-api-tests)]
   [azondi.db :refer (Datastore get-user)]
   [azondi.dev-db :refer (new-inmemory-datastore)]
   [azondi.seed :refer (new-seed-data)]
   [cylon.user :refer (UserDomain)]
   [cylon.impl.authentication :refer (new-http-basic-authenticator new-composite-disjunctive-authenticator)]
   [cylon.impl.session :refer (new-cookie-authenticator)]
   [azondi.postgres :refer (new-database)]
   [azondi.passwords :as pwd]
   [azondi.data.cassandra :as cass]))

(defrecord DevUserDomain []
  UserDomain
  (verify-user [this uid password]
    (infof "Verifying user: %s against password %s" uid password)
    (infof "User in database is: %s" (get-user (:database this) uid))
    (= password (:password (get-user (:database this) uid)))))

(defn new-dev-user-domain []
  (component/using (->DevUserDomain) [:database]))

(defrecord ProdUserDomain []
  UserDomain
  (verify-user [this uid password]
    (let [user (get-user (:database this) uid)]
      (infof "Verifying user: %s against password %s" uid password)
      (infof "User in database is: %s" user)
      (and (not (nil? user))
           (pwd/verify password (:password_hash user uid))))))

(defn new-prod-user-domain []
  (component/using (->ProdUserDomain) [:database]))

(defn new-dev-system
  "Create a development system"
  [& [env]]
  (cond
   (= env "prod") (let [s-map
         (->
          (configurable-system-map (config))
          (assoc :api-tests (azondi.api-tests/new-api-tests)
                 :seed (new-seed-data)

                 :database (new-database (get (config) :postgres))
                 :user-domain (new-prod-user-domain)
                 :cassandra (cass/new-database (get (config) :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))

                 ;; We are going to use a combination of basic and
                 ;; cookie authentication. The basic authentication is
                 ;; needed by the API tests, because it isn't cookie
                 ;; aware. We still want cookied-based authentication
                 ;; for manually testing the dev system via a browser.
                 :cookie-authenticator (new-cookie-authenticator)
                 :basic-authenticator (new-http-basic-authenticator)
                 :authenticator (new-composite-disjunctive-authenticator
                                 :cookie-authenticator :basic-authenticator)
                 ))
                       d-map (new-dependency-map s-map)]
                   (component/system-using s-map d-map))
   :else
   (let [s-map
         (->
          (configurable-system-map (config))
          (assoc :api-tests (azondi.api-tests/new-api-tests)
                 :seed (new-seed-data)
                 :database (new-inmemory-datastore)
                 :user-domain (new-dev-user-domain)

                 ;; We are going to use a combination of basic and
                 ;; cookie authentication. The basic authentication is
                 ;; needed by the API tests, because it isn't cookie
                 ;; aware. We still want cookied-based authentication
                 ;; for manually testing the dev system via a browser.
                 :cookie-authenticator (new-cookie-authenticator)
                 :basic-authenticator (new-http-basic-authenticator)
                 :authenticator (new-composite-disjunctive-authenticator
                                 :cookie-authenticator :basic-authenticator)
                 ))

         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))))
