(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (new-system config configurable-system-map new-dependency-map)]
   [azondi.seed :refer (new-database-seed)]
   [azondi.authentication :as auth]))

(defn new-dev-system-minus-database
  "Create a development system without a database"
  []
  (component/system-using
             (-> (configurable-system-map (config))
                 (dissoc :database)
                 ;; If we don't have a database, we use a protection system that doesn't depend on it.
                 (assoc :protection-system (auth/new-local-protection-system
                                                 :password-file (io/file (System/getProperty "user.home") ".azondi-passwords.edn"))))
             (new-dependency-map)))

(defn new-dev-system-with-database
  "Create a development system"
  []
  (component/system-using
             (assoc (configurable-system-map (config)) :database-seed (new-database-seed))
             (merge (new-dependency-map) {:database-seed [:database]})))

(defn new-dev-system []
  (new-dev-system-minus-database))
