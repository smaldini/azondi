(ns azondi.db.protocol)

(defprotocol Datastore
  (create-user! [_ name user email pw])
  (get-users [_])
  (get-user [_ user])
  (delete-user! [_ user])
  (reset-user-password [_ user password])
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
  ;;subscriptions
  (subscriptions-by-owner [_ user])
  (create-subscription [_ user topic])
  (unsubscribe [_ user topic])
  ;;api
  (get-api-key [_ user])
  (delete-api-key [_ user])
  (create-api-key [_ user])
  (find-user-by-api-key [_ api-key])
  ;;ws
  (get-ws-session-token [_ user])
  (delete-ws-session-token [_ user])
  (create-ws-session-token [_ user])
  (find-ws-session-by-token [_ token]))
  )


(defprotocol Messagestore
  (messages-by-owner [_ owner])
  (messages-by-device [_ device-id])
  (messages-by-topic [_ topic])
  (archive-message! [_ data])
  ;; messages by date??
  )
