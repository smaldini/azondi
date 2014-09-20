(ns azondi.transports.mqtt.publishing-test
  (:refer-clojure :exclude [await])
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.machine-head.client :as mh]
            [clojurewerkz.machine-head.durability :as md]
            [azondi.joplin-helpers :as jh]
            [azondi.transports.test-helpers :as th])
  (:import [java.util.concurrent CountDownLatch TimeUnit]
           java.util.UUID))

(use-fixtures :once jh/maybe-migrate-fixture)
(use-fixtures :each th/with-system-fixture)

(defn await
  [^CountDownLatch latch]
  (is (.await latch 10 TimeUnit/SECONDS)))

;;
;; Publishing
;;

(let [uri "tcp://127.0.0.1:1883"
      p   (md/new-memory-persister)]
  (deftest ^{:mqtt true} test-publishing-empty-messages-to-existing-public-topic
    (let [c  (mh/connect uri "1" p {:username "yods"
                                    :password "device-1-pwd"})
          t  "/users/yods/pm10-1"]
      (is (mh/connected? c))
      (dotimes [i 1000]
        (mh/publish c t "" 0))
      (mh/disconnect-and-close c)))

  (deftest ^{:mqtt true} test-publishing-and-consuming-messages-to-existing-public-topic
    (let [c  (mh/connect uri "1" p {:username "yods"
                                    :password "device-1-pwd"})
          l  (CountDownLatch. 50)
          t  "/users/yods/pm10-1"]
      (is (mh/connected? c))
      (mh/subscribe c {t 0} (fn [^String topic meta ^bytes payload]
                              (.countDown l)))
      (dotimes [i 100]
        (mh/publish c t "" 0))
      (await l)
      (mh/disconnect-and-close c)))

  (deftest ^{:mqtt true} test-publishing-and-consuming-messages-with-multiple-consumers
    (let [c1  (mh/connect uri "1" p {:username "yods"
                                     :password "device-1-pwd"})
          c2  (mh/connect uri "2" p {:username "yods"
                                     :password "device-2-pwd"})
          l  (CountDownLatch. 50)
          f  (fn [^String topic meta ^bytes payload]
               (.countDown l))
          t  "/users/yods/pm10-1"
          m  {t 0}]
      (mh/subscribe c1 m f)
      (mh/subscribe c2 m f)
      (dotimes [i 13]
        (mh/publish c1 t "" 0))
      (dotimes [i 13]
        (mh/publish c2 t "" 0))
      (await l)
      (mh/disconnect-and-close c1)
      (mh/disconnect-and-close c2))))
