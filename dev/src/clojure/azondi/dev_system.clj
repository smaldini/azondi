(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [clojure.tools.logging :refer :all]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map new-prod-system)]
   [azondi.api-tests :refer (new-api-tests)]
   [azondi.db :refer (Datastore get-user)]
   [azondi.dev-db :refer (new-inmemory-datastore)]
   [azondi.seed :refer (new-seed-data)]
   [azondi.postgres :refer (new-database)]
   [azondi.passwords :as pwd]
   [azondi.data.cassandra :as cass]))


(defn new-dev-system
  "Create a development system"
  [& [env]]
  (cond
   (= env "prod") (let [s-map
         (->
          (configurable-system-map (config))
          (assoc :api-tests (azondi.api-tests/new-api-tests)
                ;; :seed (new-seed-data)

                 :database (new-database (get (config) :postgres))
                 :cassandra (cass/new-database (get (config) :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))))
                       d-map (new-dependency-map s-map)]
                   (component/system-using s-map d-map))
   :else
   (let [s-map
         (->
          (configurable-system-map (config))
          (assoc :api-tests (azondi.api-tests/new-api-tests)
                 :seed (new-seed-data)
                 :database (new-inmemory-datastore)))
         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))))
