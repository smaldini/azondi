(ns azondi.postgres
  "PostgreSQL connectivity and schema management"
  (:require [clojure.java.jdbc :as j]
            [schema.core :as s]
            [com.stuartsierra.component :as component]
            [clojure.java.jdbc :as j]
            [azondi.db :refer (Datastore)]
            [azondi.passwords :as sc]))

(defn users-query [this]
  (let [conn (get-in this [:connection])]
    (j/query conn ["SELECT * from users;"])))

(defn user-query
  [this value]
  (let [conn (get-in this [:connection])]
    (j/query conn [(format "SELECT * FROM users WHERE id = '%s' ;" value)])))

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
  (get-users [this]
    (users-query this))

  (get-user [this user]
    ;; assumes that id is being sent
    (first (user-query this user)))

  (create-user! [this user name email password]
    (let [p (sc/encrypt password)
        conn (get-in this [:connection])
        role "user"]
      (j/insert! conn :users {:id user :name name :email email :password_hash p :role role})))

  (devices-by-owner [this user]
    (j/query (get-in this [:connection]) [(format "SELECT * from devices WHERE owner = '%s';" user)]))

  #_(create-device! [this device]
    (let [p (sc/encrypt (:password device))
          d (-> device
                (assoc :device_password_hash p)
                (dissoc :password))]
      (j/insert! (get-in this [:connection]) :devices d)))

  (get-device [this client-id]
    (first (j/query (get-in this [:connection]) [(format "SELECT * from devices where client_id = '%s' ;" client-id)])))

  (delete-device! [this client-id]
    (j/delete! (get-in this [:connection]) :devices [(format  "client_id = '%s'" client-id)])))

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
