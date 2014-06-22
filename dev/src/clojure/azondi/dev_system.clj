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
   (= env "prod")
   (let [c (config)
         s-map
         (->
          (configurable-system-map (config))
          (assoc
              :database (new-database (get c :postgres))
              :message-archiver (new-message-archiver)
              :cassandra (cass/new-database (get c :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
              ))
         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))

   (= env "ui")
   (let [c (config)
         db (new-inmemory-datastore)
         s-map
         (->
          (configurable-system-map (config))

          (assoc
              :database db
              :seed (new-seed-data)
              ;;:api-tests (azondi.api-tests/new-api-tests)
              :user-domain (new-dev-user-domain)
              ))

         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))

   :else
   (let [c (config)
         db (new-database (get c :postgres))
         s-map
         (->
          (configurable-system-map (config))

          (assoc
              :seed (new-seed-data)
              ;;:api-tests (azondi.api-tests/new-api-tests)
              :user-domain (new-dev-user-domain)
              :database db
              :message-archiver (new-message-archiver)
              :cassandra (cass/new-database (get c :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
              ))

         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))))
