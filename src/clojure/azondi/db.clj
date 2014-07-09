(ns azondi.db
  (:require
   [azondi.db.protocol :as p]
   [schema.core :as s]))


;; We dispatch on the protocol via these wrappers which allow us to add
;; schema validation

(s/defn create-user!
  [component :- (s/protocol p/Datastore)
   name user email pw]
  (p/create-user! component name user email pw))

(s/defn get-users :- [{:user s/Str}]
  [component :- (s/protocol p/Datastore)]
  (p/get-users component))

(s/defn get-user :- (s/maybe {:user s/Str
                              :name s/Str
                              :email s/Str
                              :password s/Str})
  [component :- (s/protocol p/Datastore)
   user]
  (p/get-user component user))

(s/defn delete-user!
  [component :- (s/protocol p/Datastore)
   user]
  (p/delete-user! component user))

(s/defn reset-user-password
  [component :- (s/protocol p/Datastore)
   user
   password]
  (p/reset-user-password component user password))

(s/defn devices-by-owner
  [component :- (s/protocol p/Datastore)
   user]
  (p/devices-by-owner component user))

(s/defn create-device!
  [component :- (s/protocol p/Datastore)
   user pw]
  (p/create-device! component user pw))

(s/defn get-device :- (s/maybe {:client-id s/Str
                                :user s/Str
                                (s/optional-key :name) s/Str
                                (s/optional-key :description) s/Str})
  [component :- (s/protocol p/Datastore)
   client-id :- s/Str]
  (p/get-device component client-id))

(s/defn delete-device!
  [component :- (s/protocol p/Datastore)
   client-id :- s/Str]
  (p/delete-device! component client-id))

(s/defn set-device-password!
  [component :- (s/protocol p/Datastore)
   client-id :- s/Str
   p :- s/Str]
  (p/set-device-password! component client-id p))

(s/defn allowed-device?
  [component :- (s/protocol p/Datastore)
   client-id :- s/Str
   user
   p]
  (p/allowed-device? component client-id user p))

(s/defn topic-of-owner
  [component :- (s/protocol p/Datastore)
   user
   topic]
  (p/topic-of-owner component user topic))

(s/defn topics-by-owner
  [component :- (s/protocol p/Datastore)
   user]
  (p/topics-by-owner component user))

(s/defn create-topic!
  [component :- (s/protocol p/Datastore)
   topic]
  (p/create-topic! component topic))

(s/defn maybe-create-topic!
  [component :- (s/protocol p/Datastore)
   topic]
  (p/maybe-create-topic! component topic))

(s/defn get-topic
  [component :- (s/protocol p/Datastore)
   topic-id]
  (p/get-topic component topic-id))

(s/defn delete-topic!
  [component :- (s/protocol p/Datastore)
   topic-id]
  (p/delete-topic! component topic-id))

(s/defn patch-device!
  [component :- (s/protocol p/Datastore)
   client-id :- s/Str
   data]
  (p/patch-device! component client-id data))

(s/defn patch-topic!
  [component :- (s/protocol p/Datastore)
   topic-id :- s/Str
   data]
  (p/patch-topic! component topic-id data))

(s/defn subscriptions-by-owner
  [component :- (s/protocol p/Datastore)
   user]
  (p/subscriptions-by-owner component user))

(s/defn create-subscription
  [component :- (s/protocol p/Datastore)
   user
   topic]
  (p/create-subscription component user topic))

(s/defn unsubscribe
  [component :- (s/protocol p/Datastore)
   user
   topic]
  (p/unsubscribe component user topic))

(s/defn get-api-key :- {:id s/Str
                        :created_on s/Inst
                        :api s/Str}
  [component :- (s/protocol p/Datastore)
   user :- s/Str]
  (p/get-api-key component user))

(s/defn delete-api-key
  [component :- (s/protocol p/Datastore)
   user]
  (p/delete-api-key component user))

(s/defn create-api-key
  [component :- (s/protocol p/Datastore)
   user]
  (p/create-api-key component user))

(s/defn find-user-by-api-key
  [component :- (s/protocol p/Datastore)
   api-key :- s/Str]
  (p/find-user-by-api-key component api-key))
