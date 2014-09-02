(ns azondi.dev-db
  (:require
   [com.stuartsierra.component :as component]
   [clojure.tools.logging :refer :all]
   [clj-time.core   :as tc]
   [clj-time.coerce :as tcc]
   [clj-time.format :as tf]
   [azondi.cassandra :refer (date-and-hour-formatter)]
   azondi.db)
  (:import (azondi.db.protocol DataStore MessageStore)))

;; In memory implementation

(defrecord InmemoryDataStore []
  component/Lifecycle
  (start [this]
    (assoc this :database {:last-client-id (ref 1000)
                           :users (ref {})
                           :devices (ref {})
                           :topics (ref {})
                           :apikeys (ref {})}))
  (stop [this] this)

  DataStore
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
    (-> this :database :devices deref (get client-id) (dissoc :password)))

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

  (topic-of-owner [this user topic]
    (let [rows (vals @(-> this :database :topics))]
      (some (fn [m]
              (when (and (= (:owner m) user)
                         (= (:topic m) topic))
                m))
            rows)))

  (topics-by-owner [this user]
    (filter (comp (partial = user) :owner) (vals @(-> this :database :topics))))

  (create-topic! [this topic]
    (dosync
     (alter (-> this :database :topics) assoc (:topic topic) topic)))

  (maybe-create-topic! [this topic]
    (dosync
     (alter (-> this :database :topics) (fn [m k v]
                                          (when (nil? (get m k))
                                            (assoc m k v)))
            (:topic topic) topic)))

  (get-topic [this topic]
    (-> this :database :topics deref (get topic)))

  (delete-topic! [this topic]
    (dosync
     (alter (-> this :database :topics) dissoc topic)))

  (patch-topic! [this topic data]
    (dosync
     (alter (-> this :database :topics) update-in [topic] merge data)))

  ;;subscriptions
  (subscriptions-by-owner [this user] nil)
  (create-subscription [this user topic] nil)
  (unsubscribe [this user topic] nil)

  ;; API keys
  (create-api-key [this user]
    (let [apikey (str (java.util.UUID/randomUUID))]
      (dosync
       (alter (-> this :database :apikeys) assoc user {:id user
                                                       :created_on (java.util.Date.)
                                                       :api apikey}))))

  (get-api-key [this user]
    (-> this :database :apikeys deref (get user)))

  (delete-api-key [this user]
    (dosync
       (alter (-> this :database :apikeys) dissoc user)))

  (find-user-by-api-key [this api-key]
    (infof "Finding user by api-key: %s" api-key)
    (ffirst (filter #(= api-key (:api (second %))) (-> this :database :apikeys deref)))
    )

  )

(defprotocol MessagesStoreTestUtils
  (archive-message-with-date! [this now data]))


(defn new-inmemory-datastore []
  (->InmemoryDataStore))


(defn archive-message-fn! [this now data]
  (let [data (merge data
                      {:created_at (.toDate now)
                       :date_and_hour (tf/unparse date-and-hour-formatter now)})]
      (dosync (alter (-> this :database :messages) conj  data))))

(defn convert-to-date [ints]
   ints)

(defrecord InMemoryMessageStore []
  component/Lifecycle
  (start [this]
    (assoc this :database {:messages (ref [])}))
  (stop [this] this)

  MessageStore
  (messages-by-owner [this owner]
    (filter #(= (:owner %) owner) (-> this :database :messages deref)))
  (messages-by-device [this device-id]
    (filter #(= (:device_id %) device-id) (-> this :database :messages deref)))
  (messages-by-topic [this topic]
    (filter #(= (:topic %) topic) (-> this :database :messages deref)))
  (messages-by-date [this start-date end-date]
    (throw (Exception. "unimplemented")))

  (messages-by-owner-and-date [this owner start-date end-date]
    (filter #(and (tc/within?  start-date end-date
                               (tcc/from-date (:created_at %))) (= (:owner %) owner)) (-> this :database :messages deref))

    )
  (messages-by-topic-and-date [this topic start-date end-date]
    (filter #(and (tc/within?  start-date end-date
                               (tcc/from-date (:created_at %)))
                  (= (:topic %) topic)) (-> this :database :messages deref)))
  (messages-by-device-and-date [this device start-date end-date]
    (filter #(and (tc/within?  start-date end-date
                               (tcc/from-date (:created_at %)))
                  (= (:device_id %) device)) (-> this :database :messages deref)))

  (archive-message! [this data]
      (archive-message-fn! this (tc/now) data))
  MessagesStoreTestUtils
  (archive-message-with-date! [this now data]
    (archive-message-fn! this now data))

  )



(defn new-inmemory-message-store []
  (->InMemoryMessageStore))
