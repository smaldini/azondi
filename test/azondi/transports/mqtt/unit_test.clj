(ns azondi.transports.mqtt.unit-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.triennium.mqtt :as tr]))

(deftest ^{:mqtt true} test-record-subscribers
  (let [ctx :ctx ;; stub
        xs  [["a/topic" 0] ["b/topic" 0]]
        m   (ref (tr/make-trie))]
    (dosync (alter m mqtt/record-subscribers ctx xs))
    (let [va (first (get-in @m ["a" "topic" :values]))
          vb (last  (get-in @m ["b" "topic" :values]))]
      (are [k v] (is (= v (k va)))
           :ctx   :ctx
           :topic "a/topic"
           :qos   0)
      (are [k v] (is (= v (k vb)))
           :ctx   :ctx
           :topic "b/topic"
           :qos   0))))

(deftest ^{:mqtt true} test-unrecord-subscribers
  (let [ctx :ctx ;; stub
        xs  [["a/topic" 0] ["b/topic" 0]]
        m   (ref (tr/make-trie))]
    (dosync
     (alter m mqtt/record-subscribers ctx xs)
     (alter m mqtt/unrecord-subscribers ctx ["b/topic"]))
    (let [v (first (get-in @m ["a" "topic" :values]))]
      (are [k v'] (is (= v' (k v)))
           :ctx   :ctx
           :topic "a/topic"
           :qos   0))))
