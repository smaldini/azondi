(ns azondi.transports.mqtt-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.triennium.mqtt :as tr]))

(deftest test-records-subscribers
  (let [ctx :ctx ;; stub
        xs  [["a/topic" 0] ["b/topic" 0]]
        m   (atom (tr/make-trie))]
    (swap! m mqtt/record-subscribers ctx xs)
    (is (= {"b" {"topic" {:values #{#azondi.transports.mqtt.Subscriber{:ctx :ctx
                                                                       :topic "b/topic"
                                                                       :qos 0}}}}
            "a" {"topic" {:values #{#azondi.transports.mqtt.Subscriber{:ctx :ctx
                                                                       :topic "a/topic"
                                                                       :qos 0}}}}}
           @m))))
