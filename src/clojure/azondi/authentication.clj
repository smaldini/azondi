(ns azondi.authentication
  (:require [clojurewerkz.cassaforte.client :as c]
            [clojurewerkz.cassaforte.cql :refer :all]
            [clojurewerkz.cassaforte.query :refer :all]
            [clojurewerkz.scrypt.core :as sc]
            [com.stuartsierra.component :as component]
            [taoensso.timbre :as log]
            [schema.core :as s]
            [cylon.core :refer (new-user-domain
                                new-password-file
                                NewUserCreator add-user!
                                UserAuthenticator allowed-user?)]
            [clojure.java.jdbc :as j]))

(defprotocol DeviceAuthenticator
  (allowed-device? [_ client-id owner password]))

(defrecord ProtectionSystem []
  component/Lifecycle
  (start [this] (component/start-system this (keys this)))
  (stop [this] (component/stop-system this (keys this)))

  DeviceAuthenticator
  (allowed-device? [this client-id owner password]
    (allowed-device? (:device-authenticator this) client-id owner password))

  NewUserCreator
  (add-user! [this uid pw]
    (if (satisfies? NewUserCreator (:user-authenticator this))
      (add-user! (:user-authenticator this) uid pw)
      (throw (ex-info "This protection system implementation does not support the creation of new users"
                      {:user-authenticator (:user-authenticator this)})))))


;; We can create 2 different types of protection system. One uses a
;; local password store, the other uses Cassandra.

(def new-local-protection-system-schema
  {:password-file s/Any})

(defn new-local-protection-system [& {:as opts}]
  (s/validate new-local-protection-system-schema opts)
  (map->ProtectionSystem
   {:user-authenticator (component/using (new-user-domain) [:password-store])
    :password-store (new-password-file (:password-file opts))}))

;; Cassandra

(defrecord CassandraAuthenticator []
  UserAuthenticator
  (allowed-user? [this email password]
    (if-let [user (first (c/with-consistency-level :quorum
                            (select "users"
                                    (where :email email)
                                    (limit 1))))]
      (sc/verify password (:pword user))
      false))

  ;; TODO Satisfy NewUserCreator to add users to Cassandra
  )

(defn new-cassandra-authenticator []
  (->CassandraAuthenticator))

(defn new-cassandra-protection-system [& {:as opts}]
  (map->ProtectionSystem
   {:user-authenticator (new-cassandra-authenticator)}))

;; Postgres

(defrecord PostgresAuthenticator [host port dbname user password]
  component/Lifecycle
  (start [this]
    (assoc this :db
           {:subprotocol "postgresql"
            :classname "org.postgresql.Driver"
            :subname (format "//%s:%d/%s")
            :user user
            :password password}))
  (stop [this] this)

  DeviceAuthenticator
  (allowed-device? [this client-id owner password]
    (log/infof "allowed device? %s %s" client-id owner password)

    (log/infof (keys (j/query (:db this)
                        ["select * from devices where client_id = ? limit 1" client-id]
                        )))
      false)))

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

(defn new-postgres-protection-system [& {:as opts}]
  (map->ProtectionSystem
   {:device-authenticator (apply new-postgres-authenticator (apply concat (seq opts)))}))
