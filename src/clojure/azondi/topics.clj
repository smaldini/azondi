(ns azondi.topics
  (:require [azondi.db :as adb]
            [com.stuartsierra.component :as component]
            [clojurewerkz.meltdown.reactor :as mr]
            [clojurewerkz.meltdown.consumers :as mc]
            [clojurewerkz.meltdown.selectors :refer [$]]
            [clojure.core.cache :as cache]
            [clojure.java.jdbc :as j]))

(defn authorized-to-publish?
  [^String topic ^String username]
  (.startsWith topic (str "/users/" username "/")))

(defn exists-and-public?
  [db ^String username ^String topic]
  (let [rows (adb/topics-by-owner db username)
        m    (some (fn [m]
                     (when (= (:topic m) topic)
                       m))
                   rows)]
    (and m (:public m))))

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
          sub (mr/on r ($ "messages.inbound") (fn [{:keys [data]}]
                                                (maybe-insert-topic db lru data)))]
      (-> this
          (assoc :subscription sub
                 :cache        lru))))
  (stop [this]
    (let [sub (get this :subscription)]
      (mc/cancel sub)
      this)))

(defn new-topic-injector
  []
  (-> (TopicInjector.)
      (component/using [:reactor :database])))
