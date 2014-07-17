(ns azondi.api.api-test
  (:require
   [clojure.test :refer :all]
   [com.stuartsierra.component :as component]
   [modular.http-kit :refer (new-webserver)]
   [modular.ring :refer (new-web-request-handler-head)]
   [modular.bidi :refer (new-router routes uri-context)]
   [bidi.bidi :refer (path-for)]
   [azondi.webapp :refer (new-webapp)]
   [azondi.api :refer (new-api new-user-authorizer new-api-key-authenticator)]
   [cylon.impl.login-form :refer (new-login-form)]
   [cylon.impl.authentication :refer (new-composite-disjunctive-authenticator
                                      new-http-basic-authenticator)]
   [azondi.http :refer (request)]
   [azondi.dev-db :refer (new-inmemory-datastore)]
   [azondi.db :refer (get-user create-api-key get-api-key)]
   [azondi.dev-system :refer (new-dev-user-domain)]
   [azondi.cassandra :as cass]
   [schema.core :as s]
   [azondi.system :refer (config)]))

(def PORT 8099)

(defn new-api-system
  "Define a minimal system which is just enough for the tests in this
  namespace to run"
  []
  (component/system-using
   (component/system-map
    :webserver (new-webserver :port PORT)
    :webrouter (new-router)
    :database (new-inmemory-datastore)
    :cassandra (cass/new-database
                 (get (config) :cassandra {:keyspace "opensensors" :hosts ["127.0.0.1"]}))
    :api (new-api :uri-context "/api/1.0")
    :authorizer (new-user-authorizer)
    :http-authenticator (new-http-basic-authenticator)
    :api-key-authenticator (new-api-key-authenticator)
    :authenticator (new-composite-disjunctive-authenticator
                    :http-authenticator
                    :api-key-authenticator
                    )
    :user-domain (new-dev-user-domain))

   {:webserver {:request-handler :webrouter}
    :webrouter [:api]
    }))

;; The tests use a fixture which establishes a system for each test run.

(def ^:dynamic *system* nil)

(defmacro with-system [system & body]
  `(let [s# (component/start ~system)]
     (try
       (binding [*system* s#] ~@body)
       (finally
         (component/stop s#)))))

(defn system-fixture [f]
  (with-system (new-api-system)
    (s/with-fn-validation
      (f))))

(use-fixtures :each system-fixture)

;;(use-fixtures :each (fn [f] (s/with-fn-validation ())))

;; Construct a URI to hit a request handler target

(s/defn make-uri [target :- s/Keyword & args]
  (format "http://localhost:%d%s%s"
          (-> *system* :webserver :port)
          (uri-context (-> *system* :api))
          (apply path-for (routes (-> *system* :api)) target args)))

(deftest test-welcome
  (testing "control"
    (is (= (+ 2 2) 4)))

  (testing "welcome path"
    (is (= (make-uri :azondi.api/welcome)
           (format "http://localhost:%d/api/1.0" PORT)))))

(deftest test-users
  (testing "user path"
    (is (= (make-uri :azondi.api/user :user "alice")
           (format "http://localhost:%d/api/1.0/users/alice" PORT))))

  (testing "create user"
    (let [db (-> *system* :database)
          _ (create-api-key db "alice")
          api-key (:api (get-api-key db "alice"))

          response
          (request :put (make-uri :azondi.api/user :user "alice")
                   :data {:password "lewis"
                          :name "Alice Cheung"
                          :email "alice@example.org"
                          }
                   :api-key api-key)]
      (is (= (:status response) 201))
      ;; Do we have the user in the database?
      (is (get-user db "alice"))))

  (testing "overwrite user"
    (let [db (-> *system* :database)
          api-key (:api (get-api-key db "alice"))

          response (request :put (make-uri :azondi.api/user :user "alice")
                            :expected 201
                            :data {:password "shock"
                                   :name "Alice Cooper"
                                   :email "alice@another.com"
                                   }
                            :api-key api-key)]
      (is (not= (:email (get-user db "alice")) "alice@example.org"))
      (is (= (:email (get-user db "alice")) "alice@another.com"))

      (let [uri (make-uri :azondi.api/devices :user "alice")]
        (is (= uri (format "http://localhost:%d/api/1.0/users/alice/devices/" PORT)))

        (let [response (request :post uri :data {} :auth ["alice" "shock"])]

          ;; This needs to return a client id and password in the result
          (is (= 201 (:status response)))
          (is (contains? (:body response) :password))
          (is (contains? (:body response) :client-id))
          (is (not (nil? (:client-id (:body response)))))
          (let [password (-> response :body :password)]

            ;; Find our devices
            (let [response (request :get uri :auth ["alice" "shock"])]

              (is (contains? (:body response) :user))
              (is (contains? (:body response) :devices))

              (let [devices (-> response :body :devices)]
                (is (= 1 (count devices)))))

            ;; Now try to publish a message to azondi
            ;;(request :post (make-uri :azondi.api/devices :user "alice") :data {})
            ))

        ;; Create another device, this time with some attributes
        (request :post uri
                 :auth ["alice" "shock"]
                 :data {:name "iPhone" :description "MQTTitude on my old iPhone"})

        (request :post uri
                 :auth ["alice" "shock"]
                 :data {:name "S3 custom" :description "My own Android app"})

        (request :post uri
                 :auth ["alice" "shock"]
                 :data {:name "Arduino 1" :description "Some hack"})

        ;; There should now be 4 devices
        (let [response (request :get uri :auth ["alice" "shock"])]
          (is (contains? (:body response) :user))
          (is (contains? (:body response) :devices))
          (let [devices (-> response :body :devices)]
            (is (= 4 (count devices)))))

        ;; create and find topics
        (let [topics-uri (make-uri :azondi.api/topics :user "alice")
              response (request :get topics-uri :auth ["alice" "shock"])]

          (let [topic-uri (make-uri :azondi.api/topic
                                    :user "alice"
                                    :topic-name "pollution")]

            (is (contains? (:body response) :user))
            (is (contains? (:body response) :topics))

            ;; Create a public topic
            (request :put topic-uri
                     :auth ["alice" "shock"]
                     :data {:public true})

            (let [topics-response (request :get topics-uri :auth ["alice" "shock"])]
              (is (contains? (:body response) :topics))
              (is (= (-> topics-response :body :topics count) 1)))

            ;; Get the newly created topic
            (let [topic-response (request :get topic-uri :auth ["alice" "shock"])]
              (is (= (:body topic-response)
                     {:owner "alice",
                      :topic "/users/alice/pollution"
                      :public true})))

            ;; Patch the topic
            (request :put topic-uri
                     :auth ["alice" "shock"]
                     :data {:unit "PM25"
                            :description "Forgot the description!"
                            :public true})

            (let [topic-response (request :get topic-uri :auth ["alice" "shock"])]
              (is (= (:body topic-response)
                     {:owner "alice",
                      :topic "/users/alice/pollution",
                      :unit "PM25",
                      :description "Forgot the description!"
                      :public true})))

            (request :put topic-uri
                     :auth ["alice" "shock"]
                     :data {:unit "PM25"
                            :description "Dangerous atmospheric particulate matter"
                            :public true})

            (let [topic-response (request :get topic-uri :auth ["alice" "shock"])]
              (is (= (:body topic-response)
                     {:owner "alice",
                      :topic "/users/alice/pollution",
                      :unit "PM25",
                      :description "Dangerous atmospheric particulate matter"
                      :public true})))

            (let [topic-response (request :get topic-uri :auth ["alice" "shock"])]
              (is (= (:body topic-response)
                     {:owner "alice",
                      :topic "/users/alice/pollution",
                      :description "Dangerous atmospheric particulate matter",
                      :unit "PM25"
                      :public true})))

            (request :delete topic-uri :auth ["alice" "shock"])

            (let [topics-response (request :get topics-uri :auth ["alice" "shock"])]
              (is (= (-> topics-response :body :topics count) 0)))))))))


(deftest test-users-via-api-key
  (testing "user path"
    (is (= (make-uri :azondi.api/user :user "alice")
           (format "http://localhost:%d/api/1.0/users/alice" PORT))))

  (testing "create user with api key"
    (let [db (-> *system* :database)
          _ (create-api-key db "alice")
          response
          (request :put (make-uri :azondi.api/user :user "alice")
                   :data {:password "lewis"
                          :name "Alice Cheung"
                          :email "alice@example.org"
                          }
                   :api-key (:api (get-api-key db "alice")))]
      (is (= (:status response) 201))
      ;; Do we have the user in the database?
      (is (get-user db "alice"))

      ;; Create an API key for alice
      (create-api-key db "alice")

      (let [api-key (:api (get-api-key db "alice"))]
        (is (not (nil? api-key)))
        (let [uri (make-uri :azondi.api/devices :user "alice")]
          (is (= uri (format "http://localhost:%d/api/1.0/users/alice/devices/" PORT)))

          (testing "create device without api-key"
              (let [response (request :post uri :data {} :expected 401)]
                (is (= 401 (:status response)))))

          (testing "create device with api-key"
            (let [response (request :post uri :data {} :api-key api-key)]

              ;; This needs to return a client id and password in the result
              (is (= 201 (:status response))))))))))
