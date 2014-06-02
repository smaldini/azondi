(ns azondi.api-tests
  (:require
   [com.stuartsierra.component :as component]
   [clojure.test :refer :all]
   [cheshire.core :refer (decode)]
   [bidi.bidi :refer (path-for)]
   [azondi.db :refer (get-user)]
   [azondi.system :refer (config)]
   [azondi.http :refer (request)]))

;; This is to set the API handlers and routes - they are set by le-web.api.api-starter.APITests
(def db nil)
(def routes nil)
(def handlers nil)
(def port nil)

(defn make-uri [route]
  (str "http://localhost:" 3000 "/api/1.0" route))


(deftest devices
  ;; Create Alice
  (is (not (get-user db "alice")))
  (let [uri (make-uri "/users/alice")
        response (request :put "http://localhost:3000/api/1.0/users/alice" :data {:password "lewis"
                                          :name "Alice Cheung"
                                          :email "alice@example.org"
                                          })]
    (is (= (:status response) 201))
    ;; Do we have the user in the database?
    (is (get-user db "alice"))

    ;; Overwrite the user
    (let [response (request :put uri :expected 201
                            :data {:password "shock"
                                   :name "Alice Cooper"
                                   :email "alice@another.com"
                                   })]

      (is (not= (:email (get-user db "alice")) "alice@example.org"))
      (is (= (:email (get-user db "alice")) "alice@another.com"))

      (let [uri (make-uri "/users/alice/devices/")]

        (let [response (request :post uri :data {} :auth ["alice" "shock"])]

          ;; This needs to return a client id and password in the result
          (is (= 201 (:status response)))
          (is (contains? (:body response) :password))
          (is (contains? (:body response) :client-id))
          (is (not (nil? (:client-id (:body response)))))
          (let [password (-> response :body :password)]

            ;; Find our devices
            (let [uri (make-uri "/users/alice/devices/")
                  response (request :get uri :auth ["alice" "shock"])]

              (is (contains? (:body response) :user))
              (is (contains? (:body response) :devices))

              (let [devices (-> response :body :devices)]
                (is (= 1 (count devices))))

              )

            ;; Now try to publish a message to azondi


            ;;(request :post (make-uri :azondi.api/devices :user "alice") :data {})

            ;; Let's try to get our devices
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

        ;; create and find topics
        (let [topics-uri (make-uri "/users/alice/topics/")
              response (request :get topics-uri :auth ["alice" "shock"])]

          (let [topic-uri (make-uri "/users/alice/topics/pollution")]

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
              (is (= (-> topics-response :body :topics count) 0))
              )

            )

          ))))

  ;; TODO Test error scenarios here
  )


(defrecord ApiTests []
  component/Lifecycle
  (start [this]
    (let [handlers (get-in this [:api :handlers])
          routes (get-in this [:api :routes])
          db (get-in this [:database])
          ;;port (get-in this [:webserver :port])
          ]
      (alter-var-root #'handlers (constantly handlers))
      (alter-var-root #'routes (constantly routes))
      (alter-var-root #'db (constantly db))
      ;;(alter-var-root #'port (constantly port))
      )

    (clojure.test/run-tests 'azondi.api-tests)
    this)
  (stop [this] this))

(defn new-api-tests []
  (component/using (->ApiTests) [:api :database :webserver]))
