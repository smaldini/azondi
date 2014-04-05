(ns azondi.dev-system
  (:require
   [com.stuartsierra.component :as component]
   [azondi.system :refer (new-system config configurable-system-map new-dependency-map)]
   [azondi.seed :refer (new-database-seed)]
))

(defn new-dev-system []
  "Create a development system"
  ;; Right now it's the same as the production system
  (component/system-using
             (assoc (configurable-system-map (config)) :database-seed (new-database-seed))
             (merge (new-dependency-map) {:database-seed [:database]})))
