(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map)]
   [azondi.authentication :as auth]))

(defn new-dev-system-as-prod
  "Create a development system"
  []
  (component/system-using
             (configurable-system-map (config))
             (new-dependency-map)))

(defn new-dev-system []
  (new-dev-system-as-prod))
