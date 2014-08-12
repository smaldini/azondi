(ns azondi.simulator
  (:require
   [clojure.tools.logging :refer :all]
   [clojurewerkz.machine-head.client :as mh]
   [com.stuartsierra.component :refer (Lifecycle)]
   [schema.core :as s]))

(defrecord Simulator []
  Lifecycle
  (start [component]
    (println "Starting simulator! TODO Get machine head to start sending messages!")
    (try
      ;; TODO Create a new device with a special client id, username and password (somehow)
      (let [client (mh/connect "tcp://localhost:1883" "7"
                                {:username "malcolmsparks"
                                 :password "99QzW0hK"})]
        (assoc component :client client))
      (mh/publish)
      (catch Exception e
        (println "Failed to start Simulator component - see log")
        (errorf e "Failed to start Simulator component")
        component
        )))
  (stop [component]
    (when-let [client (:client component)]
      (mh/disconnect client))
    component))

(def new-simulator-schema {})

(defn new-simulator [& {:as opts}]
  (->> opts
       (merge {})
       (s/validate new-simulator-schema)
       map->Simulator))
