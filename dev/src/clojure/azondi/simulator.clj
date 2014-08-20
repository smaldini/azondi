(ns azondi.simulator
  (:require
   [clojure.tools.logging :refer :all]
   [clojurewerkz.machine-head.client :as mh]
   [com.stuartsierra.component :refer (Lifecycle using)]
   [schema.core :as s]
   [azondi.db :refer (create-device! allowed-device?)]
   [plumbing.core :refer (<-)]
   [clojure.core.async :refer (go-loop timeout chan alts! close!)]
   [clostache.parser :as parser]))

(defrecord Simulator [database user devices]
  Lifecycle
  (start [component]

    ;; Create a test device

    (let [shutdown (chan)]

      (let [test-device (create-device! database user "abc123")]
        (infof "mosquitto_sub -h %s -i %s -t /users/%s/test -u %s -P %s"
               "localhost" (:client-id test-device) user user (:password test-device)))

      (try
        ;; Create a new device, so that we know the client id
        (let [{:keys [client-id password] :as device}
              (create-device! database user "pw123456")]

          (infof "New device created for simulator: %s" device)
          (assert (allowed-device? database client-id user password))

          (let [client (mh/connect "tcp://localhost:1883" client-id
                                   (new org.eclipse.paho.client.mqttv3.persist.MemoryPersistence)
                                   {:username user
                                    :password password})]

            (doseq [{:keys [topic period body] :as dev} devices]
              (go-loop [s (case (:type dev)
                            :temperature
                            (let [[low high] (:range dev)]
                              (iterate (fn [x] (+ low (rand-int (- (inc high) low)))) (:start dev)))
                            :greeter (repeat (:greeting dev))
                            (throw (ex-info "Unexpected device type" dev)))]
                (let [[_ ch] (alts! [shutdown (timeout period)])]
                  (when-not (= ch shutdown)
                    (mh/publish client topic
                                (.getBytes (parser/render body {:value (first s)} ))
                                0       ; qos
                                )
                    (recur (rest s))))))

            (assoc component :client client :shutdown shutdown)))

        (catch Exception e
          (println "Failed to start Simulator component - see log")
          (errorf e "Failed to start Simulator component")
          component))))

  (stop [component]
    (when-let [shutdown (:shutdown component)]
      (close! shutdown))
    (when-let [client (:client component)]
      (mh/disconnect client))
    component))

(def new-simulator-schema {:user s/Str
                           :devices [{s/Any s/Any}]})

(defn new-simulator [& {:as opts}]
  (->> opts
       (merge {})
       (s/validate new-simulator-schema)
       map->Simulator
       (<- (using [:database]))))
