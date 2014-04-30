(ns azondi.dev-db
  (:require
   [com.stuartsierra.component :as component]
   azondi.db)
  (:import (azondi.db Datastore)))

;; In memory implementation

(def a (ref 0))

(dosync
 (alter a inc))


(defrecord InmemoryDatastore []
  component/Lifecycle
  (start [this]
    (assoc this :database {:last-client-id (ref 1000)
                           :users (ref {})
                           :devices (ref {})
                           :topics (ref {})}))
  (stop [this] this)

  Datastore
  (create-user! [this name user email pw]
    (dosync (alter (-> this :database :users) assoc user {:user user :name name :email email :pw pw})))

  (get-users [this]
    @(-> this :database :users))

  (get-user [this user]
    (-> this :database :users deref (get user)))

  (delete-user! [this user]
    (dosync (alter (-> this :database :users) update-in [:users] dissoc user)))

  (create-device! [this user pw]
    (dosync
     (let [client-id (alter (-> this :database :last-client-id) inc)
           device {:client-id client-id :user user :password pw}]
       (alter (-> this :database :devices) assoc client-id device)
       (dissoc device :user))))

  (get-device [this client-id]
    (-> this :database :devices deref (get client-id)))

  (delete-device! [this client-id]
    (alter (-> this :database :devices) dissoc client-id))

  (devices-by-owner [this user]
    (filter (comp (partial = user) :user) (vals @(-> this :database :devices)))))

(defn new-inmemory-datastore []
  (->InmemoryDatastore))
