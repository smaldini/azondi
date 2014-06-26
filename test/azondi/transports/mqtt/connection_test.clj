(ns azondi.transports.mqtt.connection-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.machine-head.client :as mh]
            [clojurewerkz.machine-head.durability :as md]
            [azondi.test-helpers :as th])
  (:import java.util.concurrent.atomic.AtomicInteger
           java.util.UUID))

(use-fixtures :once th/maybe-load-schema-fixture)
(use-fixtures :each th/with-system-fixture)

;;
;; Connection
;;

(deftest test-connect-disconnect-with-valid-credentials
  (let [c  (mh/connect "tcp://127.0.0.1:1883" "1" {:username "yods"
                                                   :password "device-1-pwd"})]
    (is (mh/connected? c))
    (mh/disconnect-and-close c)))

(deftest test-connect-disconnect-with-invalid-credentials
  (is (thrown? org.eclipse.paho.client.mqttv3.MqttSecurityException
               (mh/connect "tcp://127.0.0.1:1883" "1" {:username "yods"
                                                       :password (str (UUID/randomUUID))}))))
