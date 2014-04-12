(ns azondi.main
  "Main entry point"
  (:require [com.stuartsierra.component :as component])
  (:gen-class))

(defn -main [& args]
  ;; We eval so that we don't AOT anything beyond this class
  (eval '(do (require 'azondi.system)
             (require 'com.stuartsierra.component)
             ;; TODO: Get from arguments
             (component/start (azondi.system/new-prod-system))
             (println "Azondi: sensor information ingestion system")
             (println "Copyright © 2014 OpenSensors.IO Ltd.")
             (println "Ready..."))))
