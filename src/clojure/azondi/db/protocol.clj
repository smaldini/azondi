(ns azondi.db.protocol)

(defprotocol DataStore
  (get-users [_])
  (delete-user! [_ user])

  (devices-by-owner [_ user])
  (create-device! [_ user pw])
  (get-device [_ client-id])
  (delete-device! [_ client-id])
  (set-device-password! [_ client-id p])
  (allowed-device? [_ client-id user p])
  ;;topics
  (all-topics [_])
  (topic-of-owner [_ user topic])
  (topics-by-owner [_ user])
  (create-topic! [_ topic])
  (maybe-create-topic! [_ topic])
  (get-topic [_ topic-id])
  (delete-topic! [_ topic-id])
  (patch-device! [_ client-id data])
  (patch-topic! [_ topic-id data])
  (public-topics-by-owner [_ user])
  (get-public-topic [_ topic])

  ;;subscriptions
  (subscriptions-by-owner [_ user])
  (create-subscription [_ user topic])
  (unsubscribe [_ user topic])
  (user-subscribed? [_ user topic])
  ;;api
  (get-api-key [_ user])
  (delete-api-key! [_ user])
  (create-api-key! [_ user])
  (find-user-by-api-key [_ api-key])
  ;;ws
  (get-ws-session-token [_ user])
  (delete-ws-session-token [_ user])
  (create-ws-session-token [_ user])
  (find-ws-session-by-token [_ token]))

(defprotocol MessageStore
  ;; star-date and end-date are vector with date fields
  ;; example: [2013 8 8] => represents 2013 8th August
  ;; example: [2013 8 8 12 30] => represents 2013 8th August at 12:30

  (messages-by-owner [_ owner])
  (messages-by-owner-and-date [_ owner start-date end-date])
  (messages-by-device [_ device-id])
  (messages-by-device-and-date [_ device start-date end-date])
  (messages-by-topic [_ topic])
  (messages-by-topic-and-date [_ topic start-date end-date])
  (messages-by-date [_ start-date end-date])
  (archive-message! [_ data]))

(defprotocol TopicSummaryStore
  (archive-summary! [_ data]))

(defprotocol TotpStore
  (set-totp-encrypted-secret [_ id secret])
  (get-totp-encrypted-secret [_ id]))
