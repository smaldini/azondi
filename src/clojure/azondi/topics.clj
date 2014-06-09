(ns azondi.topics
  (:require [azondi.db :as adb]
            [com.stuartsierra.component :as component]
            [clojurewerkz.meltdown.reactor :as mr]
            [clojurewerkz.meltdown.consumers :as mc]
            [clojurewerkz.meltdown.selectors :refer [$]]
            [clojure.core.cache :as cache]
            [clojure.java.jdbc :as j]
            [azondi.reactor.keys :as rk]))

(defn ^:private has-user-prefix?
  [^String topic ^String username]
  (.startsWith topic (str "/users/" username "/")))

(defn exists-and-public?
  [db ^String username ^String topic]
  (let [m (adb/topic-of-owner db username topic)]
    (and m (:public m))))

(defn authorized-to-publish?
  [^String topic ^String username]
  (has-user-prefix? topic username))

(defn authorized-to-subscribe?
  [db ^String topic ^String username]
  (let [m (adb/topic-of-owner db username topic)]
    ;; topic is missing or exists
    ;; and is either public or private + owned
    (or (nil? m)
        (or (:public m)
            (and (not (:public m))) (has-user-prefix? topic username)))))

(def ^:const lru-cache-size 4096)

;;
;; Automatic Topic Insertion
;;

(defn maybe-insert-topic
  [db lru {:keys [topic owner] :as t}]
  (let [key  (str owner ":" topic)]
    (if (cache/has? @lru topic)
      (swap! lru (fn [c]
                   (cache/hit c topic)))
      (let [res (swap! lru (fn [c]
                             (cache/miss c topic true)))]
        (adb/maybe-create-topic! db {:topic topic
                                     :owner owner})
        res))))

(defrecord TopicInjector []
  component/Lifecycle
  (start [this]
    (let [r   (get-in this [:reactor :reactor])
          db  (get    this :database)
          lru (atom (cache/lru-cache-factory {} :threshold lru-cache-size))
          f   (fn [{:keys [data]}]
                (maybe-insert-topic db lru data))
          sub1 (mr/on r ($ rk/message-published)   f)
          sub2 (mr/on r ($ rk/consumer-subscribed) f)]
      (-> this
          (assoc :subscriptions [sub1 sub2]
                 :cache         lru))))
  (stop [this]
    (let [subs (get this :subscriptions)]
      (doseq [sub subs]
        (mc/cancel sub))
      this)))

(defn new-topic-injector
  []
  (-> (TopicInjector.)
      (component/using [:reactor :database])))
