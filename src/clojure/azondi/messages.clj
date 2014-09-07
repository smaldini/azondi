(ns azondi.messages
  "Stores messages for time series charting and analysis"
  (:require [azondi.messages-db :refer (archive-message!)]
            [clojurewerkz.meltdown.reactor :as mr]
            [clojurewerkz.meltdown.consumers :as mc]
            [clojurewerkz.meltdown.selectors :refer [$]]
            [com.stuartsierra.component :as component]
            [azondi.reactor.keys :as rk]))

(defrecord MessageArchiver []
  component/Lifecycle
  (start [this]
    (let [r   (get-in this [:reactor :reactor])
          sub (mr/on r ($ rk/message-published)
                     (fn [{:keys [data]}]
                       (archive-message! (:cassandra this) data)))]
     ;; (debugf "archiving data %s" data)
      (-> this
          (assoc :subscription sub))))
  (stop [this]
    (let [sub (get this :subscription)]
      (mc/cancel sub)
      this)))

(defn new-message-archiver
  []
  (-> (MessageArchiver.)
      (component/using [:reactor :cassandra])))
