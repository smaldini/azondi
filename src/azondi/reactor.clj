(ns azondi.reactor
  (:require [clojurewerkz.meltdown.reactor :as mr])
  (:import jig.Lifecycle))


(deftype Reactor [config]
  Lifecycle
  (init [_ system]
    (let [id (:jig/id config)]
      (-> system
          (assoc-in [id :reactor] (mr/create)))))
  (start [_ system]
    system)
  (stop [_ system]
    system))
