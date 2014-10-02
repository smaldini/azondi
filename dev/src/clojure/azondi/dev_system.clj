(ns azondi.dev-system
  (:require
   [clojure.java.io :as io]
   [clojure.tools.logging :refer :all]
   [com.stuartsierra.component :as component]
   [azondi.cassandra :as cass]
   [azondi.db :as db]
   [azondi.db.protocol :refer (DataStore)]
   [azondi.messages :refer (new-message-archiver)]
   [azondi.passwords :as pwd]
   [azondi.postgres :refer (new-database)]
   [azondi.simulator :refer (new-simulator)]
   [azondi.system :refer (config configurable-system-map new-prod-system)]
   [azondi.stub-emailer :refer (new-stub-emailer)]
   [cylon.totp :refer (OneTimePasswordStore)]
   ))

(def mod-defs
  {:system-mods
   {:-em ; no email, just display the info in the log
    (fn [config]
      (fn [system-map]
        (-> system-map
            (assoc :emailer (new-stub-emailer)))))

    :+s
    (fn [config]
      (fn [system-map]
        (assoc system-map
          :simulator (-> (apply new-simulator (apply concat (:simulator config)))
                         (component/using [:mqtt-server])))))

    :-c*
    (fn [config]
      (fn [system-map]
        (assoc system-map
          :cassandra (reify component/Lifecycle
                       (start [c] c)
                       (stop [c] c)))))

    :messaging
    (fn [config]
      (fn [system-map]
        (-> system-map
            (assoc :database (new-database (get system-map :postgres)))
            (dissoc :webapp :webrouter :webserver
                    :api :sse :login-form :cljs-core
                    :cljs-main :main-cljs-builder
                    :session-authenticator :apikey-authenticator
                    :authenticator :authorizer :session-store))))}

   :dependency-mods
   {:messaging
    (fn [config]
      (fn [dependency-map]
        (dissoc dependency-map :main-cljs-builder :webserver :webrouter)))}})

(defn new-dev-system
  "Create a development system"
  [env]
  (let [config (config)]
    (component/system-using
     ((apply comp
             (map #(% config) (remove nil? (for [mod env] (get-in mod-defs [:system-mods mod])))))
      (configurable-system-map config))
     ((apply comp
             (map #(% config) (remove nil? (for [mod env] (get-in mod-defs [:dependency-mods mod])))))
      {} ; explicit dependency map
      ))))
