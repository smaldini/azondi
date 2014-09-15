(ns azondi.seeds.cassandra
  (:require [clojurewerkz.cassaforte.cql    :as cql]
            [clojurewerkz.cassaforte.query  :refer :all]
            [joplin.cassandra.database :refer [get-connection]]))

;;
;; API
;;

(defn run
  [target & args]
  (let [conn (get-connection (-> target :db :hosts)
                             (-> target :db :keyspace))]
    ))
