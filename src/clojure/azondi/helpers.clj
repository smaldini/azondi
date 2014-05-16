(ns azondi.helpers
  (:require [clojure.walk :refer (postwalk)]))

(defn process-maps [fm t]
  (postwalk (fn [fm]
              (cond
               (map? fm) (reduce-kv (fn [acc k v] (assoc acc (t k) v)) {} fm)
               :otherwise fm)) fm))
