(ns azondi.db
  (:require [com.stuartsierra.component :as component])
)

(defprotocol Datastore
  (create-user! [_ name user email pw])
  (get-users [_])
  (get-user [_ user])
  (delete-user! [_ user])
  (devices-by-owner [_ user])
  (create-device! [_ user pw data])
  (get-device [_ client-id])
  (delete-device! [_ client-id])
  ;;topics
  (topics-by-owner [_ user])
  (create-topic! [_ topic])
  (get-topic [_ topic-uuid])
  (delete-topic [_ topic-uuid])
  (patch-device! [_ client-id data]))

