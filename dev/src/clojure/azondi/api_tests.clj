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

(defn make-uri [k & args]
  (let [h (get handlers k)]
    (assert h (str "No handler for " k))
    (str "http://localhost:" port "/api/1.0" (apply path-for routes k args))))


(deftest devices
  ;; Create Alice
  (is (not (get-user db "alice")))
  (let [uri (make-uri :azondi.api/user :user "alice")
        response (request :put uri :data {:password "lewis"
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

      (let [uri (make-uri :azondi.api/devices :user "alice")]

        (let [response (request :post uri :data {} :auth ["alice" "shock"])]

          ;; This needs to return a client id and password in the result
          (is (= 201 (:status response)))
          (is (contains? (:body response) :password))
          (is (contains? (:body response) :client-id))
          (is (not (nil? (:client-id (:body response)))))
          (let [password (-> response :body :password)]

            ;; Find our devices
            (let [uri (make-uri :azondi.api/devices :user "alice")
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
        (let [uri (make-uri :azondi.api/topics :user "alice")
              response (request :get uri)]
          (is (contains? (:body response) :user))
          (is (contains? (:body response) :topics))
          (request :post uri :data {:name "pollution" :unit "PM25"})
          (request :post uri :data {:name "pollution-E12"})

          ))))

  ;; TODO Test error scenarios here
  )


(defrecord ApiTests []
  component/Lifecycle
  (start [this]
    (let [handlers (get-in this [:api :handlers])
          routes (get-in this [:api :routes])
          db (get-in this [:database])
          port (get-in this [:webserver :port])]
      (alter-var-root #'handlers (constantly handlers))
      (alter-var-root #'routes (constantly routes))
      (alter-var-root #'db (constantly db))
      (alter-var-root #'port (constantly port)))

    (clojure.test/run-tests 'azondi.api-tests)
    this)
  (stop [this] this))

(defn new-api-tests []
  (component/using (->ApiTests) [:api :database :webserver]))
