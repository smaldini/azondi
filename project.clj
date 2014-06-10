(defproject azondi "0.1.0-SNAPSHOT"
  :description "Azondi helps you make sense of sensors data"
  :url "http://github.com/opensensorsio/azondi"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :source-paths ["src/clojure" "ext/clojure"]
  :resource-paths ["resources"]

  :dependencies [[org.clojure/clojure "1.6.0"]

                 ;; Assembly
                 [com.stuartsierra/component "0.2.1"]

                 ;; Front end
                 [org.clojure/clojurescript "0.0-2138"
                  :exclusions [org.apache.ant/ant]]

                 ;; Back-end
                 [clojurewerkz/triennium  "1.0.0-beta2"]
                 [cheshire                "5.3.1"]
                 [clojurewerkz/meltdown   "1.0.0"]
                 [org.clojure/core.cache  "0.6.3"]

                 ;; Database
                 [org.clojure/java.jdbc "0.3.3"]
                 [postgresql/postgresql "8.4-702.jdbc4"]
                 [clojurewerkz/cassaforte "2.0.0-beta1"]

                 ;; Metrics
                 [metrics-clojure         "2.0.4"]
                 [metrics-clojure-ring    "2.0.4"]

                 ;; for query string parsing
                 ;;[javax.servlet/servlet-api "2.5"]
                 [clj-time "0.7.0"]
                 [liberator "0.11.0" :exclusions [org.clojure/tools.logging]]
                 [prismatic/schema "0.2.1"]
                 [clojurewerkz/scrypt     "1.1.0"]

                 ;; Pre-built components supplied by modular

                 [juxt.modular/cljs "0.4.0-SNAPSHOT"]
                 [juxt.modular/mqtt "0.1.0-SNAPSHOT"]
                 [juxt.modular/netty "0.1.0-SNAPSHOT"]


                 [bidi "1.10.3"]
                 [hiccup "1.0.5"]
                 [garden "1.1.5"]
                 [compojure "1.1.8"]
                 [markdown-clj "0.9.36"]

                 [cylon "0.2.0-SNAPSHOT"]
                 [http-kit "2.1.16"]
                 

                 ;; Logging

                 ;; I tried but couldn't get timbre to talk to
                 ;;.logging - plus I don't know how its global
                 ;; atom plays with component
                 [org.clojure/tools.logging "0.2.6"]
                 [ch.qos.logback/logback-classic "1.0.7" :exclusions [org.slf4j/slf4j-api]]
                 [org.slf4j/jul-to-slf4j "1.7.2"]
                 [org.slf4j/jcl-over-slf4j "1.7.2"]
                 [org.slf4j/log4j-over-slf4j "1.7.2"]

                 ;;[com.taoensso/timbre "3.2.1"]

                 [camel-snake-kebab "0.1.4"]

                 ;; ClojureScript libraries
                 [org.clojure/clojurescript "0.0-2173"]
                 [sablono "0.2.6" :exclusions [com.facebook/react]]
                 [om "0.6.2"]
                 [org.clojure/core.async "0.1.267.0-0d7780-alpha"]
                 [cljs-ajax "0.2.4"]
                 [jarohen/chord "0.3.1"]
                 ;;[org.clojars.ideal-knee/dommy "0.1.3-SNAPSHOT"]
                 ]

  :jvm-opts ["-Xss8m" "-Xmx1g" "-Duser.timezone=UTC"
;;             "-Djava.net.preferIPv4Stack=true"
             ]
  :main azondi.main

  :repl-options {:init-ns user}

  :profiles {:dev {:dependencies [[org.clojure/tools.namespace "0.2.4"]
                                  [clojurewerkz/machine_head "1.0.0-beta7"]]
                   :source-paths ["dev/src/clojure" "src/cljs" ;;"/home/malcolm/src/cylon/src"
                                  ]
                   :resource-paths ["test/resources"]}

             :uberjar {:main azondi.main
                       :aot [azondi.main]}}

  )
