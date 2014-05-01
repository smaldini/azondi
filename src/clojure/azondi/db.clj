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
  (patch-device! [_ client-id data])
  )
