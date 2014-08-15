(ns azondi.simulator
  (:require
   [clojure.tools.logging :refer :all]
   [clojurewerkz.machine-head.client :as mh]
   [com.stuartsierra.component :refer (Lifecycle using)]
   [schema.core :as s]
   [azondi.db :refer (create-device! allowed-device?)]
   [plumbing.core :refer (<-)]
   [clojure.core.async :refer (go-loop timeout)]))

(defrecord Simulator [database]
  Lifecycle
  (start [component]
    (println "Starting simulator! TODO Get machine head to start sending messages!")
    (try
      ;; TODO Create a new device with a special client id, username and password (somehow)
      ;; Create a new device, so that we know the client id
      (let [user "malcolmsparks"
            {:keys [client-id password] :as device}
            (create-device! database user "pw123456")]

        (infof "New device created for simulator: %s" device)
        (assert (allowed-device? database client-id user password))

        (let [client (mh/connect "tcp://localhost:1883" client-id
                                 (new org.eclipse.paho.client.mqttv3.persist.MemoryPersistence)
                                 {:username user
                                  :password password})]

          (go-loop []
            (<! (timeout 100))
            (mh/publish client "/users/malcolmsparks/test" (.getBytes "Hello!!!") 0)
            (recur))

          (assoc component :client client))

        component

        )
      (catch Exception e
          (println "Failed to start Simulator component - see log")
          (errorf e "Failed to start Simulator component")
          component
          )
      ))
  (stop [component]
    (when-let [client (:client component)]
      (mh/disconnect client))
    component))

(def new-simulator-schema {})

(defn new-simulator [& {:as opts}]
  (->> opts
       (merge {})
       (s/validate new-simulator-schema)
       map->Simulator
       (<- (using [:database]))))
