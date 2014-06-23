(ns azondi.api.api-test
  (:require
   [clojure.test :refer :all]
   [com.stuartsierra.component :as component]
   [modular.http-kit :refer (new-webserver)]
   [modular.ring :refer (new-web-request-handler-head)]
   [modular.bidi :refer (new-router routes uri-context)]
   [bidi.bidi :refer (path-for)]
   [azondi.webapp :refer (new-webapp)]
   [azondi.api :refer (new-api)]
   [cylon.impl.login-form :refer (new-login-form)]
   [azondi.http :refer (request)]
   [azondi.dev-db :refer (new-inmemory-datastore)]
   [azondi.db :refer (get-user)]
   ))

(def PORT 8099)

(defn new-api-system []
  (component/system-using

   (component/system-map
    :webserver (new-webserver :port PORT)
    :webhead (new-web-request-handler-head)
    :webrouter (new-router)
    :database (new-inmemory-datastore)
    :api (new-api :uri-context "/api/1.0"))

   {:webserver {:request-handler :webhead}
    :webhead {:request-handler :webrouter,
              #_:authenticator-middleware #_:authenticator}
    :webrouter [:api]}))

(def ^:dynamic *system* nil)

(defmacro with-system [system & body]
  `(let [s# (component/start ~system)]
     (try
       (binding [*system* s#] ~@body)
       (finally
         (component/stop s#)))))

(defn system-fixture [f]
  (with-system (new-api-system)
    (f)))

(use-fixtures :once system-fixture)

(defn make-uri [target & args]
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
          response
          (request :put (make-uri :azondi.api/user :user "alice")
                   :data {:password "lewis"
                          :name "Alice Cheung"
                          :email "alice@example.org"
                          })]
      (is (= (:status response) 201))
      ;; Do we have the user in the database?
      (is (get-user db "alice"))
      ))

  (testing "overwrite user"
    (let [db (-> *system* :database)
          response (request :put (make-uri :azondi.api/user :user "alice")
                            :expected 201
                            :data {:password "shock"
                                   :name "Alice Cooper"
                                   :email "alice@another.com"
                                   })]
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

            ;; Create a topic
            (request :put topic-uri
                     :auth ["alice" "shock"]
                     :data {})

            (let [topics-response (request :get topics-uri :auth ["alice" "shock"])]
              (is (contains? (:body response) :topics))
              (is (= (-> topics-response :body :topics count) 1))
              )

            ;; Get the newly created topic
            (let [topic-response (request :get topic-uri :auth ["alice" "shock"])]
              (is (= (:body topic-response)
                     {:owner "alice",
                      :topic "/users/alice/pollution",})))

            ;; Patch the topic
            (request :put topic-uri
                     :auth ["alice" "shock"]
                     :data {:unit "PM25"
                            :description "Forgot the description!"})

            (let [topic-response (request :get topic-uri :auth ["alice" "shock"])]
              (is (= (:body topic-response)
                     {:owner "alice",
                      :topic "/users/alice/pollution",
                      :unit "PM25",
                      :description "Forgot the description!"
                      })))

            (request :put topic-uri
                     :auth ["alice" "shock"]
                     :data {:unit "PM25"
                            :description "Dangerous atmospheric particulate matter"})

            (let [topic-response (request :get topic-uri :auth ["alice" "shock"])]
              (is (= (:body topic-response)
                     {:owner "alice",
                      :topic "/users/alice/pollution",
                      :unit "PM25",
                      :description "Dangerous atmospheric particulate matter"
                      })))

            (let [topic-response (request :get topic-uri :auth ["alice" "shock"])]
              (is (= (:body topic-response)
                     {:owner "alice",
                      :topic "/users/alice/pollution",
                      :description "Dangerous atmospheric particulate matter",
                      :unit "PM25"})))

            (request :delete topic-uri :auth ["alice" "shock"])

            (let [topics-response (request :get topics-uri :auth ["alice" "shock"])]
              (is (= (-> topics-response :body :topics count) 0)))))))))
