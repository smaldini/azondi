(ns azondi.transports.mqtt.publishing-test
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
;; Publishing
;;

(deftest test-publishing-empty-messages-to-existing-public-topic
  (let [c  (mh/connect "tcp://127.0.0.1:1883" "1" {:username "yods"
                                                   :password "device-1-pwd"})]
    (is (mh/connected? c))
    (dotimes [i 1000]
      (mh/publish c "/users/yods/pm10-1" "" 0))
    (mh/disconnect-and-close c)))
