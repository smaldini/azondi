(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map)]
   [azondi.seed :refer (new-database-seed)]
   [azondi.authentication :as auth]))

(defn new-dev-system-with-database
  "Create a development system"
  []
  (component/system-using
             (assoc (configurable-system-map (config)) :database-seed (new-database-seed))
             (merge (new-dependency-map) {:database-seed [:database]})))

(defn new-dev-system []
  (new-dev-system-with-database))
