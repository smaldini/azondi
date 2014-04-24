(ns azondi.authentication
  (:require
   [com.stuartsierra.component :as component]
   [taoensso.timbre :refer [debugf infof warnf errorf]]
   ))

(defprotocol DeviceAuthenticator
  (allowed-device? [_ client-id owner password]))

(defrecord PostgresAuthenticator []
  component/Lifecycle
  (start [this] this)
  (stop  [this] this)

  DeviceAuthenticator
  (allowed-device? [this client-id owner password]
    true))

(defn new-postgres-authenticator
  [opts]
  (component/using (PostgresAuthenticator.) [:postgres]))
