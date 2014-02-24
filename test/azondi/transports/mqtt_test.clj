(ns azondi.transports.mqtt-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.triennium.mqtt :as tr]))

(deftest test-record-subscribers
  (let [ctx :ctx ;; stub
        xs  [["a/topic" 0] ["b/topic" 0]]
        m   (ref (tr/make-trie))]
    (dosync (alter m mqtt/record-subscribers ctx xs))
    (is (= {"b" {"topic" {:values #{#azondi.transports.mqtt.Subscriber{:ctx :ctx
                                                                       :topic "b/topic"
                                                                       :qos 0}}}}
            "a" {"topic" {:values #{#azondi.transports.mqtt.Subscriber{:ctx :ctx
                                                                       :topic "a/topic"
                                                                       :qos 0}}}}}
           @m))))

(deftest test-unrecord-subscribers
  (let [ctx :ctx ;; stub
        xs  [["a/topic" 0] ["b/topic" 0]]
        m   (ref (tr/make-trie))]
    (dosync
     (alter m mqtt/record-subscribers ctx xs)
     (alter m mqtt/unrecord-subscribers ctx ["b/topic"]))
    (is (= {"a" {"topic" {:values #{#azondi.transports.mqtt.Subscriber{:ctx :ctx
                                                                       :topic "a/topic"
                                                                       :qos 0}}}}}
           @m))))
