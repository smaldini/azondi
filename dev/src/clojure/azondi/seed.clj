
(ns azondi.seed
  (:require
   [com.stuartsierra.component :as component]
   [azondi.http :refer (request)]
   [clojure.tools.logging :refer :all]
   #_[org.httpkit.client :refer (request) :rename {request http-request}]
   #_[cheshire.core :refer (encode decode)]
   #_[clojure.pprint :refer (pprint)]
   [bidi.bidi :refer (path-for)]
   #_[azondi.api :refer (->js ->clj) :as api]
   #_[azondi.db :refer (get-user)]
   #_[azondi.system :refer (config)]
   ))

(defn make-uri [routes port k & args]
  (str "http://localhost:" port "/api/1.0" (apply path-for routes k args)))

(defn seed-data! [routes port]
  (request :put (make-uri routes port :azondi.api/user :user "yods")
           :data {:password "password"
                  :name "Yodit Stanton"
                  :email "yodit@atomicdatalabs.com"})

  (request :post (make-uri routes port :azondi.api/devices :user "yods")
           :auth ["yods" "password"]
           :data {:name "Arduino 1" :description "Some arduino lying around"}
           :data {:name "Arduino 2" :description "A broken arduino"}
           :data {:name "Pollution sensor" :description ""})

  (request :put (make-uri routes port :azondi.api/user :user "malcolm")
           :data {:password "password"
                  :name "Malcolm Sparks"
                  :email "malcolm@juxt.pro"})

  (request :post (make-uri routes port :azondi.api/devices :user "malcolm")
           :auth ["malcolm" "password"]
           :data {:name "S3-1" :description "MQTTitude on Samsung Galaxy S3"})

  (request :post (make-uri routes port :azondi.api/devices :user "malcolm")
           :auth ["malcolm" "password"]
           :data {:name "S3-2" :description "MQTTitude (test) on Samsung Galaxy S3"})

  (request :put (make-uri routes port :azondi.api/user :user "mk")
           :data {:password "password"
                  :name "Michael Klishin"
                  :email "michael@opensensors.io"}))

(defrecord SeedData []
  component/Lifecycle
  (start [this]
    (let [routes (get-in this [:api :routes])
          port (get-in this [:webserver :port])]
      (try
        (seed-data! routes port)
        (catch Exception e (errorf e "Error seeding data")))
      this
      ))
  (stop [this] this))

(defn new-seed-data []
  (component/using (->SeedData) [:webserver :api]))
