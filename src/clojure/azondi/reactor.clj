(ns azondi.reactor
  (:require
   [com.stuartsierra.component :as component]
   [clojurewerkz.meltdown.reactor :as mr]))

(defrecord Reactor []
  component/Lifecycle
  (start [this]
    (assoc-in this :reactor (mr/create)))
  (stop [this] this))

(defn new-reactor []
  (->Reactor))
