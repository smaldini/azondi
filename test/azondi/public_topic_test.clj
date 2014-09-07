(ns azondi.public-topic-test
  (:require [clojure.test :refer :all]
            [azondi.test-helpers :as thelp]
            [azondi.http :refer (request)]
            [com.stuartsierra.component :as component :refer (system-map system-using)]
            ))


(use-fixtures :once thelp/maybe-load-schema-fixture)
(use-fixtures :each (thelp/with-system-fixture thelp/new-api-system))

(deftest test-welcome
  (testing "welcome path"
    (is (= (thelp/make-uri :azondi.api/welcome)
           (format "http://localhost:%d/api/1.0" 8020)))))

(deftest public-topics
  (testing "public topics"
    (let [public-topics-uri (thelp/make-uri :azondi.api/public-topics :user "yods")
          response (request :get public-topics-uri)]
      (is (= public-topics-uri
             (format "http://localhost:%d/api/1.0/users/yods/public-topics" 8020)))
      (is (= 200 (:status response)))
      (is (= 3 (count (-> response :body :topics)))))))

(deftest public-topic
  (testing "public topic"
    (let [public-topic-uri (thelp/make-uri :azondi/public-topics :user "yods" :topic-name "/users/yods/foo")
          response (request :get public-topic-uri)]
      (println public-topic-uri)
      (is (= public-topic-uri
             (format "http://localhost:%d/api/1.0/users/yods/public-topics/users/yods/e12/temp1" 8020)))
      ;;(is (= 200 (:status response)))
      ;;(println response)
      )))
