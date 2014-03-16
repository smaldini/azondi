(ns azondi.transports.mqtt-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.triennium.mqtt :as tr]
            [clojurewerkz.machine-head.client :as mh]
            [clojurewerkz.machine-head.durability :as md]
            [user :as u])
  (:import java.util.concurrent.atomic.AtomicInteger
           java.util.UUID))

(deftest test-record-subscribers
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

(deftest test-unrecord-subscribers
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

(def connection-opts {:clean-sesion true
                      :username "michael@example.org"
                      :password "michael-pwd"})

(deftest test-connect-disconnect
  (u/go)
  (let [id (mh/generate-id)
        c  (mh/connect "tcp://127.0.0.1:1883" id
                       (md/new-memory-persister)
                       connection-opts)]
    (is (mh/connected? c))
    (mh/disconnect-and-close c))
  (u/stop))

(deftest test-connection-with-invalid-credentials
  (u/go)
  (let [id (mh/generate-id)]
    (is (thrown? org.eclipse.paho.client.mqttv3.MqttSecurityException
                 (mh/connect "tcp://127.0.0.1:1883" id
                             (md/new-memory-persister)
                             {:clear-session true
                              :username "d0es-n07 exist"
                              :password (str (UUID/randomUUID))}))))
  (u/stop))

(deftest test-basic-topic-subscription
  (u/go)
  (let [id (mh/generate-id)
        c  (mh/connect "tcp://127.0.0.1:1883" id
                       (md/new-memory-persister)
                       connection-opts)
        i  (AtomicInteger.)]
    (is (mh/connected? c))
    ;; (mh/subscribe c ["a/topic"] (fn [^String topic meta ^bytes payload]
    ;;                                (.incrementAndGet i)))
    ;; (dotimes [_ 100]
    ;;   (mh/publish c "a/topic" "{}"))
    ;; (Thread/sleep 100)
    ;; (is (= 100 (.get i)))
    (mh/disconnect-and-close c))
  (u/stop))
