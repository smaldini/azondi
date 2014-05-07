(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map)]
   [azondi.api-tests :refer (new-api-tests)]
   [azondi.dev-db :refer (new-inmemory-datastore)]))

(defn new-dev-system
  "Create a development system"
  []
  (let [s-map (->
               (configurable-system-map (config))
               (assoc :api-tests (azondi.api-tests/new-api-tests)
                      :database (new-inmemory-datastore)))
        d-map (new-dependency-map s-map)]
    (component/system-using s-map d-map)))
