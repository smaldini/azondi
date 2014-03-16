(ns azondi.transports.mqtt-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.triennium.mqtt :as tr]
            [clojurewerkz.machine-head.client :as mh]
            [clojurewerkz.machine-head.durability :as md]
            [user :as u]))

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

(def connection-opts {:clean-sesion true
                      :username "michael@example.org"
                      :password "michael-pwd"})

(deftest test-mqtt-transport-start
  (u/go)
  (let [id (mh/generate-id)
        c  (mh/connect "tcp://127.0.0.1:1883" id
                       (md/new-memory-persister)
                       connection-opts)]
    (is (mh/connected? c)))
  (u/stop))
