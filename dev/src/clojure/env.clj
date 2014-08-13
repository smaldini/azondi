(require 'clojure.tools.namespace.repl)

(ns ^{:clojure.tools.namespace.repl/load false
      :clojure.tools.namespace.repl/unload false}
  env)

(def env #{})

(println "Welcome developer!")
(println "Please (set-env! <env>) if you don't want the default configuration")
