(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [clojure.tools.logging :refer :all]
   [com.stuartsierra.component :as component]
   [azondi.system :refer (config configurable-system-map new-dependency-map new-prod-system)]
   [azondi.db :refer (Datastore get-user)]
   [azondi.postgres :refer (new-database)]
   [azondi.passwords :as pwd]
   [azondi.cassandra :as cass]))


(defn new-dev-system
  "Create a development system"
  [& [env]]
  (cond
   (= env "prod") (let [c     (config)
                        s-map (-> (configurable-system-map (config))
                                  (assoc :database (new-database (get c :postgres))
                                         :cassandra (cass/new-database (get c :cassandra))))
                        d-map (new-dependency-map s-map)]
                    (component/system-using s-map d-map))
   :else
   (let [c (config)
         s-map (-> (configurable-system-map (config))
                   (assoc :database (new-database (get c :postgres))
                          :cassandra (cass/new-database (get c :cassandra))))
         d-map (new-dependency-map s-map)]
     (component/system-using s-map d-map))))
