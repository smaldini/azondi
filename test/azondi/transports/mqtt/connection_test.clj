(ns azondi.transports.mqtt.connection-test
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
;; Connection
;;

(deftest test-connect-disconnect
  (comment "TODO: start the system")
  (comment "TODO: stop the system"))
