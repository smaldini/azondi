(ns azondi.dev-system
  (:require
   [com.stuartsierra.component :as component]
   [azondi.system :refer (new-system)]
   [modular.core :refer (new-system-from-definition)]))

(defn new-dev-system []
  "Create a development system"
  ;; Right now it's the same as the production system
  (new-system))
