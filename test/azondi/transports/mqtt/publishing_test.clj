(ns azondi.transports.mqtt.publishing-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.machine-head.client :as mh]
            [clojurewerkz.machine-head.durability :as md]
            [azondi.test-helpers :as th])
  (:import [java.util.concurrent CountDownLatch TimeUnit]
           java.util.UUID))

(use-fixtures :once th/maybe-load-schema-fixture)
(use-fixtures :each th/with-system-fixture)

(defn await
  [^CountDownLatch latch]
  (is (.await latch 10 TimeUnit/SECONDS)))

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

(deftest test-publishing-and-consuming-messages-to-existing-public-topic
  (let [c  (mh/connect "tcp://127.0.0.1:1883" "1" {:username "yods"
                                                   :password "device-1-pwd"})
        l  (CountDownLatch. 50)]
    (is (mh/connected? c))
    (mh/subscribe c ["/users/yods/pm10-1"] (fn [^String topic meta ^bytes payload]
                                             (.countDown l))
                  {:qos [0]})
    (dotimes [i 100]
      (mh/publish c "/users/yods/pm10-1" "" 0))
    (await l)
    (mh/disconnect-and-close c)))

(deftest test-publishing-and-consuming-messages-with-multiple-consumers
  (let [c1  (mh/connect "tcp://127.0.0.1:1883" "1" {:username "yods"
                                                    :password "device-1-pwd"})
        c2  (mh/connect "tcp://127.0.0.1:1883" "2" {:username "yods"
                                                    :password "device-2-pwd"})
        l  (CountDownLatch. 50)
        f  (fn [^String topic meta ^bytes payload]
             (.countDown l))]
    (mh/subscribe c1 ["/users/yods/pm10-1"] f {:qos [0]})
    (mh/subscribe c2 ["/users/yods/pm10-1"] f {:qos [0]})
    (dotimes [i 13]
      (mh/publish c1 "/users/yods/pm10-1" "" 0))
    (dotimes [i 13]
      (mh/publish c2 "/users/yods/pm10-1" "" 0))
    (await l)
    (mh/disconnect-and-close c1)
    (mh/disconnect-and-close c2)))
