(ns azondi.main
  "Main entry point"
  (:gen-class))

(defn -main [& args]
  ;; We eval so that we don't AOT anything beyond this class
  (eval '(do (require 'azondi.system)
             (require 'com.stuartsierra.component)
             ;; TODO: Get from arguments
             (com.stuartsierra.component/start (azondi.system/new-prod-system))
             (println "Azondi: sensor information ingestion system")
             (println "Copyright © 2014 OpenSensors.IO Ltd.")
             (println "Ready..."))))
