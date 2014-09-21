(ns azondi.seeds.sql
  (:require [clojure.java.jdbc :as j]))

;;
;; API
;;

(defn run
  [target & args]
  (j/with-db-connection [db {:connection-uri (get-in target [:db :url])}]
    (let [t "users"]
      (j/execute! db [(format "DELETE FROM %s" t)])
      (j/insert! db t
                 ;; password: yods-pwd
                 {:id "yods" :name "Yodit S" :email "yodit@opensensors.io"
                  :password_hash "$s0$e0801$dfKRFZiEStuBQm+DKQr5NQ==$9qd8nBxPSsCqcSFxMPGaqofJfeQwgMkiQAIhO7gzm34=" :role "user"}
                 ;; password: malcolmsparks-pwd
                 {:id "malcolmsparks" :name "Malcolm Sparks" :email "malcolm@opensensors.io",
                  :password_hash "$s0$e0801$/eFWoMrBH8qvbOV6Sha5oA==$1XCf1mQvBdIWqY0rtcZax426itISxCq/J/LMMqUuHqM=" :role "user"}
                 ;; password: michael-pwd
                 {:id "michaelklishin" :name "Michael Klishin" :email "michael@opensensors.io",
                  :password_hash "$s0$e0801$1/DTkx1MtXX511KH9TRjqg==$Skpfo5t6IyBY465bKXaTcOdMCL/jJEUF/kqM/swzGwc=" :role "user"}
                 ;; password: juan-pwd
                 {:id "juan" :name "Juan Antonio Ruz" :email "juan@opensensors.io",
                  :password_hash "$s0$e0801$qoEgrYNdem4lbyclYlogYg==$OHuRJ6yT9YmuJhHtJMvS5x3SE9ztTX/D2fuM7iP2lP0=" :role "user"}
                 ;; password: andrey-pwd
                 {:id "andrey" :name "Andrey Barkanov" :email "andrey@opensensors.io",
                  :password_hash "$s0$e0801$0ATDyEeSCb9Ur/pTq08nYw==$f7cktstlonSxwe6U+f2EZpRMXJgio3bq8+j3bauSe0w=" :role "user"}))
    (let [t "devices"]
      (j/execute! db [(format "DELETE FROM %s" t)])
      (j/insert! db t
                 ;; password: device-1-pwd
                 {:name "Pollution 1" :client_id 1 :owner_user_id "yods"
                  :device_password_hash "$s0$e0801$UFqu7r6NqzzA8f2Izbgjig==$D5QttKRnviio4CT8YON+m9OoesbDNen4r0c7P19pqsE="}
                 ;; password: device-2-pwd
                 {:name "Pollution 2" :client_id 2 :owner_user_id "yods"
                  :device_password_hash "$s0$e0801$obspyjv/9zmFcD9we9A3oA==$fqeO5pvrR57aaqy4EAy9P3hZ+DS/yoT9GtfJnA3aLq4="}
                 ;; password: device-3-pwd
                 {:name "Foo 3" :client_id 3 :owner_user_id "yods"
                  :device_password_hash "$s0$e0801$EGG/OmC7ZEIUOkU9t/m5XQ==$oyI8bQInV1jeaMYaV4tHxleK3Hzarr4IrLGb6dA+Vtc="}
                 ;; password: device-4-pwd
                 {:name "Fab 5" :client_id 4 :owner_user_id "michaelklishin"
                  :device_password_hash "$s0$e0801$fndkuyOGRHJcwU0LsTQwpw==$3t5c0YAk6F7ekWD8fbyOvSJholAKYReCdCq8uD/suWM="}))
    (let [t "api_keys"]
      (j/execute! db [(format "DELETE FROM %s" t)])
      (j/insert! db t
                 {:id "yods"           :api "81f8f802-4172-11e4-8e10-28cfe917f97b"})
      (j/insert! db t
                 {:id "malcolmsparks"  :api "a4cdd38e-4172-11e4-b332-28cfe917f97b"})
      (j/insert! db t
                 {:id "michaelklishin" :api "aa858dc6-4172-11e4-99bb-28cfe917f97b"})
      (j/insert! db t
                 {:id "juan"           :api "aadd4d36-4172-11e4-a0bf-28cfe917f97b"})
      (j/insert! db t
                 {:id "andrey"         :api "5d70ee3a-4173-11e4-ae7a-28cfe917f97b"}))

    (let [t "topics"]
      (j/execute! db [(format "DELETE FROM %s" t)])
      (j/insert! db t
                 {:unit "PM10"    :name "pm10"   :topic "/users/yods/pm10-1" :public true :owner "yods"}
                 {:unit "PM10"    :name "pm10-2" :topic "/users/yods/pm10-2" :public true :owner "yods"}
                 {:unit "celcius" :name "temperature"  :topic "/users/yods/e12/temp1" :public true :owner "yods"}
                 {:unit "PM10"    :name "pm10-private" :topic "/users/yods/pm10-private" :public true :owner "yods"}))
    (let [t "subscriptions"]
      (j/execute! db [(format "DELETE FROM %s" t)])
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
