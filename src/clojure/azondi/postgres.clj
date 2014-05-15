(ns azondi.postgres
  "PostgreSQL connectivity and schema management"
  (:require [clojure.java.jdbc :as j]
            [schema.core :as s]
            [com.stuartsierra.component :as component]
            [clojure.java.jdbc :as j]
            [azondi.db :refer (Datastore)]
            [azondi.passwords :as sc]))

(defn conn [this]
  (get-in this [:connection]))

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
    (let [devices (j/query (conn this) [(format "SELECT * from devices WHERE owner_user_id = '%s';" user)])]
      (map #(assoc % :client-id (:client_id %)) devices)))

  (create-device! [this user pwd data]
    (let [p (sc/encrypt pwd)
          d (-> data
                (assoc :owner_user_id user)
                (assoc :device_password_hash p)
                (dissoc :password))]
      (j/insert! (conn this) :devices d)))

  (get-device [this client-id]
    (let [device
          (first (j/query (conn this) [(format "SELECT * from devices where client_id = '%s' ;" client-id)]))]
      ;;; short term solution for postgres not allowing :client-id but we do 
      (-> (assoc device :client-id (:client_id device))
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
    (j/query (conn this) :topics [(format "Select * from topics where owner_user_id = '%s';" user)]))

  (create-topic! [this topic]
    (j/insert! (conn this) :topics topic))

  (get-topic [this topic-id]
    (first (j/query (conn this) [(format "Select * from topics where topic_id = '%s';" topic-id)])))

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
