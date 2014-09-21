(ns azondi.tests.joplin-helpers
  (:require [joplin.core :as jp]
            joplin.jdbc.database
            joplin.cassandra.database))


;;
;; Implementation
;;

(def test-postgresql-db   "opensensors_test")
(def test-postgresql-user "azondi")

(def migrated? (atom false))

(def pg-target
  {:db {:type :jdbc
        :url  (format "jdbc:postgresql://127.0.0.1/%s?user=%s&password=opendata"
                      test-postgresql-db
                      test-postgresql-user)}
   :migrator "joplin/migrators/sql"
   :seed     "azondi.seeds.sql/run"})

(def c*-target
  {:db {:type :cass
        :hosts ["127.0.0.1"] :keyspace "opensensors_test"}
   :migrator "joplin/migrators/cassandra"
   :seed     "azondi.seeds.cassandra/run"})

(defn migrate!
  []
  (jp/reset-db pg-target)
  (jp/reset-db c*-target))

;;
;; API
;;

(defn maybe-migrate
  []
  (when-not @migrated?
    (do
      (migrate!)
      (reset! migrated? true))))

(defn maybe-migrate-fixture
  [f]
  (maybe-migrate)
  (f))
