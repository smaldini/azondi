(ns azondi.main
  (:gen-class))

;; This is the main entry point for production. 'lein run' and 'java -jar uberjar'.

(defn -main [& args]
  ;; We eval so that we don't AOT anything beyond this class
  (eval '(do (require 'azondi.system)
             (require 'com.stuartsierra.component)
             (com.stuartsierra.component/start (azondi.system/new-system))
             (println "Azondi - high-performance MQTT broker")
             (println "Copyright © 2014 OpenSensors.IO Ltd.")
             (println "Ready..."))))
