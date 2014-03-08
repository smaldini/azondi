(ns azondi.index)

(enable-console-print!)

(defn foo [greeting]
  (if greeting
    (str greeting "ClojureScript!")
    (str "Hello, ClojureScript!")))

(.write js/document (foo "Welcome to "))

(println "Console logging test")
