(ns azondi.api
  (:require
   [com.stuartsierra.component :as component]
   [schema.core :as s]
   [modular.bidi :refer (BidiRoutesProvider)]))

(defrecord EntityView [context]
  component/Lifecycle
  (start [this]
    (assoc this
      :index (fn [req] {:status 200 :body "Hello Yodit!"})))
  (stop [this] this)

  BidiRoutesProvider
  (routes [this]
    ["/" {"hello"  (:index this)
          "goodbye" (fn [req] {:status 200 :body "Goodbye!"})}])
  (context [this] context))

(defn new-entity-view [& {:as opts}]
  (->> opts
       (merge {:context ""}) ; specify defaults
       (s/validate {(s/optional-key :context) s/Str})
       map->EntityView))
