(ns dev
  (:require
   [clojure.pprint :refer (pprint)]
   [clojure.reflect :refer (reflect)]
   [clojure.repl :refer (apropos dir doc find-doc pst source)]
   [com.stuartsierra.component :as component]
   [clojure.tools.namespace.repl :refer (refresh refresh-all)]
   [azondi.dev-system :refer (new-dev-system)]
;;   [cylon.user :as user]
   [clojure.tools.logging :refer (infof)]
   env
   ))

(def system nil)

(defn init
  "Constructs the current development system."
  []
  (alter-var-root #'system
                  (constantly (new-dev-system env/env)
     )))

(defn start
  "Starts the current development system."
  []
  (alter-var-root #'system component/start))

(defn stop
  "Shuts down and destroys the current development system."
  []
  (alter-var-root #'system
                  (fn [s] (when s (component/stop s)))))

(defn go
  "Initializes the current development system and starts it running."
  []
  (init)
  (start))

(defn reset []
  (stop)
  (refresh :after 'dev/go))

(defn set-env! [env]
  (alter-var-root #'env/env (constantly env)))

#_(defn add-user! [user password]
  (user/add-user!
   (-> system :protection-domain)
   user password))
