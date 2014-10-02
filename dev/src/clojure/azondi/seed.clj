(ns azondi.seed
  (:require
   [com.stuartsierra.component :as component]
   [azondi.http :refer (request)]
   [cylon.user :refer (create-user!)]
   [cylon.password :refer (make-password-hash)]
   [byte-streams :refer (convert)]
   [azondi.messages-db :refer (archive-message!)]
   [clojure.tools.logging :refer :all]
   [bidi.bidi :refer (path-for)]))

(defn make-uri [route]
  (str "http://localhost:8010/api/1.0" route))

(defn seed-data! []
  (debugf "Creating yods")

  (let [response (request :put (make-uri "/users/yods")
                          :data {:password "password"
                                 :name "Yodit Stanton"
                                 :email "yodit@atomicdatalabs.com"})
        api-key (-> response :body :api-key)]
    #_(doseq [data
              [{:name "Arduino 1" :description "Some arduino lying around"}
               {:name "Arduino 2" :description "A broken arduino"}
               {:name "Pollution sensor" :description ""}]]
        (request :post (make-uri "/users/yods/devices/")
                 :api-key api-key
                 :data data)))

  (debugf "Creating malcolm")

  (let [response (request :put (make-uri "/users/malcolmsparks")
                          :data {:password "malcolmsparks-pwd"
                                 :name "Malcolm Sparks"
                                 :email "malcolm@juxt.pro"})
        api-key (-> response :body :api-key)]
    #_(doseq [data
              [{:name "S3-1" :description "MQTTitude on Samsung Galaxy S3"}
               {:name "S3-2" :description "MQTTitude (test) on Samsung Galaxy S3"}
               {:name "S3-3" :description "another device"}]]
        (request :post (make-uri "/users/malcolmsparks/devices/")
                 :api-key api-key
                 :data data)))

  (request :put (make-uri "/users/mk")
           :data {:password "password"
                  :name "Michael Klishin"
                  :email "michael@opensensors.io"})

#_(request :put (make-uri "/users/juan")
           :data {:password "123"
                  :name "Juan Antonio Ruz"
                  :email "juanantonioruz@gmail.com"}))

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
  (component/using (->SeedData) [:http-listener]))

(defn create-user [db pv name uid email password]
  (create-user! db uid (make-password-hash pv password) email {:name name}))

(defrecord DBSeedData [password-verifier database cassandra]
  component/Lifecycle
  (start [this]
    (try
      (create-user database password-verifier "Yodit Stanton" "yods" "yodit@atomicdatalabs.com" "password")
      (create-user database password-verifier "Malcolm Sparks" "malcolm" "malcolm@juxt.pro" "pwd")
      (create-user database password-verifier "Michael Klishin" "mk" "michael@opensensors.io" "password")
      (create-user database password-verifier "Juan A. Ruz" "juan" "juanantonioruz@gmail.com" "krakow")
      (archive-message! cassandra
                        {:device_id "1" :topic "/users/juan/test" :owner "juan"
                         :payload (convert "message" java.nio.ByteBuffer) :content_type "text"})


      (catch Exception e (errorf e "Error seeding data")))
    this
      )
  (stop [this] this))


(defn new-direct-db-seed-data []
  (component/using (->DBSeedData) [:database :cassandra :password-verifier]))
