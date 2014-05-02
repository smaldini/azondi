(ns azondi.api-tests
  (:require
   [com.stuartsierra.component :as component]
   [clojure.test :refer :all]
   [org.httpkit.client :refer (request) :rename {request http-request}]
   [cheshire.core :refer (encode decode)]
   [clojure.pprint :refer (pprint)]
   [bidi.bidi :refer (path-for)]
   [azondi.api :refer (->js ->clj) :as api]
   [azondi.db :refer (get-user)]
   ))

;; This is to set the API handlers and routes - they are set by le-web.api.api-starter.APITests
(def db nil)
(def routes nil)
(def handlers nil)

(def uri-prefix "http://localhost:8010/api/1.0")

(defn make-uri [k & args]
  (let [h (get handlers k)]
    (assert h (str "No handler for " k))
    (str uri-prefix (apply path-for routes k args))))

(defn request [method uri & {:keys [data api-key expected]}]
  (let [response
        @(http-request
          (merge
           {:method method
            :url uri
            :headers
            (merge
             {"Content-Type" "application/json"
              "Accept" "application/json"}
             #_(when api-key
                 {"Authorization" (str "api-key " api-key)}))}
           (when data
             {:body (str (encode (->js data)))}))
          identity)]
    (assert (:status response) (format "Failed to connect to %s!" uri))
    (when
        (if expected
          (not= (:status response) expected)
          (>= (:status response) 400))
      (println "Error status returned on HTTP request")
      (pprint response)
      (throw (ex-info (format "Unexpected status, response status is %d with body %s" (:status response) (pr-str (:body response))) {})))
    (update-in response [:body] (comp ->clj decode))))


(deftest devices
  ;; Create Alice
  (is (not (get-user db "alice")))
  (let [uri (make-uri :azondi.api/user :user "alice")
        response (request :put uri :data {:user "alice"
                                          :name "Alice Cheung"
                                          :email "alice@example.org"
                                          })]
    (is (= (:status response) 201))
    (is (contains? (:body response) :api-key))
    (is (contains? (:body response) :password))
    ;; Do we have the user in the database?
    (is (get-user db "alice"))

    ;; Overwrite the user
    (let [response (request :put uri :expected 201
                            :data {:user "alice"
                                   :name "Alice Cooper"
                                   :email "alice@another.com"
                                   })]

      (is (not= (:email (get-user db "alice")) "alice@example.org"))
      (is (= (:email (get-user db "alice")) "alice@another.com"))

      (let [uri (make-uri :azondi.api/devices :user "alice")]

        (let [response (request :post uri :data {})]

          ;; This needs to return a client id and password in the result
          (is (= 201 (:status response)))
          (is (contains? (:body response) :password))
          (is (contains? (:body response) :client-id))
          (is (not (nil? (:client-id (:body response)))))
          (let [password (-> response :body :password)]

            ;; Find our devices
            (let [uri (make-uri :azondi.api/devices :user "alice")
                  response (request :get uri)]

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
        (request :post uri :data {:name "iPhone" :description "MQTTitude on my old iPhone"})
        (request :post uri :data {:name "S3 custom" :description "My own Android app"})
        (request :post uri :data {:name "Arduino 1" :description "Some hack"})

        )))


  ;; TODO Test error scenarios here
  )


(defrecord ApiTests []
  component/Lifecycle
  (start [this]
    (let [handlers (get-in this [:api :handlers])
          routes (get-in this [:api :routes])
          db (get-in this [:database])]
      (alter-var-root #'handlers (constantly handlers))
      (alter-var-root #'routes (constantly routes))
      (alter-var-root #'db (constantly db)))
    (clojure.test/run-tests 'azondi.api-tests)
    this)
  (stop [this] this))

(defn new-api-tests []
  (component/using (->ApiTests) [:api :database :webserver]))
