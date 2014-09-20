(ns azondi.messages-db
  (:require
   [azondi.db.protocol :as p]

   [azondi.db :refer (StrNotEmpty)]
   [schema.core :as s]
   [byte-streams :refer (convert)])
  (:import   [org.joda.time DateTime]))



(defn payload>Str [p] (convert p String) )

(s/defn messages-by-owner [component :- (s/protocol p/MessageStore)
                           owner :- s/Str]
  (->> (p/messages-by-owner component owner)
       (map #(update-in % [:payload] payload>Str))))

(s/defn messages-by-owner-and-date [component :- (s/protocol p/MessageStore)
                                    owner :- s/Str
                                    start-date  :- DateTime
                                    end-date  :- DateTime]
  (->> (p/messages-by-owner-and-date component owner start-date end-date)
       (map #(update-in % [:payload] payload>Str))))


(s/defn messages-by-device [component :- (s/protocol p/MessageStore)
                            device-id :- s/Str]
  (->> (p/messages-by-device component device-id)
       (map #(update-in % [:payload] payload>Str))))

(s/defn messages-by-device-and-date [component :- (s/protocol p/MessageStore)
                                     device-id :- s/Str
                                     start-date  :- DateTime
                                     end-date  :- DateTime]
  (->> (p/messages-by-device-and-date component device-id start-date end-date)
       (map #(update-in % [:payload] payload>Str))))


(s/defn messages-by-topic [component :- (s/protocol p/MessageStore)
                           topic :- s/Str]
  (->> (p/messages-by-topic component topic)
       (map #(update-in % [:payload] payload>Str))))


(s/defn messages-by-topic-and-date [component :- (s/protocol p/MessageStore)
                                    topic :- s/Str
                                    start-date  :- DateTime
                                    end-date  :- DateTime]
  (->> (p/messages-by-topic-and-date component topic start-date end-date)
       (map #(update-in % [:payload] payload>Str))))



(s/defn messages-by-date [component :- (s/protocol p/MessageStore)
                          start-date  :- [s/Int]
                          end-date  :- [s/Int]]
  (->> (p/messages-by-date component start-date end-date)
       (map #(update-in % [:payload] payload>Str))))


(s/defn archive-message!
  [component :- (s/protocol p/MessageStore)
   data :- {:device_id StrNotEmpty
            :topic StrNotEmpty
            :owner StrNotEmpty
            :payload [Byte]
            :content_type s/Str}]
  (p/archive-message! component data))

(s/defn archive-summary!
  [component :- (s/protocol p/TopicSummaryStore)
   data :- {:data StrNotEmpty}]
  (p/archive-message! component data))
