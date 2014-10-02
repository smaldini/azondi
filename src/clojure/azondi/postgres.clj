(ns azondi.postgres
  "Database protocol implementation for PostgreSQL"
  (:require
   [clojure.tools.logging :refer :all]
   [clojure.java.jdbc :as j]
   [schema.core :as s]
   [com.stuartsierra.component :as component :refer (using)]
   [clojure.java.jdbc :as j]
   [clojure.string :as cs]
   [azondi.db.protocol :refer (DataStore)]
   [azondi.db :refer (get-user)]
   [azondi.passwords :as sc]
   [azondi.helpers :refer (process-maps)]
   [azondi.passwords :as pwd]
   [camel-snake-kebab :as csk]
   [cylon.user.protocols :refer (UserStore)]
   [cylon.token-store.protocols :refer (TokenStore get-token-by-id renew-token! purge-token!)]
   [cylon.totp :refer (OneTimePasswordStore)]
   [plumbing.core :refer (<-)]
   ))

(defn clj->psql [mp]
  (process-maps mp csk/->snake_case))

(defn psql->clj [mp]
  (process-maps mp csk/->kebab-case))

(defn ^String extract-topic-name
  [^String topic]
  (last (.split topic "/")))

(defrecord Database [host port dbname user password]
  component/Lifecycle
  (start [this]
    (assoc this
      :connection
      {:subprotocol "postgresql"
       :classname "org.postgresql.Driver"
       :subname (format "//%s:%d/%s" host port dbname)
       :user user
       :password password}))
  (stop [this] this)

  UserStore
  (create-user! [component uid {:keys [hash salt]} email user-details]
    (j/insert!
     (:connection component)
     :users {:id uid
             :name (:name user-details)
             :email email
             :password_hash hash
             :password_salt salt}))

  (get-user [component uid]
    (when-let [row (first (j/query (:connection component)
                                   ["SELECT * FROM users WHERE id = ?" uid]))]
      {:uid (:id row)
       :name (:name row)
       :email (:email row)}))

  (get-user-password-hash [component uid]
    (when-let [row (first (j/query (:connection component)
                                   ["SELECT * FROM users WHERE id = ?" uid]))]
      {:hash (:password_hash row)
       :salt (:password_salt row)}))

  (set-user-password-hash! [component uid {:keys [hash salt]}]
    (j/update!
     (:connection component)
     :users {:password_hash hash
             :password_salt salt}
     ["id = ?" uid]))

  (get-user-by-email [component email]
    (when-let [row (first (j/query (:connection component)
                                   ["SELECT * FROM users WHERE email = ?" email]))]
      {:uid (:id row)
       :name (:name row)
       :email (:email row)}))

  (delete-user! [component uid]
    (j/delete!
     (:connection component)
     :users ["id = ?" uid]))

  (verify-email! [component uid]
    (j/update!
     (:connection component)
     :users {:email_verified true} ["id = ?" uid]))

  DataStore
  (get-users [component]
    (for [row (j/query (:connection component)
                       ["SELECT * FROM users;"])]
      {:user (:id row)
       :name (:name row)
       :email (:email row)}))

  (devices-by-owner [this user]
    (->> (psql->clj (j/query (:connection this) ["SELECT * FROM devices WHERE owner_user_id = ?;" user]))
         (map #(-> (update-in % [:client-id] str)
                   (dissoc :created-on :device-password-hash :owner-user-id :id)))))

  (create-device! [this user pwd]
    (let [data {:owner_user_id user :device_password_hash (sc/encrypt pwd)}]
      (psql->clj (-> (first (j/insert! (:connection this) :devices data))
                     (dissoc :device_password_hash)
                     (dissoc :created_on)))))

  (get-device [this client-id]
    (let [row (first (j/query (:connection this) ["SELECT * FROM devices WHERE client_id = ?;" (Long/parseLong client-id)]))]
      (when row
        (merge
         {:client-id (str (:client_id row))
          :user (:owner_user_id row)}
         (when-let [description (:description row)] {:description description})
         (when-let [name (:name row)] {:name name})))))

  (delete-device! [this client-id]
    (j/delete! (:connection this) :devices ["client_id = ?" (Long/parseLong client-id)]))

  (set-device-password! [this client-id p]
    (let [pwd-hash (sc/encrypt p)]
      (j/update! (:connection this) :devices {:device_password_hash pwd-hash} ["client_id = ?" (Long/parseLong client-id)])))

  (allowed-device? [this client-id username pwd]
    (let [device (first (j/query (:connection this) ["SELECT * FROM devices WHERE client_id = ? AND owner_user_id = ? LIMIT 1;"
                                              (Long/valueOf client-id) username]))]
      (and device
           (:device_password_hash device)
           (sc/verify pwd (:device_password_hash device)))))

  (patch-device! [this client-id data]
    (j/update! (:connection this) :devices data ["client_id = ?" (Long/parseLong client-id)]))

  (subscriptions-by-owner [this user]
    (psql->clj (j/query (:connection this) ["SELECT * from subscriptions WHERE user_id = ?;" user])))

  (create-subscription [this user topic]
    (psql->clj (-> (first (j/insert! (:connection this) :subscriptions {:user_id user :topic topic})))))

  (unsubscribe [this user topic]
    (j/delete! (:connection this) :subscriptions ["user_id = ?" user]))

  (user-subscribed? [this user topic]
    (not (empty? (j/query (conn this) ["Select * from subscriptions where user_id = ? and topic = ?;" user topic]))))

  (all-topics [this]
    (j/query (conn this) ["Select * FROM topics;"]))

  (topic-of-owner [this user topic]
    (clj->psql (first
                (j/query (:connection this)
                         ["SELECT * FROM topics WHERE owner = ? AND topic = ? LIMIT 1;" user topic]))))

  (topics-by-owner [this user]
    (clj->psql (j/query (:connection this) ["SELECT * FROM topics WHERE owner = ?;" user])))

  (create-topic! [this topic]
    (let [s (extract-topic-name (:topic topic))
          t (clj->psql (merge {:public true} topic {:name s}))]
      (psql->clj (-> (j/insert! (:connection this) :topics t)
                     first
                     (dissoc :created_on)))))

  (maybe-create-topic! [this {:keys [topic owner]}]
    (let [name (extract-topic-name topic)]
      (j/execute! (:connection this)
                  ["INSERT INTO topics (name, topic, owner, public)
                    SELECT ?, ?, ?, true
                    WHERE NOT EXISTS (SELECT topic, owner FROM topics WHERE topic = ? AND owner = ?)",
                   name, topic, owner,
                   topic, owner])))

  (get-topic [this topic-id]
    (when-let [row
               (first (j/query (:connection this) ["SELECT * FROM topics WHERE topic = ?;" topic-id]))]
      (merge
       {:owner (:owner row)
        :topic (:topic row)
        :public (:public row)}
       (when-let [x (:description row)] {:description x})
       (when-let [x (:unit row)] {:unit x}))))

  (delete-topic! [this topic-id]
    (do
      (j/delete! (:connection this) :topics ["topic = ?" topic-id])
      (j/delete! (:connection this) :subscriptions ["user_id = ?" user])))

  (public-topics-by-owner [this user]
    (clj->psql (j/query (conn this) ["SELECT * FROM topics WHERE owner = ? and public = 't';" user])))

  (get-public-topic [this topic]
    (clj->psql (j/query (conn this) ["SELECT * FROM topics WHERE topic = ? and public = 't';" topic])))

  (patch-topic! [this topic-id data]
    (j/update! (:connection this) :topics data ["topic = ?" topic-id]))

  (get-api-key [this user]
    (first (j/query (:connection this) ["SELECT * FROM api_keys WHERE id = ?" user])))

  (delete-api-key! [this user]
    (j/delete! (:connection this) :api_keys ["id = ?" user]))

  (create-api-key! [this user]
    (let [api (str (java.util.UUID/randomUUID))]
      (j/insert! (:connection this) :api_keys {:id user :api api})))

  (find-user-by-api-key [this api-key]
    (:id (first (j/query (:connection this) ["SELECT users.id FROM users,api_keys WHERE users.id = api_keys.id AND api_keys.api = ?" api-key]))))

  ;; totp

  (get-ws-session-token [this user]
    (first (j/query (:connection this) ["SELECT * FROM ws_session_tokens WHERE user_id = ?" user])))

  (delete-ws-session-token [this user]
    (j/delete! (:connection this) :ws_session_tokens ["user_id = ?" user]))

  (create-ws-session-token [this user]
    (j/insert! (:connection this) :ws_session_tokens {:user_id user :token (str (java.util.UUID/randomUUID))}))

  (find-ws-session-by-token [this token]
    (first (j/query (:connection this) ["SELECT user_id from ws_session_tokens WHERE token = ?" token])))


  TotpStore
  (set-totp-encrypted-secret [this identity encrypted-secret]
    ;; TODO We'd have to use symmetric encryption to keep these safe
    (j/insert! (:connection this) :totp_secrets {:user_id identity :secret encrypted-secret}))

  (get-totp-encrypted-secret [this identity]
    (:secret (first (j/query (:connection this) ["SELECT secret from totp_secrets WHERE user_id = ?" identity]))))
  )

(defn new-database
  [opts]
  (->> opts
       (merge {:host "localhost"
               :port 5432})
       (s/validate {:host s/Str
                    :port s/Int
                    :dbname s/Str
                    :user s/Str
                    :password s/Str})
       map->Database))

;; Persistent token store to store temporary tokens that are used in web sessions.

(defn expiry-date
  "Calculate an expiry date in the future"
  [ttl-in-secs]
  (assert (pos? ttl-in-secs))
  (java.sql.Timestamp.
   (+ (.getTime (java.util.Date.))
      (* ttl-in-secs 1000))))

(defn now
  "Return now in milliseconds since the epoch"
  []
  (.getTime (java.util.Date.)))

(defn query-token [conn id]
  (let [token (first (j/query conn
                              ["SELECT * FROM tokens WHERE id = ?" id]))]
    (when token
      (merge (read-string (:content token))
             {:cylon/token-id (:id token)
              :cylon/expiry (java.util.Date. (.getTime (:expiry token)))}))))

(defrecord SqlBackedTokenStore [ttl-in-secs tokens token-type database]
  TokenStore
  (create-token! [component id m]
    (when (get-token-by-id component id)
      (throw (ex-info "Token id already used" {:id id})))
    (let [expiry (expiry-date ttl-in-secs)
          token (merge m
                       (when ttl-in-secs {:cylon/expiry expiry})
                       {:cylon/token-id id})]
      (j/insert! (:connection database)
                 :tokens {:id id
                          :expiry expiry
                          :content (pr-str m)
                          :type token-type})
      token))

  (get-token-by-id [component id]
    (let [token (query-token (:connection database) id)
          expiry (:cylon/expiry token)]
      (cond
       (nil? expiry) token
       (< (now) (.getTime expiry)) (renew-token! component id)
       :otherwise (purge-token! component id))))

  (purge-token! [_ id]
    (j/delete! (:connection database) :tokens ["id = ?" id])
    nil)

  (renew-token! [_ id]
    (j/update! (:connection database)
               :tokens {:expiry (expiry-date ttl-in-secs)}
               ["id = ?" id])
    ;; Return the renewed token
    (query-token (:connection database) id))

  (merge-token! [component id m]
    (when
        (and
         (contains? m :cylon/subject-identifier)
         (nil? (:cylon/subject-identifier m)))
      (throw (ex-info "Can't set :cylon/subject-identifier to nil!!!" {}))
      )
    (let [token (get-token-by-id component id)
          newtoken (merge token m)]
      (when token
        (j/update! (:connection database)
                   :tokens {:content (-> newtoken
                                         (dissoc :cylon/id :cylon/expiry)
                                         pr-str)}
                   ["id = ?" id])
        newtoken)))

  (dissoc-token! [component id ks]
    (let [token (get-token-by-id component id)
          newtoken (apply dissoc token ks)]
      (when token
        (j/update! (:connection database)
                   :tokens {:content (-> newtoken
                                         (dissoc :cylon/id :cylon/expiry)
                                         pr-str)}
                   ["id = ?" id])
        newtoken))))

(def new-sql-backed-token-store-schema
  ;; a ttl-in-secs of nil means 'do not expire'
  {:ttl-in-secs (s/maybe s/Num)
   :token-type s/Str})

(defn new-sql-backed-token-store [& {:as opts}]
  (->> opts
       ;; TODO: Would prefer to rename ttl-in-secs to ttl and require a
       ;; Joda time period.
       (merge {:ttl-in-secs (* 60 60 4)})
       (s/validate new-sql-backed-token-store-schema)
       map->SqlBackedTokenStore
       (<- (using [:database]))))
