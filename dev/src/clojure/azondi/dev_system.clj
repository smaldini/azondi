(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [clojure.tools.logging :refer :all]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map new-prod-system)]
   [azondi.api-tests :refer (new-api-tests)]
   [azondi.db :refer (Datastore get-user create-user!)]
   [azondi.dev-db :refer (new-inmemory-datastore)]
   [azondi.seed :refer (new-seed-data)]
   [azondi.postgres :refer (new-database)]
   [azondi.passwords :as pwd]
   [azondi.messages :refer (new-message-archiver)]
   [azondi.cassandra :as cass]
   [cylon.user :refer (UserDomain)]))

(defrecord DevUserDomain []
  UserDomain
  (verify-user [this uid password]
    (infof "Verifying user: %s against password %s" uid password)
    (infof "User in database is: %s" (get-user (:database this) uid))
    (= password (:password (get-user (:database this) uid)))))

(defn new-dev-user-domain []
  (component/using (->DevUserDomain) [:database]))

(defn new-dev-system
  "Create a development system"
  [& [env]]
  (cond
   (= env "prod") (let [c (config)
                        s-map
                        (->
                         (configurable-system-map (config))
                         (assoc ;;:api-tests (azondi.api-tests/new-api-tests)
                             ;;:seed (new-seed-data)

                             :database (new-database (get c :postgres))
                             :message-archiver (new-message-archiver)

                 :cassandra (cass/new-database (get c :cassandra))
                 ))
                       d-map (new-dependency-map s-map)]
                   (component/system-using s-map d-map))
   :else
   (let [db (new-inmemory-datastore)
         c (config)
         s-map
         (->
          (configurable-system-map (config))

          (assoc
              :seed (new-seed-data)
              ;; :api-tests (azondi.api-tests/new-api-tests)
              :user-domain (new-dev-user-domain)
              :database db
              ;;:user-domain-seed (->UserDomainSeeder)

              ;; MS: I think we should create another profile for postgres
              #_:database #_(if (System/getenv "USE_POSTGRESQL")
                              (new-database (get c :postgres))
                              (new-inmemory-datastore))
              ;;:cassandra (cass/new-database (get c :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
              ))

         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))))
