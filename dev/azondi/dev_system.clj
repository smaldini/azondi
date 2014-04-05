(ns azondi.dev-system
  (:require
   [com.stuartsierra.component :as component]
   [azondi.system :refer (new-system config configurable-system-map new-dependency-map)]
   [azondi.seed :refer (new-database-seed)]
))

(defn new-dev-system-minus-database
  "Create a development system without a database"
  []
  (component/system-using
             (dissoc (configurable-system-map (config)) :database)
             (new-dependency-map)))

(defn new-dev-system-with-database
  "Create a development system"
  []
  (component/system-using
             (assoc (configurable-system-map (config)) :database-seed (new-database-seed))
             (merge (new-dependency-map) {:database-seed [:database]})))

(defn new-dev-system []
  (new-dev-system-minus-database))
