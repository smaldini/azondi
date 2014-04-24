(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map)]
   [azondi.authentication :as auth]
   [azondi.api-tests :refer (new-api-tests)]))

(defn new-dev-system
  "Create a development system"
  []
  (component/system-using
   (->
    (configurable-system-map (config))
    (assoc :api-tests (azondi.api-tests/new-api-tests)))
   (new-dependency-map)))
