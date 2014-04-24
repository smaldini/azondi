(ns azondi.db
  (:require [com.stuartsierra.component :as component])
)

(defprotocol Datastore
  (get-user [_ user])
  (delete-user! [_ user])
  (create-user! [_ name user email pw])
  (devices-by-owner [_ user])
  (get-device [_ client-id])
  (create-device! [_ user pw])
  (delete-device! [_ client-id]))

;; In memory implementation

(defrecord AtomBackedDatastore []
  component/Lifecycle
  (start [this]
    (assoc this :database (atom {:client-id-counter 0
                                 :users {}
                                 :devices {}
                                 :topics {}})))
  (stop [this] this)

  Datastore
  (get-user [this user]
    (get-in @(:database this) [:users user]))

  (delete-user! [this user]
    (swap! (:database this) update-in [:users] dissoc user))

  (create-user! [this name user email pw]
    (println "INSERT UESR")
    (swap! (:database this) assoc-in [:users user] {:user user :name name :email email :pw pw}))

  (devices-by-owner [this user]
    (filter (comp (partial = user) :user) (vals (:devices @(:database this))))
    )

  (get-device [this client-id]
    (get-in @(:database this) [:devices] client-id))

  (create-device! [this user pw]
    (swap! (:database this)
           (fn [{cnt :client-id-counter :as s}]
             (println "cnt is" cnt)
             (println "s is" s)
             (let [id (inc cnt)]
               (-> s
                   (assoc-in [:devices id]
                             {:client-id id :user user :password pw})
                   (assoc-in [:client-id-counter] id))))))

  (delete-device! [this client-id]
    (swap! (:database this) update-in [:devices] dissoc client-id)))

(defn new-atom-backed-datastore []
  (->AtomBackedDatastore))
