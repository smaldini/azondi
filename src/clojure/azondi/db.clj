(ns azondi.db
  (:require
   [azondi.db.protocol :as p]
   [cylon.totp :as t :refer (OneTimePasswordStore set-totp-secret get-totp-secret)]
   [schema.core :as s]))

;; Convenience schema
(def StrNotEmpty (s/both s/Str (s/pred not-empty)))

;; We dispatch on the protocol via these wrappers which allow us to add
;; schema validation

(s/defn get-users :- [{:user s/Str
                       :name s/Str
                       :email s/Str
                       }]
  [component :- (s/protocol p/DataStore)]
  (p/get-users component))

(s/defn devices-by-owner
  [component :- (s/protocol p/DataStore)
   user]
  (p/devices-by-owner component user))

(s/defn create-device!
  [component :- (s/protocol p/DataStore)
   user pw]
  (p/create-device! component user pw))

(s/defn get-device :- (s/maybe {:client-id StrNotEmpty
                                :user s/Str
                                (s/optional-key :name) s/Str
                                (s/optional-key :description) s/Str})
  [component :- (s/protocol p/DataStore)
   client-id :- StrNotEmpty]
  (p/get-device component client-id))

(s/defn delete-device!
  [component :- (s/protocol p/DataStore)
   client-id :- StrNotEmpty]
  (p/delete-device! component client-id))

(s/defn set-device-password!
  [component :- (s/protocol p/DataStore)
   client-id :- StrNotEmpty
   p :- s/Str]
  (p/set-device-password! component client-id p))

(s/defn allowed-device?
  [component :- (s/protocol p/DataStore)
   client-id :- StrNotEmpty
   user
   p]
  (p/allowed-device? component client-id user p))

(s/defn all-topics
  [component :- (s/protocol p/DataStore)]
  (p/all-topics component))

(s/defn topic-of-owner
  [component :- (s/protocol p/DataStore)
   user
   topic]
  (p/topic-of-owner component user topic))

(s/defn topics-by-owner
  [component :- (s/protocol p/DataStore)
   user]
  (p/topics-by-owner component user))

(s/defn create-topic!
  [component :- (s/protocol p/DataStore)
   topic :- {:topic s/Str
             :owner s/Str
             :public s/Bool
             (s/optional-key :unit) s/Str
             (s/optional-key :description) s/Str
             }]
  (p/create-topic! component topic))

(s/defn maybe-create-topic!
  [component :- (s/protocol p/DataStore)
   topic]
  (p/maybe-create-topic! component topic))

(s/defn get-topic :- (s/maybe {:owner s/Str
                               :topic s/Str
                               :public s/Bool
                               (s/optional-key :description) s/Str
                               (s/optional-key :unit) s/Str})
  [component :- (s/protocol p/DataStore)
   topic-id :- s/Str]
  (p/get-topic component topic-id))

(s/defn delete-topic!
  [component :- (s/protocol p/DataStore)
   topic-id]
  (p/delete-topic! component topic-id))

(s/defn public-topics-by-owner
  [component :- (s/protocol p/DataStore)
   user]
  (p/public-topics-by-owner component user))

(s/defn get-public-topic
  [component :- (s/protocol p/DataStore)
   topic :- s/Str]
  (p/get-public-topic component topic))

(s/defn patch-device!
  [component :- (s/protocol p/DataStore)
   client-id :- StrNotEmpty
   data]
  (p/patch-device! component client-id data))

(s/defn patch-topic!
  [component :- (s/protocol p/DataStore)
   topic-id :- s/Str
   data]
  (p/patch-topic! component topic-id data))

(s/defn subscriptions-by-owner
  [component :- (s/protocol p/DataStore)
   user]
  (p/subscriptions-by-owner component user))

(s/defn create-subscription
  [component :- (s/protocol p/DataStore)
   user
   topic]
  (p/create-subscription component user topic))

(s/defn unsubscribe
  [component :- (s/protocol p/DataStore)
   user
   topic]
  (p/unsubscribe component user topic))

(s/defn user-subscribed?
  [component :- (s/protocol p/DataStore)
   user
   topic]
  (p/user-subscribed? component user topic))

(s/defn get-api-key :- (s/maybe {:id s/Str
                                 :created_on s/Inst
                                 :api s/Str})
  [component :- (s/protocol p/DataStore)
   user :- s/Str]
  (p/get-api-key component user))

(s/defn delete-api-key!
  [component :- (s/protocol p/DataStore)
   user]
  (p/delete-api-key! component user))

(s/defn create-api-key!
  [component :- (s/protocol p/DataStore)
   user]
  (p/create-api-key! component user))

(s/defn find-user-by-api-key
  [component :- (s/protocol p/DataStore)
   api-key :- s/Str]
  (p/find-user-by-api-key component api-key))

(s/defn get-ws-session-token
   [component :- (s/protocol p/DataStore)
    user :- s/Str]
   (p/get-ws-session-token component user))

(s/defn delete-ws-session-token
  [component :- (s/protocol p/DataStore)
   user]
  (p/delete-ws-session-token component user))

(s/defn create-ws-session-token
  [component :- (s/protocol p/DataStore)
   user]
  (p/create-ws-session-token component user))

(s/defn find-ws-session-by-token
  [component :- (s/protocol p/DataStore)
   token :- s/Str]
  (p/find-ws-session-by-token component token))

(s/defn set-totp-encrypted-secret
  [component :- (s/protocol t/OneTimePasswordStore)
   identity :- s/Str
   secret :- s/Str]
  (t/set-totp-secret component identity secret))

(s/defn get-totp-encrypted-secret [component identity]
  (t/get-totp-secret component identity))
