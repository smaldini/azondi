(ns azondi.transports.mqtt.unit-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.machine-head.client :as mh]
            [clojurewerkz.machine-head.durability :as md])
  (:import java.util.concurrent.atomic.AtomicInteger
           java.util.UUID))

(def connection-opts {:clean-sesion true
                      :client-id "TODO"
                      :username  "TODO"
                      :password  "TODO"})

#_ (deftest test-connect-disconnect
  (comment "TODO: start the system")
  (let [id (mh/generate-id)
        c  (mh/connect "tcp://127.0.0.1:1883" id
                       (md/new-memory-persister)
                       connection-opts)]
    (is (mh/connected? c))
    (mh/disconnect-and-close c))
  (comment "TODO: stop the system"))

#_ (deftest test-connection-with-invalid-credentials
  (comment "TODO: start the system")
  (let [id (mh/generate-id)]
    (is (thrown? org.eclipse.paho.client.mqttv3.MqttSecurityException
                 (mh/connect "tcp://127.0.0.1:1883" id
                             (md/new-memory-persister)
                             {:clear-session true
                              :username "d0es-n07 exist"
                              :password (str (UUID/randomUUID))}))))
       (comment "TODO: stop the system"))
