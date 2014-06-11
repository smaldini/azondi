(ns azondi.db
  (:require [com.stuartsierra.component :as component])
)

(defprotocol Datastore
  (create-user! [_ name user email pw])
  (get-users [_])
  (get-user [_ user])
  (delete-user! [_ user])
  (devices-by-owner [_ user])
  (create-device! [_ user pw])
  (get-device [_ client-id])
  (delete-device! [_ client-id])
  (set-device-password! [_ client-id p])
  (allowed-device? [_ client-id user p])
  ;;topics
  (topic-of-owner [_ user topic])
  (topics-by-owner [_ user])
  (create-topic! [_ topic])
  (maybe-create-topic! [_ topic])
  (get-topic [_ topic-id])
  (delete-topic! [_ topic-id])
  (patch-device! [_ client-id data])
  (patch-topic! [_ topic-id data])
  ;;api
  (get-api-key [_ user])
  (delete-api-key [_ user])
  (create-api-key [_ user])
  )
