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
   [azondi.postgres :refer (new-database new-postgres-user-domain)]
   [azondi.passwords :as pwd]
   [azondi.messages :refer (new-message-archiver)]
   [azondi.cassandra :as cass]
   [cylon.user :refer (UserDomain)]))

(defrecord DevUserDomain []
  UserDomain
  (verify-user [this uid password]
    (= password (:password (get-user (:database this) uid)))))

(defn new-dev-user-domain []
  (component/using (->DevUserDomain) [:database]))

(defn new-dev-system
  "Create a development system"
  [& [env]]
  (cond
   (= env :ui)
   (let [c (config)
         s-map
         (->
          (configurable-system-map (config))

          (assoc
              :database (new-inmemory-datastore)
              :seed (new-seed-data)
              ;;:api-tests (azondi.api-tests/new-api-tests)
              :user-domain (new-dev-user-domain)
              )
          (dissoc :cassandra :message-archiver))

         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))

   (= env :pg)
   (let [c (config)
         db (new-inmemory-datastore)
         s-map
         (->
          (configurable-system-map (config))

          (assoc
              :database (new-database (get c :postgres))
              :user-domain (new-postgres-user-domain))

          (dissoc :cassandra :message-archiver))

         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))

   :else ; PROD
   (let [c (config)
         s-map (configurable-system-map (config))
         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))

   ))
