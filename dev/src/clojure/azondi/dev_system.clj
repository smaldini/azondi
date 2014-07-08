(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [clojure.tools.logging :refer :all]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map new-prod-system)]
   [azondi.api-tests :refer (new-api-tests)]
   [azondi.db :refer (get-user create-user!)]
   [azondi.db.protocol :refer (Datastore)]
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

(defn ui-system
  ([]
     (ui-system nil))
  ([m]
     (let [c (merge (config) m)
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
       (component/system-using s-map d-map))))

(defn pg-system
  ([]
     (pg-system nil))
  ([m]
     (let [c (merge (config) m)
           s-map
           (->
            (configurable-system-map (config))
            (assoc
                :database (new-database (get c :postgres))
                :user-domain (new-postgres-user-domain))
            (dissoc :cassandra :message-archiver :topic-injector))
           d-map (new-dependency-map s-map)]
       (component/system-using s-map d-map))))

(defn messaging-system
  ([]
     (messaging-system nil))
  ([m]
     (let [c (merge (config) m)
           s-map
           (->
            (configurable-system-map (config))
            (assoc
                :database (new-database (get c :postgres))
                :user-domain (new-postgres-user-domain))
            (dissoc :webapp :webrouter :webserver :api :sse :login-form
                    :cljs-core :cljs-main :main-cljs-builder
                    :session-authenticator :apikey-authenticator :authenticator :authorizer :session-store))
           d-map (-> (new-dependency-map s-map)
                     (dissoc :main-cljs-builder :webserver :webrouter))]
       (component/system-using s-map d-map))))

(defn production-system
  ([]
     (production-system nil))
  ([m]
     (let [c     (merge (config) m)
           s-map (configurable-system-map (config))
           d-map (new-dependency-map s-map)]
       (component/system-using s-map d-map))))

(defn new-dev-system
  "Create a development system"
  ([env]
     (cond
      (= env :ui)        (ui-system nil)
      (= env :pg)        (pg-system nil)
      (= env :messaging) (messaging-system nil)

      :else ; PROD
      (production-system nil)))
  ([env m]
     (cond
      (= env :ui)        (ui-system m)
      (= env :pg)        (pg-system m)
      (= env :messaging) (messaging-system m)

      :else ; PROD
      (production-system m))))
