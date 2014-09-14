(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [clojure.tools.logging :refer :all]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map new-prod-system)]
   [azondi.api-tests :refer (new-api-tests)]
   [azondi.db :refer (get-user create-user!)]
   [azondi.db.protocol :refer (DataStore)]
   [azondi.dev-db :refer (new-inmemory-datastore new-inmemory-message-store)]
   [azondi.seed :refer (new-seed-data new-direct-db-seed-data)]
   [azondi.postgres :refer (new-database new-postgres-user-domain)]
   [azondi.passwords :as pwd]
   [azondi.messages :refer (new-message-archiver)]
   [azondi.cassandra :as cass]
   [azondi.simulator :refer (new-simulator)]
   [cylon.user :refer (UserDomain)]))

(defrecord DevUserDomain []
  UserDomain
  (verify-user [this uid password]
    (= password (:password (get-user (:database this) uid)))))

(defn new-dev-user-domain []
  (component/using (->DevUserDomain) [:database]))

(def mod-defs
  {:system-mods
   {:ui
    (fn [config]
      (fn [system-map]
        (-> system-map
            (assoc
                :database (new-inmemory-datastore)
                :seed (new-seed-data)
                :direct-db-seed (new-direct-db-seed-data)
                ;;:api-tests (azondi.api-tests/new-api-tests)
                :user-domain (new-dev-user-domain)
                :cassandra (new-inmemory-message-store))
            (dissoc :message-archiver))))

    :sim
    (fn [config]
      (fn [system-map]
        (assoc system-map
          :simulator (-> (apply new-simulator (apply concat (:simulator config)))
                         (component/using [:mqtt-server])))))

    :pg
    (fn [config]
      (fn [system-map]
        (-> system-map
            (assoc
                :database (new-database (get system-map :postgres))
                :user-domain (new-postgres-user-domain))
            (dissoc :cassandra :message-archiver :topic-injector))))

    :messaging
    (fn [config]
      (fn [system-map]
        (-> system-map
            (assoc :database (new-database (get system-map :postgres))
                   :user-domain (new-postgres-user-domain))
            (dissoc :webapp :webrouter :webserver
                    :api :sse :login-form :cljs-core
                    :cljs-main :main-cljs-builder
                    :session-authenticator :apikey-authenticator
                    :authenticator :authorizer :session-store))))}

   :dependency-mods
   {:messaging
    (fn [config]
      (fn [dependency-map]
        (dissoc dependency-map :main-cljs-builder :webserver :webrouter)))}})

(defn new-dev-system
  "Create a development system"
  [env]
  (let [config (config)]
    (component/system-using
     ((apply comp
             (map #(% config) (remove nil? (for [mod env] (get-in mod-defs [:system-mods mod])))))
      (configurable-system-map config))
     ((apply comp
             (map #(% config) (remove nil? (for [mod env] (get-in mod-defs [:dependency-mods mod])))))
      (new-dependency-map))
     )))
