(ns azondi.seed
  (:require
   [com.stuartsierra.component :as component]
   [azondi.http :refer (request)]
   [clojure.tools.logging :refer :all]
   [bidi.bidi :refer (path-for)]))

(defn make-uri [route]
  (str "http://localhost:8010/api/1.0" route))

(defn seed-data! []
  (request :put (make-uri "/users/yods")
           :data {:password "password"
                  :name "Yodit Stanton"
                  :email "yodit@atomicdatalabs.com"})

  (request :post (make-uri "/users/yods/devices/")
           :auth ["yods" "password"]
           :data {:name "Arduino 1" :description "Some arduino lying around"}
           :data {:name "Arduino 2" :description "A broken arduino"}
           :data {:name "Pollution sensor" :description ""})

  (request :put (make-uri "/users/malcolm")
           :data {:password "password"
                  :name "Malcolm Sparks"
                  :email "malcolm@juxt.pro"})

  (request :post (make-uri "/users/malcolm/devices/")
           :auth ["malcolm" "password"]
           :data {:name "S3-1" :description "MQTTitude on Samsung Galaxy S3"})

  (request :post (make-uri "/users/malcolm/devices/")
           :auth ["malcolm" "password"]
           :data {:name "S3-2" :description "MQTTitude (test) on Samsung Galaxy S3"})

  (request :put (make-uri "/users/mk/" :user "mk")
           :data {:password "password"
                  :name "Michael Klishin"
                  :email "michael@opensensors.io"}))

(defrecord SeedData []
  component/Lifecycle
  (start [this]
    (try
      (seed-data!)
      (catch Exception e (errorf e "Error seeding data")))
    this
      )
  (stop [this] this))

(defn new-seed-data []
  (component/using (->SeedData) [:webserver]))
