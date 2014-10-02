(ns azondi.api-utils
  (:require
   [clojure.walk :refer (postwalk)]
   [camel-snake-kebab :refer (->kebab-case-keyword ->camelCaseString)]))


(defn process-maps [fm t]
  (postwalk (fn [fm]
              (cond
               (map? fm) (reduce-kv (fn [acc k v] (assoc acc (t k) v)) {} fm)
               :otherwise fm)) fm))

(defn ->clj
  "Convert JSON keys into Clojure keywords. This is because we receive
  JSON but want to process it as Clojure."
  [fm]
  (process-maps fm ->kebab-case-keyword))

(defn ->js
  "Convert Clojure keywords into JSON keys. This is because we respond
  with JSON."
  [fm]
  (process-maps fm ->camelCaseString))
