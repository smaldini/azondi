(ns azondi.system
  (:refer-clojure :exclude (read))
  (:require
   [com.stuartsierra.component :as component :refer (system-map system-using)]
   [clojure.java.io :as io]
   [clojure.tools.reader :refer (read)]
   [clojure.tools.reader.reader-types :refer (indexing-push-back-reader)]))


(defn config
  "Return a map of the static configuration used in the component
  constructors."
  []
  ;; In the future, dynamic configurators will be available, such as
  ;; juxt/stoic. Here, we simply use a local file in the user's home
  ;; directory.
  (let [f (io/file (System/getProperty "user.home") ".azondi.edn")]
    (if (.exists f)
      (read
       ;; This indexing-push-back-reader gives better information if the
       ;; file is misconfigured.
       (indexing-push-back-reader
        (java.io.PushbackReader. (io/reader f))))
      ;; If the file isn't there, we assume defaults.
      {})))

(defn configurable-system-map [config]
  (system-map
   ;; We create the system map by calling a constructor for each
   ;; component.
   :mqtt-decoder (new-mqtt-decoder)
   :mqtt-encoder (new-mqtt-encoder)
   :mqtt-handler (new-netty-mqtt-handler)
   :mqtt-server  (new-netty-server)
   :reactor (new-reactor)
   :ws (new-websocket-bridge)
   :database (new-database)
   :database-seed (new-database-seed)))

(defn new-dependency-map []
  {:mqtt-server [:mqtt-decoder :mqtt-encoder :mqtt-handler :reactor]
   :database-seed [:database]})

(defn new-system []
  (system-using
   (configurable-system-map (config))
   (new-dependency-map)))
