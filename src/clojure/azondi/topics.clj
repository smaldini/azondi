(ns azondi.topics
  (:require [azondi.db :as adb]))

(defn authorized-to-publish?
  [^String topic ^String username]
  (.startsWith topic (str "/users/" username "/")))

(defn exists-and-public?
  [db ^String username ^String topic]
  (let [rows (adb/topics-by-owner db username)
        m    (some (fn [m]
                     (when (= (:topic m) topic)
                       m))
                   rows)]
    (and m (:public m))))
