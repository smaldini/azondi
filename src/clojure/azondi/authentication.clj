(ns azondi.authentication
  (:require [clojurewerkz.cassaforte.client :as c]
            [clojurewerkz.cassaforte.cql :refer :all]
            [clojurewerkz.cassaforte.query :refer :all]
            [clojurewerkz.scrypt.core :as sc]
            [com.stuartsierra.component :as component]
            [schema.core :as s]
            [taoensso.timbre :refer [log  trace  debug  info  warn  error  fatal
                                     logf tracef debugf infof warnf errorf fatalf]]
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
             (j/query (:db this)
                ;; TODO We shouldn't have to parse this to a long...
                ["select * from devices where client_id = ? limit 1" (Long/parseLong client-id)]
                )]
      (infof "Device is %s" device))))

(defn new-postgres-authenticator [& {:as opts}]
  (->> opts
       (merge {:host "localhost"
               :port 5432})
       (s/validate {:host s/Str
                    :port s/Int
                    :dbname s/Str
                    :user s/Str
                    :password s/Str})
       map->PostgresAuthenticator))
