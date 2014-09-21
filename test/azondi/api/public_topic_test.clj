(ns azondi.api.public-topic-test
  (:require [clojure.test :refer :all]
            [com.stuartsierra.component :as component :refer (system-map system-using)]
            [azondi.test-helpers :as th]
            [azondi.helpers.http :refer (request)]
            [azondi.joplin-helpers :as jh]))


(use-fixtures :once jh/maybe-migrate-fixture)
(use-fixtures :each (th/with-system-fixture th/new-api-system))

(deftest ^{:api true} test-welcome
  (testing "welcome path"
    (is (= (th/make-uri :azondi.api/welcome)
           (format "http://localhost:%d/api/1.0" 8020)))))

(deftest ^{:api true} public-topics
  (testing "public topics"
    (let [public-topics-uri (th/make-uri :azondi.api/public-topics :user "yods")
          response (request :get public-topics-uri)]
      (is (= public-topics-uri
             (format "http://localhost:%d/api/1.0/users/yods/public-topics" 8020)))
      (is (= 200 (:status response)))
      (is (= 4 (count (-> response :body :topics)))))))

(deftest ^{:api true} public-topic
  (testing "public topic"
    (let [public-topic-uri (th/make-uri :azondi/public-topics :user "yods" :topic-name "/users/yods/foo")
          response (request :get public-topic-uri)]
      (println public-topic-uri)
      (is (= public-topic-uri
             (format "http://localhost:%d/api/1.0/users/yods/public-topics/users/yods/e12/temp1" 8020)))
      ;;(is (= 200 (:status response)))
      ;;(println response)
      )))
