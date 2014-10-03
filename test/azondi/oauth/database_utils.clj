(ns azondi.oauth.database-utils
  (:require
   [clojure.java.jdbc :as j]
   [cylon.token-store :refer (create-token!)]
   [azondi.db :refer (create-api-key! get-api-key
                                      get-users
                                      create-device!
                                      create-topic!
                                      devices-by-owner
                                      topics-by-owner
                                      )]
   [cylon.user :refer (get-user create-user!)]
   [cylon.password :refer (new-durable-password-verifier make-password-hash)]))



(defn reset-test-users [system]
  (let [database (-> system :database)
        connection (:connection database)]
    (j/delete! connection :api_keys ["id LIKE 'test_%'"])
    (j/delete! connection :tokens ["type= 'API-KEYS'"])
    (j/delete! connection :topics ["owner LIKE 'test_%'"])
    (j/delete! connection :devices ["owner_user_id LIKE 'test_%'"])
    (j/delete! connection :users ["id LIKE 'test_%'"])

    (assert (= 0 (count (j/query connection ["SELECT * FROM users where id LIKE 'test_%';"]))))
    (assert (= 0 (count (j/query connection ["SELECT * FROM topics where owner LIKE 'test_%';"]))))
    (assert (= 0 (count (j/query connection ["SELECT * FROM devices where owner_user_id LIKE 'test_%';"]))))
    (assert (= 0 (count (j/query connection ["SELECT * FROM api_keys where id LIKE 'test_%';"])))))
  )

(defn create-user-foo [system user-name password e-mail user-api-key]
  (let [database (-> system :database)
        connection (:connection database)]
   (create-user! database user-name
                 (make-password-hash (-> system :password-verifier) password)
                 e-mail {:name user-name})

   (create-topic! database {:topic "/juan-topic" :owner user-name :public true})
   (create-device! database user-name "device-pwd")

   (let [access-token user-api-key]
     (create-token! (-> system :api-key-token-store)
                    access-token
                    {
                     :cylon/subject-identifier user-name
                     :cylon/scopes  #{:user :superuser}}))


   (assert (= 1  (count (j/query connection  ["SELECT * FROM users WHERE id LIKE 'test_%'"]))))
   (assert (= 1  (count (j/query connection  ["SELECT * FROM topics WHERE owner LIKE 'test_%'"]) )))
   (assert (= 1  (count (j/query connection ["SELECT * from devices WHERE owner_user_id LIKE 'test_%'"]) )))
   (assert (= 1 (count (j/query connection  ["SELECT * from tokens WHERE type='API-KEYS'"]))))
   (assert (= 0 (count (j/query connection  ["SELECT * from api_keys WHERE id LIKE 'test_%'"])))))
)
