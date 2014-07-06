(ns azondi.config
  (:refer-clojure :exclude [read])
  (:require [clojure.java.io :as io]
            [clojure.tools.reader :refer (read)]
            [clojure.tools.reader.reader-types :refer (indexing-push-back-reader)]))


(defn ^:private read-file
  [f]
  (read
   ;; This indexing-push-back-reader gives better information if the
   ;; file is misconfigured.
   (indexing-push-back-reader
    (java.io.PushbackReader. (io/reader f)))))

(defn ^:private config-from
  [f]
  (if (.exists f)
    (read-file f)
    {}))

(defn user-config
  []
  (config-from (io/file (System/getProperty "user.home") ".azondi.edn")))

(defn config-from-classpath
  []
  (if-let [res (io/resource "azondi.edn")]
    (config-from (io/file res))
    {}))
