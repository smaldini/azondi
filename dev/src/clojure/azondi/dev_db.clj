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
  (create-user! [this name user email password]
    (dosync (alter (-> this :database :users) assoc user {:user user :name name :email email :password password})))

  (get-users [this]
    @(-> this :database :users))

  (get-user [this user]
    (-> this :database :users deref (get user)))

  (delete-user! [this user]
    (dosync (alter (-> this :database :users) update-in [:users] dissoc user)))

  (create-device! [this user password]
    (dosync
     (let [client-id (str (alter (-> this :database :last-client-id) inc))
           device (merge {} {:client-id client-id :user user :password password})]
       (alter (-> this :database :devices) assoc client-id device)
       (dissoc device :user))))

  (get-device [this client-id]
    (dissoc (-> this :database :devices deref (get client-id)) :password))

  (delete-device! [this client-id]
    (dosync
     (alter (-> this :database :devices) dissoc client-id)))

  (devices-by-owner [this user]
    (sort-by :client-id (filter (comp (partial = user) :user) (vals @(-> this :database :devices)))))

  (patch-device! [this client-id data]
    (dosync
     (alter (-> this :database :devices) update-in [client-id] merge data))
    )

  (set-device-password! [this client-id p]
    (dosync
     (alter (-> this :database :devices) update-in [client-id] assoc :password p)))

  (allowed-device? [this client-id user p]
    (= (select-keys
        (-> this :database :devices deref (get client-id))
        [:user :password])
       {:user user :password p}))

  (topics-by-owner [this user]
    (filter (comp (partial = user) :owner) (vals @(-> this :database :topics))))

  (create-topic! [this topic]
    (dosync
     (alter (-> this :database :topics) assoc (:topic topic) topic)))

  (get-topic [this topic]
    (-> this :database :topics deref (get topic)))

  (delete-topic! [this topic]
    (dosync
     (alter (-> this :database :topics) dissoc topic)))

  (patch-topic! [this topic data]
    (dosync
     (alter (-> this :database :topics) update-in [topic] merge data))))

(defn new-inmemory-datastore []
  (->InmemoryDatastore))
