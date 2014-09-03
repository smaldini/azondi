(ns azondi.public-topic-test
  (:require [clojure.test :refer :all]
            [azondi.test-helpers :as thelp]
            [com.stuartsierra.component :as component :refer (system-map system-using)]
            ))


(use-fixtures :once thelp/maybe-load-schema-fixture)
(use-fixtures :each (thelp/with-system-fixture thelp/new-api-system))

(deftest test-welcome
  (testing "control"
    (is (= (+ 2 2) 4)))

  (testing "welcome path"
    (is (= (thelp/make-uri :azondi.api/welcome)
           (format "http://localhost:%d/api/1.0" 8020)))))
