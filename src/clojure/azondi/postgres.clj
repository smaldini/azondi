(ns azondi.postgres
  "PostgreSQL connectivity and schema management"
  (:require [clojure.java.jdbc :as j]
            [schema.core :as s]
            [com.stuartsierra.component :as component]
            [clojure.java.jdbc :as j]
            [azondi.db :refer (Datastore)]
            [azondi.passwords :as sc]
            [azondi.helpers :refer (process-maps)]
            [camel-snake-kebab :as csk]))

(defn conn [this]
  (get-in this [:connection]))

(defn clj->psql [mp]
  (process-maps mp csk/->snake_case))

(defn psql->clj [mp]
  (process-maps mp csk/->kebab-case))

(defrecord Database [host port dbname user password]
  component/Lifecycle
  (start [this]
    (assoc this :connection
           {:subprotocol "postgresql"
            :classname "org.postgresql.Driver"
            :subname (format "//%s:%d/%s" host port dbname)
            :user user
            :password password}))
  (stop [this] this)
  Datastore

 
  (create-user! [this name user email password]
    (let [p (sc/encrypt password)
          role "user"]
      (j/insert! (conn this) :users {:id user :name name :email email :password_hash p :role role})))

  (get-users [this]
    (j/query (conn this) ["Select * from users;"]))

  (get-user [this user]
    (first (j/query (conn this) [(format "Select * from users where id = '%s'" user)])))

  (delete-user! [this user]
    (j/delete! (conn this) :users [(format "id = '%s'" user)]))

  (devices-by-owner [this user]
    (psql->clj (j/query (conn this) [(format "SELECT * from devices WHERE owner_user_id = '%s';" user)])))

  (create-device! [this user pwd]
    (let [data {:owner_user_id user :device_password_hash (sc/encrypt pwd)}]
      (psql->clj (-> (first (j/insert! (conn this) :devices data))
                     (dissoc :device_password_hash)
                     (dissoc :created_on)))))

  (get-device [this client-id]
    (psql->clj (-> (first (j/query (conn this) [(format "SELECT * from devices where client_id = '%s' ;" client-id)]))
                   (dissoc :device_password_hash))))

  (delete-device! [this client-id]
    (j/delete! (conn this) :devices [(format  "client_id = '%s'" client-id)]))

  (set-device-password! [this client-id p]
    (let [pwd-hash (sc/encrypt p)]
      (j/update! (conn this) :devices {:device_password_hash pwd-hash} [(format "client_id = '%s'" client-id)])))

  (allowed-device? [this client-id user p]
    (let [device (first (j/query (conn this) [(format "Select * from devices where client_id = '%s';" client-id)]))]
      (and (= (:owner_user_id device) user)
           (sc/verify p (:password device)))))

  (patch-device! [this client-id data]
    (j/update! (conn this) :devices data [(format "client_id = '%s'" client-id)]))

  (topics-by-owner [this user]
    (clj->psql (-> (j/query (conn this) [(format "Select * from topics where owner_user_id = '%s';" user)])
                   (dissoc :created_on))))

  (create-topic! [this topic]
    (let [t (clj->psql (merge topic {:public true}))]
      (psql->clj (-> (j/insert! (conn this) :topics t)
                     (dissoc :created_on)))))

  (get-topic [this topic-id]
    (psql->clj
     (-> (first (j/query (conn this) [(format "Select * from topics where topic_id = '%s';" topic-id)]))
         (dissoc :created_on))))

  (delete-topic! [this topic-id]
    (j/delete! (conn this) :topics [(format  "topic_id = '%s'" topic-id)]))

  (patch-topic! [this topic-id data]
    (j/update! (conn this) :topics data [(format "topic_id = '%s'") topic-id]))
  ) 

(defn new-database
  [opts]
  (->> opts
       (merge {:host "localhost"
               :port 5432})
       (s/validate {:host s/Str
                    :port s/Int
                    :dbname s/Str
                    :user s/Str
                    :password s/Str})
       map->Database))
