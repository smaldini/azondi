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
   [azondi.cassandra :as cass]))


(defn new-dev-system
  "Create a development system"
  [& [env]]
  (cond
   (= env "prod") (let [c (config)
                        s-map
         (->
          (configurable-system-map (config))
          (assoc ;;:api-tests (azondi.api-tests/new-api-tests)
                 ;;:seed (new-seed-data)

                 :database (new-database (get c :postgres))

                 :cassandra (cass/new-database (get c :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
                 ))
                       d-map (new-dependency-map s-map)]
                   (component/system-using s-map d-map))
   :else
   (let [c (config)
         s-map
         (->
          (configurable-system-map (config))
          (assoc :seed (new-seed-data)
                 :database (if (System/getenv "USE_POSTGRESQL")
                             (new-database (get c :postgres))
                             (new-inmemory-datastore))
                 :cassandra (cass/new-database (get c :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
                 ))

         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))))
