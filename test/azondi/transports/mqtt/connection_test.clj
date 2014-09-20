(ns azondi.transports.mqtt.connection-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.machine-head.client :as mh]
            [clojurewerkz.machine-head.durability :as md]
            [azondi.joplin-helpers :as jh]
            [azondi.transports.test-helpers :as th])
  (:import java.util.UUID))

(use-fixtures :once jh/maybe-migrate-fixture)
(use-fixtures :each th/with-system-fixture)

;;
;; Connection
;;

(let [uri "tcp://127.0.0.1:1883"
      p   (md/new-memory-persister)]
  (deftest ^{:mqtt true} test-connect-disconnect-with-valid-credentials
    (let [c  (mh/connect uri "1" p {:username "yods"
                                    :password "device-1-pwd"})]
      (is (mh/connected? c))
      (mh/disconnect-and-close c)))

  (deftest ^{:mqtt true} test-connect-with-invalid-credentials
    (is (thrown? org.eclipse.paho.client.mqttv3.MqttSecurityException
                 (mh/connect uri "1" p {:username "yods"
                                        :password (str (UUID/randomUUID))}))))

  (deftest ^{:mqtt true} test-connect-with-valid-credentials-and-duplicate-client-id
    (let [c1  (mh/connect uri "1" p {:username "yods"
                                     :password "device-1-pwd"})
          c2  (mh/connect uri "1" p {:username "yods"
                                     :password "device-1-pwd"})]
      (is (not (mh/connected? c1)))
      (is (mh/connected? c2))
      (mh/disconnect-and-close c2))))
