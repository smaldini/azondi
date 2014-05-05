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

  (create-device! [this user pw data]
    (dosync
     (let [client-id (str (alter (-> this :database :last-client-id) inc))
           device (merge data {:client-id client-id :user user :password pw})]
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

  (topics-by-owner [this user]
    (filter (comp (partial = user) :owner) (vals @(-> this :database :topics))))

 ;; {:topics {:name name :owner user :unit measure :topic_id topic_id}}
  (create-topic! [this topic]
    (dosync
     (alter (-> this :database :topics) assoc (:topic_id topic) topic)))

  (get-topic [this topic-id]
    (-> this :database :topics deref (get topic-id)))

  (delete-topic! [this topic-id]
     (dosync
      (alter (-> this :database :topic-id) dissoc topic-id)))


  )

(defn new-inmemory-datastore []
  (->InmemoryDatastore))
