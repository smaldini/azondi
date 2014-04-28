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
                 [clojurewerkz/meltdown   "1.0.0-beta11"]
                 [compojure               "1.1.6"]
                 ;; for query string parsing
                 [javax.servlet/servlet-api "2.5"]
                 [clj-time                "0.7.0"]
                 [liberator "0.11.0"]
                 [prismatic/schema "0.2.1"]

                 ;; Pre-built components supplied by modular
                 [juxt.modular/bidi "0.4.0-SNAPSHOT" :exclusions [bidi]]
                 [juxt.modular/cljs "0.4.0-SNAPSHOT"]
                 [juxt.modular/clostache "0.1.0-SNAPSHOT"]
                 [juxt.modular/http-kit "0.4.0-SNAPSHOT"]
                 [juxt.modular/maker "0.1.0-SNAPSHOT"]
                 [juxt.modular/menu "0.1.0-SNAPSHOT"]
                 [juxt.modular/mqtt "0.1.0-SNAPSHOT"]
                 [juxt.modular/netty "0.1.0-SNAPSHOT"]
                 [juxt.modular/ring "0.4.0-SNAPSHOT"]
                 [juxt.modular/template "0.1.0-SNAPSHOT"]
                 [juxt.modular/wire-up "0.1.0-SNAPSHOT"]

                 [bidi "1.10.3"]
                 [hiccup "1.0.5"]

                 ;; Logging
                 [com.taoensso/timbre "3.0.1"]

                 [camel-snake-kebab "0.1.4"]]

  :jvm-opts ["-Xss8m" "-Xmx1g" "-Duser.timezone=UTC"]
  :main azondi.main

  :repl-options {:init-ns user}

  :profiles {:dev {:dependencies [[org.clojure/tools.namespace "0.2.4"]
                                  [clojurewerkz/machine_head "1.0.0-beta7"]]
                   :source-paths ["dev/src/clojure"]
                   :resource-paths ["test/resources"]}

             :uberjar {:main azondi.main
                       :aot [azondi.main]}}

  )
