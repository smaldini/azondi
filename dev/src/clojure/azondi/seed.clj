(ns azondi.seed
  (:require
   [com.stuartsierra.component :as component]
   [azondi.http :refer (request)]
   [azondi.db :refer (create-user!)]
   [byte-streams :refer (convert)]
   [azondi.messages-db :refer (archive-message!)]
   [clojure.tools.logging :refer :all]
   [bidi.bidi :refer (path-for)]))

(defn make-uri [route]
  (str "http://localhost:8010/api/1.0" route))

(defn seed-data! []
  (infof "Creating yods")

  (let [response (request :put (make-uri "/users/yods")
                          :data {:password "password"
                                 :name "Yodit Stanton"
                                 :email "yodit@atomicdatalabs.com"})
        api-key (-> response :body :api-key)]
    (doseq [data
            [{:name "Arduino 1" :description "Some arduino lying around"}
             {:name "Arduino 2" :description "A broken arduino"}
             {:name "Pollution sensor" :description ""}]]
      (request :post (make-uri "/users/yods/devices/")
               :api-key api-key
               :data data)))

  (infof "Creating malcolm")

  (let [response (request :put (make-uri "/users/malcolmsparks")
                          :data {:password "malcolmsparks-pwd"
                                 :name "Malcolm Sparks"
                                 :email "malcolm@juxt.pro"})
        api-key (-> response :body :api-key)]
    (doseq [data
            [{:name "S3-1" :description "MQTTitude on Samsung Galaxy S3"}
             {:name "S3-2" :description "MQTTitude (test) on Samsung Galaxy S3"}]]
      (request :post (make-uri "/users/malcolmsparks/devices/")
               :api-key api-key
               :data data)))

  (request :put (make-uri "/users/mk")
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


(defrecord DBSeedData []
  component/Lifecycle
  (start [this]
    (try
      (create-user! (:database this) "Yodit Stanton" "yods" "yodit@atomicdatalabs.com" "password")
      (create-user! (:database this) "Malcolm Sparks" "malcolm" "malcolm@juxt.pro" "malcolmsparks-pwd")
      (create-user! (:database this) "Michael Klishin" "mk" "michael@opensensors.io" "password")
      (create-user! (:database this) "Juan A. Ruz" "juan" "juanantonioruz@gmail.com" "krakow")
      (archive-message! (:cassandra this)
                        {:device_id "1" :topic "/users/juan/test" :owner "juan"
                         :payload (convert "message" java.nio.ByteBuffer) :content_type "text"})


      (catch Exception e (errorf e "Error seeding data")))
    this
      )
  (stop [this] this))


(defn new-direct-db-seed-data []
  (component/using (->DBSeedData) [:database :cassandra]))
