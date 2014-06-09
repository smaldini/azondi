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
   [azondi.postgres :refer (new-database)]
   [azondi.passwords :as pwd]
   [azondi.cassandra :as cass]))


(defn new-dev-system
  "Create a development system"
  [& [env]]
  (cond
   (= env "prod") (let [c     (config)
                        s-map
         (->
          (configurable-system-map c)
          (assoc :api-tests (azondi.api-tests/new-api-tests)
                ;; :seed (new-seed-data)

<<<<<<< HEAD
                 :database (new-database (get (config) :postgres))
                 :cassandra (cass/new-database (get (config) :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))))
=======
                 :database (new-database (get c :postgres))
                 :user-domain (new-prod-user-domain)
                 :cassandra (cass/new-database (get c :cassandra))

                 ;; We are going to use a combination of basic and
                 ;; cookie authentication. The basic authentication is
                 ;; needed by the API tests, because it isn't cookie
                 ;; aware. We still want cookied-based authentication
                 ;; for manually testing the dev system via a browser.
                 :cookie-authenticator (new-cookie-authenticator)
                 :basic-authenticator (new-http-basic-authenticator)
                 :authenticator (new-composite-disjunctive-authenticator
                                 :cookie-authenticator :basic-authenticator)))
>>>>>>> efc25ec3240e95959ebdeda131fa29390daf9d32
                       d-map (new-dependency-map s-map)]
                   (component/system-using s-map d-map))
   :else
   (let [c     (config)
         s-map
         (->
          (configurable-system-map c)
          (assoc :api-tests (azondi.api-tests/new-api-tests)
                 :seed (new-seed-data)
<<<<<<< HEAD
                 :database (new-inmemory-datastore)))
=======
                 :database (if (System/getenv "USE_POSTGRESQL")
                             (new-database (get c :postgres))
                             (new-inmemory-datastore))
                 :cassandra (cass/new-database (get c :cassandra))
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

>>>>>>> efc25ec3240e95959ebdeda131fa29390daf9d32
         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))))
