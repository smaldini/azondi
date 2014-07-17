(ns azondi.messages-db
  (:require
   [azondi.db.protocol :as p]
   [azondi.db :refer (StrNotEmpty)]
   [schema.core :as s]
   [byte-streams :refer (convert)]))


(defn payload>Str [p] (convert p String) )

(s/defn messages-by-owner [component :- (s/protocol p/MessageStore)
                           owner :- s/Str]
  (->>(p/messages-by-owner component owner)
      (map #(update-in % [:payload] payload>Str))))

(s/defn messages-by-device [component :- (s/protocol p/MessageStore)
                            device-id :- s/Str]
  (->> (p/messages-by-device component device-id)
       (map #(update-in % [:payload] payload>Str))))

(s/defn messages-by-topic [component :- (s/protocol p/MessageStore)
                           topic :- s/Str]
  (->> (p/messages-by-topic component topic)
       (map #(update-in % [:payload] payload>Str))))

;; TODO  has payload  to be of bytes type?
(s/defn archive-message!
  [component :- (s/protocol p/MessageStore)
   data :- {:device_id StrNotEmpty
            :topic StrNotEmpty
            :owner StrNotEmpty
            :payload s/Any
            :content_type s/Str}]
  (p/archive-message! component data))
