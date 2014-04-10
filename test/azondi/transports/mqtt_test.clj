(ns azondi.transports.mqtt-test
  (:require [clojure.test :refer :all]
            [azondi.transports.mqtt :as mqtt]
            [clojurewerkz.triennium.mqtt :as tr]
            [clojurewerkz.machine-head.client :as mh]
            [clojurewerkz.machine-head.durability :as md])
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
                      :client-id "TODO"
                      :username  "TODO"
                      :password  "TODO"})

#_ (deftest test-connect-disconnect
  (comment "TODO: start the system")
  (let [id (mh/generate-id)
        c  (mh/connect "tcp://127.0.0.1:1883" id
                       (md/new-memory-persister)
                       connection-opts)]
    (is (mh/connected? c))
    (mh/disconnect-and-close c))
  (comment "TODO: stop the system"))

#_ (deftest test-connection-with-invalid-credentials
  (comment "TODO: start the system")
  (let [id (mh/generate-id)]
    (is (thrown? org.eclipse.paho.client.mqttv3.MqttSecurityException
                 (mh/connect "tcp://127.0.0.1:1883" id
                             (md/new-memory-persister)
                             {:clear-session true
                              :username "d0es-n07 exist"
                              :password (str (UUID/randomUUID))}))))
       (comment "TODO: stop the system"))
