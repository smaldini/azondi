(ns azondi.api.api-messages-test
  (:require
   [clojure.test :refer :all]
   [clojure.string :refer (capitalize)]
   [com.stuartsierra.component :as component]
   [azondi.dev-db :refer (new-inmemory-message-store)]
   [azondi.seed :refer (new-direct-db-seed-data)]
   [azondi.system :refer (config)]
   [azondi.http :refer (request)]
   [clojure.pprint :refer (pprint)]
   [clj-time.core :as tc]
   [clj-time.coerce :as tcc]
   [azondi.api.api-test :refer (new-api-system with-system *system* make-uri)]
   [schema.core :as s]
   [clojure.data.json :as json]))

(defn new-api-messages-system []
  (assoc (new-api-system) :direct-db-seed (new-direct-db-seed-data)
         :cassandra (new-inmemory-message-store)))

(defn system-fixture [f]
  (with-system (new-api-messages-system)
    (s/with-fn-validation
      (f))))

(use-fixtures :each system-fixture)


(defn create-uri-with-dates
  ([key-route api-key start-date end-date ]
     (create-uri-with-dates key-route api-key start-date end-date nil nil))
  ([key-route api-key start-date end-date entity-k entity-v ]
     (let [res (format  "%s?start-date=%s&end-date=%s"
                     (make-uri key-route :user "juan")
                     start-date end-date)]
       (if (and entity-k entity-v)
         (format "%s&%s=%s" res entity-k entity-v)
         res))))

(defn create-uri-device-topic-with-dates [ api-key start-date end-date]
  (format  "%s?start-date=%s&end-date=%s"
           (make-uri :azondi.api/messages-by-owner :user "juan")
           start-date end-date))



(defn date-test-fail [description route-key entity date-start date-end & contains]
  (testing
    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri-with-dates  (if-let [[k v] entity]
                            (create-uri-with-dates route-key api-key date-start date-end k v)
                            (create-uri-with-dates route-key api-key date-start date-end))
          response (request :get uri-with-dates :api-key api-key :expected 400)
          body  (json/read-str (:body response) :key-fn keyword)]
      (is (= 400 (:status response)))
      (doseq [c contains]
        (is (true? (.contains (:error body ) c)))))))


(defn test-entity-value-and-parameter [description key-route entity-str]
  (testing description
    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri    (format  "%s?not-recognized-key=%s"
                                     (make-uri key-route :user "juan")
                                     "any-value")
         response (request :get uri :api-key api-key :expected 400)
         body (json/read-str (:body response) :key-fn keyword)]
      (is (= 400 (:status response)))
      (is (= (format "You need to provide a %s" entity-str) (:error body))))


    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri    (format  "%s?%s=%s"
                          (make-uri key-route :user "juan")
                          entity-str
                          "")
         response (request :get uri :api-key api-key :expected 400)
         body (json/read-str (:body response) :key-fn keyword)]
      (is (= 400 (:status response)))
      (is (= (format "You need to provide a %s" entity-str) (:error body))))))

(defn test-entity-doesnt-exist [description key-route entity-str ]
  (testing description
    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri    (format  "%s?%s=%s"
                          (make-uri key-route :user "juan")
                          entity-str
                          "nonexistent-value")
          response (request :get uri :api-key api-key :expected 404)
          body (json/read-str (:body response) :key-fn keyword)]
      (is (= 404 (:status response)))
      (is (true? (.contains (:error body)
                            (format "%s not found: %s"
                                    (capitalize entity-str) "nonexistent-value")))))))

(defn authorization-test-fail
  ([key-route]
     (authorization-test-fail key-route nil))
  ([key-route query-string]
     (let [api-key   "invalid"
           uri  (let [uri (make-uri key-route :user "juan")]
                  (if query-string
                    (str uri "?" query-string)
                    uri))
           response (request :get uri :api-key api-key :expected 401)]
       (is (= 401 (:status response))))))


(deftest test-messages
  "checking messages from seed-data"

  (authorization-test-fail :azondi.api/messages-by-owner)
  (authorization-test-fail :azondi.api/messages-by-topic "topic=topic1")
  (authorization-test-fail :azondi.api/messages-by-device "client=device1")

  (testing "messages-by-owner existing user"
    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri (make-uri :azondi.api/messages-by-owner :user "juan")
          response (request :get uri :api-key api-key)]
      (is (= 200 (:status response)))
      (is (= 4 (count (get-in response [:body :messages]))))))

  (testing "messages-by-owner with correct date filter"
    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri-with-dates  (create-uri-with-dates :azondi.api/messages-by-owner api-key "2014-01-15" "2014-01-17")
          response (request :get uri-with-dates :api-key api-key :expected 200)]
     (is (= 200 (:status response)))
     (is (= 3 (count (get-in response [:body :messages]))))))


  (test-entity-value-and-parameter "messages-by-topic with no topic value or parameter topic"
                                   :azondi.api/messages-by-topic "topic")
  (test-entity-value-and-parameter "messages-by-device with no device value or parameter client"
                                   :azondi.api/messages-by-device "client")

  (test-entity-doesnt-exist "messages-by-topic" :azondi.api/messages-by-topic "topic" )
  (test-entity-doesnt-exist "messages-by-device" :azondi.api/messages-by-device "client" )


  (testing "messages by device"
    (let [api-key (:api (.get-api-key (-> *system* :database) "juan"))
          uri-without-dates (format "%s?client=%s"
                                     (make-uri :azondi.api/messages-by-device :user "juan")
                                     "1002")
         response (request :get uri-without-dates :api-key api-key :expected 200)]

     (is (= 2(count (get-in response [:body :messages])))))

    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri-with-dates    (format  "%s?client=%s&start-date=%s&end-date=%s"
                                     (make-uri :azondi.api/messages-by-device :user "juan")
                                     "1002" "2014-01-15" "2014-01-17")
         response (request :get uri-with-dates :api-key api-key :expected 200)]

     (is (= 1(count (get-in response [:body :messages]))))))

  (testing "messages topic public/private"
    (let [api-key   (:api (.get-api-key (-> *system* :database) "yods"))
          uri-with-dates    (format  "%s?topic=%s&start-date=%s&end-date=%s"
                                     (make-uri :azondi.api/messages-by-topic :user "yods")
                                     "/users/juan/test-public"
                                     "2014-01-15" "2014-01-17")
         response (request :get uri-with-dates :api-key api-key :expected 200)]

      (is (= 2 (count (get-in response [:body :messages])))))

    (let [api-key   (:api (.get-api-key (-> *system* :database) "yods"))
          uri-with-dates    (format  "%s?topic=%s&start-date=%s&end-date=%s"
                                     (make-uri :azondi.api/messages-by-topic :user "yods")
                                     "/users/juan/test-private"
                                     "2014-01-15" "2014-01-17")
         response (request :get uri-with-dates :api-key api-key :expected 401)]

      (is (= 401 (:status response)))))



  (testing "messages by topic"
    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri-with-dates    (format  "%s?topic=%s&start-date=%s&end-date=%s"
                                     (make-uri :azondi.api/messages-by-topic :user "juan")
                                     "/users/juan/test-public"
                                     "2014-01-15" "2014-01-17")
         response (request :get uri-with-dates :api-key api-key :expected 200)]

      (is (= 2 (count (get-in response [:body :messages])))))

    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri-with-dates    (format  "%s?topic=%s&start-date=%s&end-date=%s"
                                     (make-uri :azondi.api/messages-by-topic :user "juan")
                                     "/users/juan/test-public"
                                     "2014-01-15" "2014-01-15")
         response (request :get uri-with-dates :api-key api-key :expected 200)]

      (is (= 1 (count (get-in response [:body :messages])))))

    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri-without-dates    (format  "%s?topic=%s"
                                     (make-uri :azondi.api/messages-by-topic :user "juan")
                                     "/users/juan/test-public")
         response (request :get uri-without-dates :api-key api-key :expected 200)]

      (is (= 2 (count (get-in response [:body :messages])))))


    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri-with-dates    (format  "%s?topic=%s&start-date=%s&end-date=%s"
                                     (make-uri :azondi.api/messages-by-topic :user "juan")
                                     "/users/juan/test-private"
                                     "2014-01-15" "2014-01-17")
         response (request :get uri-with-dates :api-key api-key :expected 200)]

      (is (= 1 (count (get-in response [:body :messages])))))


    (let [api-key   (:api (.get-api-key (-> *system* :database) "juan"))
          uri-without-dates    (format  "%s?topic=%s"
                                     (make-uri :azondi.api/messages-by-topic :user "juan")
                                     "/users/juan/test-private")
         response (request :get uri-without-dates :api-key api-key :expected 200)]
     (is (= 2 (count (get-in response [:body :messages])))))
    )


  ;; testing date values and format
  (doseq [[route-key entity]
          [[:azondi.api/messages-by-owner nil]
           [:azondi.api/messages-by-topic ["topic" "topic1"]]
           [:azondi.api/messages-by-device ["client" "client1"]]]]

  (date-test-fail "messages-by-owner with malformed date filter. Invalid number"
                  route-key
                  entity
                  "2014-01-A" "2014-01-17"
                  "The date value can contain only numbers"
                  "start-date value malfomed")

  (date-test-fail "messages-by-owner with malformed date filter. Year invalid"
                  route-key
                  entity
                  "2014-01-15" "1999-01-17"
                  "the year number can't be prior to 2000"
                  "end-date value malfomed")

  (date-test-fail "messages-by-owner with malformed date filter. Month invalid"
                  route-key
                  entity
                  "2014-01-15" "2014-00-17"
                  "the month number has to be within 1 and 12"
                  "end-date value malfomed")))

(comment
  (with-system (new-api-messages-system)

    (.create-topic! (-> *system* :database ) {:topic "mytopic" :owner "juan" :public true})
    (map :device_id (-> *system* :cassandra :database :messages deref))

)




  (with-system (new-api-messages-system)
   (let [api-key   (:api (.get-api-key (-> *system* :database) "yods"))
          uri-with-dates    (format  "%s?topic=%s&start-date=%s&end-date=%s"
                                     (make-uri :azondi.api/messages-by-topic :user "yods")
                                     "/users/juan/test-private"
                                     "2014-01-15" "2014-01-17")
         response (request :get uri-with-dates :api-key api-key :expected 401)]

     response)

   )
)
