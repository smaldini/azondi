(ns azondi.authentication
  (:require [clojurewerkz.scrypt.core :as sc]
            [com.stuartsierra.component :as component]
            [taoensso.timbre :refer [debugf infof warnf errorf]]
            [clojure.java.jdbc :as j]))

(defprotocol DeviceAuthenticator
  (allowed-device? [_ client-id owner password]))

(defrecord PostgresAuthenticator []
  component/Lifecycle
  (start [this] this)
  (stop  [this] this)

  DeviceAuthenticator
  (allowed-device? [this client-id owner password]
    (if-let [device (first (j/query (get-in this [:postgres :connection])
                                    ["SELECT * FROM devices WHERE client_id = ? AND owner = ? LIMIT 1" client-id owner]))]
      (sc/verify password (:device_password_hash device))
      false)))

(defn new-postgres-authenticator
  [opts]
  (component/using (PostgresAuthenticator.) [:postgres]))
