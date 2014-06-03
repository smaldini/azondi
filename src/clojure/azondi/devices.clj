(ns azondi.devices
  (:require [clojure.java.jdbc :as j]))

(defn device-names
  [conn ^String username]
  (map :name (j/query conn ["SELECT name FROM devices WHERE owner_user_id = ?" username])))
