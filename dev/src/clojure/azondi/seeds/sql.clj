(ns azondi.seeds.sql
  (:require [clojure.java.jdbc :as j]))

;;
;; API
;;

(defn run
  [target & args]
  (j/with-db-connection [db {:connection-uri (get-in target [:db :url])}]
    (let [t "users"]
      (j/delete! db t ["true"])
      (j/insert! db t
                 ;; password: yods-pwd
                 {:id "yods" :name "Yodit S" :email "yodit@opensensors.io"
                  :password_hash "$s0$e0801$dfKRFZiEStuBQm+DKQr5NQ==$9qd8nBxPSsCqcSFxMPGaqofJfeQwgMkiQAIhO7gzm34=" :role "user"}
                 ;; password: malcolmsparks-pwd
                 {:id "malcolmsparks" :name "Malcolm Sparks" :email "malcolm@opensensors.io",
                  :password_hash "$s0$e0801$/eFWoMrBH8qvbOV6Sha5oA==$1XCf1mQvBdIWqY0rtcZax426itISxCq/J/LMMqUuHqM=" :role "user"}
                 ;; password: michael-pwd
                 {:id "michaelklishin" :name "Michael Klishin" :email "michael@opensensors.io",
                  :password_hash "$s0$e0801$1/DTkx1MtXX511KH9TRjqg==$Skpfo5t6IyBY465bKXaTcOdMCL/jJEUF/kqM/swzGwc=" :role "user"}))
    (let [t "devices"]
      (j/delete! db t ["true"])
      (j/insert! db t
                 ;; password: device-1-pwd
                 {:name "Pollution 1" :owner_user_id "yods"
                  :device_password_hash "$s0$e0801$UFqu7r6NqzzA8f2Izbgjig==$D5QttKRnviio4CT8YON+m9OoesbDNen4r0c7P19pqsE="}
                 ;; password: device-2-pwd
                 {:name "Pollution 2" :owner_user_id "yods"
                  :device_password_hash "$s0$e0801$obspyjv/9zmFcD9we9A3oA==$fqeO5pvrR57aaqy4EAy9P3hZ+DS/yoT9GtfJnA3aLq4="}
                 ;; password: device-3-pwd
                 {:name "Foo 3" :owner_user_id "yods"
                  :device_password_hash "$s0$e0801$EGG/OmC7ZEIUOkU9t/m5XQ==$oyI8bQInV1jeaMYaV4tHxleK3Hzarr4IrLGb6dA+Vtc="}
                 ;; password: device-4-pwd
                 {:name "Fab 5" :owner_user_id "michaelklishin"
                  :device_password_hash "$s0$e0801$fndkuyOGRHJcwU0LsTQwpw==$3t5c0YAk6F7ekWD8fbyOvSJholAKYReCdCq8uD/suWM="}))
    (let [t "topics"]
      (j/delete! db t ["true"])
      (j/insert! db t
                 {:unit "PM10"    :name "pm10"   :topic "/users/yods/pm10-1" :public true :owner "yods"}
                 {:unit "PM10"    :name "pm10-2" :topic "/users/yods/pm10-2" :public true :owner "yods"}
                 {:unit "celcius" :name "temperature"  :topic "/users/yods/e12/temp1" :public true :owner "yods"}
                 {:unit "PM10"    :name "pm10-private" :topic "/users/yods/pm10-private" :public true :owner "yods"}))
    (let [t "subscriptions"]
      (j/delete! db t ["true"])
      (j/insert! db t
                 {:user_id "michaelklishin" :topic "/users/yods/pm10-1"}
                 {:user_id "michaelklishin" :topic "/users/yods/pm10-2"}
                 {:user_id "michaelklishin" :topic "/users/yods/e12/temp1"}
                 {:user_id "yods" :topic "/users/yods/pm10-1"}
                 {:user_id "yods" :topic "/users/yods/pm10-2"}
                 {:user_id "yods" :topic "/users/yods/e12/temp1"}
                 {:user_id "yods" :topic "/users/yods/pm10-private"}))
    (let [t "ws_session_tokens"]
      (j/delete! db t ["true"])
      (j/insert! db t
                 {:token "075cb213-0726-46c7-8bd3-210919fa6b9a" :user_id "yods"}
                 {:token "e162b69f-2095-409c-940b-8914c22e97ef" :user_id "malcolmsparks"}
                 {:token "41a27093-a564-4012-b796-058ebd94c6c0" :user_id "michaelklishin"}))))
