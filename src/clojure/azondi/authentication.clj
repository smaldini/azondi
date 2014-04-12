(ns azondi.authentication
  (:require [clojurewerkz.scrypt.core :as sc]
            [com.stuartsierra.component :as component]
            [schema.core :as s]
            [taoensso.timbre :refer [debugf infof warnf errorf]]
            [clojure.java.jdbc :as j]))

(defprotocol DeviceAuthenticator
  (allowed-device? [_ client-id owner password]))

(defrecord PostgresAuthenticator [host port dbname user password]
  component/Lifecycle
  (start [this]
    (assoc this :db
           {:subprotocol "postgresql"
            :classname "org.postgresql.Driver"
            :subname (format "//%s:%d/%s" host port dbname)
            :user user
            :password password}))
  (stop [this] this)

  DeviceAuthenticator
  (allowed-device? [this client-id owner password]
    (when-let [device
               (first (j/query (:db this)
                               ["select * from devices where client_id = ? limit 1" client-id]))]
      (and (= (:owner device) owner) (= (:device_password device) password)))))

(defn new-postgres-authenticator
  [opts]
  (->> opts
       (merge {:host "localhost"
               :port 5432})
       (s/validate {:host s/Str
                    :port s/Int
                    :dbname s/Str
                    :user s/Str
                    :password s/Str})
       map->PostgresAuthenticator))
