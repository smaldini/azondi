(ns azondi.reactor
  (:require [clojurewerkz.meltdown.reactor :as mr])
  (:import jig.Lifecycle))


(deftype Reactor [config]
  Lifecycle
  (init [_ system]
    system)
  (start [_ system]
    (let [id (:jig/id config)]
      (assoc-in system [id :reactor] (mr/create))))
  (stop [_ system]
    system))
