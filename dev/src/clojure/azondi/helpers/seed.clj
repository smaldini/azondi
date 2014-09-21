(ns azondi.helpers.seed
  (:require
   [com.stuartsierra.component :as component]
   [azondi.db :refer (create-user! create-api-key)]
   [byte-streams :refer (convert)]
   [azondi.messages-db :refer (archive-message!)]
   [clojure.tools.logging :refer :all]
   [bidi.bidi :refer (path-for)]
   [clj-time.core   :as tc])
  (:import org.joda.time.DateTime
           java.sql.Timestamp))

(defn make-uri
  [^String path]
  (str "http://localhost:8010/api/1.0" path))

(defn ^Timestamp sql-timestamp
  "Like clj-time.core/date-time but produces a SQL timestamp that can be
   used with JDBC"
  [& args]
  (let [^DateTime dt (apply tc/date-time args)]
    (Timestamp. (.. dt toDate getTime))))

(comment
  (defrecord DBSeedData []
  component/Lifecycle
  (start [this]
    (try
      (create-user! (:database this) "Yodit Stanton" "yods" "yodit@atomicdatalabs.com" "password")
      (create-user! (:database this) "Malcolm Sparks" "malcolm" "malcolm@juxt.pro" "malcolmsparks-pwd")
      (create-user! (:database this) "Michael Klishin" "mk" "michael@opensensors.io" "password")
      (create-user! (:database this) "Juan A. Ruz" "juan" "juanantonioruz@gmail.com" "krakow")

      (.create-topic! (:database this ) {:topic "/users/juan/test-public" :owner "juan" :public true})
      (.create-topic! (:database this ) {:topic "/users/juan/test-private" :owner "juan" :public false})

      (.create-device! (:database this )  "juan"  "passwd1") ;; 1001
      (.create-device! (:database this )  "juan"  "passwd2") ;; 1002

      (.create-device! (:database this )  "yods"  "passwd-yods") ;; 1003
      (.create-device! (:database this )  "malcolm"  "passwd-malcolm") ;; 1004

      (archive-message-with-date! (:cassandra this)
                                  (tc/date-time 2014 1 15 0)
                        {:device_id "1001" :topic "/users/juan/test-public" :owner "juan"
                         :payload (convert "message-1" java.nio.ByteBuffer) :content_type "text"})
      (archive-message-with-date! (:cassandra this)
                                  (tc/date-time 2014 1 16 0)
                        {:device_id "1001" :topic "/users/juan/test-public" :owner "juan"
                         :payload (convert "message-2" java.nio.ByteBuffer) :content_type "text"})
      (archive-message-with-date! (:cassandra this)
                                  (tc/date-time 2014 1 17 0)
                        {:device_id "1002" :topic "/users/juan/test-private" :owner "juan"
                         :payload (convert "message-3" java.nio.ByteBuffer) :content_type "text"})
      (archive-message-with-date! (:cassandra this)
                                  (tc/date-time 2014 1 18 0)
                        {:device_id "1002" :topic "/users/juan/test-private" :owner "juan"
                         :payload (convert "message-4" java.nio.ByteBuffer) :content_type "text"})


      (create-api-key (:database this) "juan")

      (create-api-key (:database this) "yods")


      (catch Exception e (errorf e "Error seeding data")))
    this
      )
  (stop [this] this)))
