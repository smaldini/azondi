(ns azondi.postgres
  "Database protocol implementation for PostgreSQL"
  (:require [clojure.java.jdbc :as j]
            [schema.core :as s]
            [com.stuartsierra.component :as component]
            [clojure.java.jdbc :as j]
            [azondi.db :refer (Datastore)]
            [azondi.passwords :as sc]
            [azondi.helpers :refer (process-maps)]
            [camel-snake-kebab :as csk]))

(defn conn [this]
  (get this :connection))

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
    (j/query (conn this) ["SELECT * FROM users;"]))

  (get-user [this user]
    (first (j/query (conn this) ["SELECT * FROM users WHERE id = ?" user])))

  (delete-user! [this user]
    (j/delete! (conn this) :users ["id = ?" user]))

  (devices-by-owner [this user]
    (psql->clj (j/query (conn this) ["SELECT * FROM devices WHERE owner_user_id = ?;" user])))

  (create-device! [this user pwd]
    (let [data {:owner_user_id user :device_password_hash (sc/encrypt pwd)}]
      (psql->clj (-> (first (j/insert! (conn this) :devices data))
                     (dissoc :device_password_hash)
                     (dissoc :created_on)))))

  (get-device [this client-id]
    (psql->clj (-> (first (j/query (conn this) ["SELECT * FROM devices WHERE client_id = ?;" client-id]))
                   (dissoc :device_password_hash))))

  (delete-device! [this client-id]
    (j/delete! (conn this) :devices ["client_id = ?" client-id]))

  (set-device-password! [this client-id p]
    (let [pwd-hash (sc/encrypt p)]
      (j/update! (conn this) :devices {:device_password_hash pwd-hash} ["client_id = ?" client-id])))

  (allowed-device? [this client-id username pwd]
    (let [device (first (j/query (conn this) ["SELECT * FROM devices WHERE client_id = ? AND owner_user_id = ? LIMIT 1;"
                                              (Long/valueOf client-id) username]))]
      (sc/verify pwd (:device_password_hash device))))

  (patch-device! [this client-id data]
    (j/update! (conn this) :devices data ["client_id = ?" client-id]))

  (topics-by-owner [this user]
    (clj->psql (j/query (conn this) ["SELECT * FROM topics WHERE owner = ?;" user])))

  (create-topic! [this topic]
    (let [t (clj->psql (merge topic {:public true}))]
      (psql->clj (-> (j/insert! (conn this) :topics t)
                     first
                     (dissoc :created_on))
                 )))

  (get-topic [this topic-id]
    (psql->clj
     (-> (-> (first (j/query (conn this) ["SELECT * FROM topics WHERE topic = ?;" topic-id]))
             (dissoc :created_on)))))

  (delete-topic! [this topic-id]
    (j/delete! (conn this) :topics ["topic = ?" topic-id]))

  (patch-topic! [this topic-id data]
    (j/update! (conn this) :topics data ["topic = ?" topic-id]))
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
