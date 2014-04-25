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
                 [clojurewerkz/cassaforte "1.3.0-beta11"]
                 [clojurewerkz/scrypt     "1.1.0"]
                 [clojurewerkz/triennium  "1.0.0-beta2"]
                 [cheshire                "5.3.1"]
                 [clojurewerkz/meltdown   "1.0.0-beta12"]
                 [compojure               "1.1.6"]
                 ;; for query string parsing
                 [javax.servlet/servlet-api "2.5"]
                 [http-kit                "2.1.17"]
                 [cylon                   "0.1.2"]
                 [clj-time                "0.7.0"]

                 ;; Ext dependencies for incubated components
                 [juxt/clj-mqtt "0.4.6-alpha"]
                 [io.netty/netty-all "5.0.0.Alpha1"]

                 ;; Logging
                 [com.taoensso/timbre "3.0.1"]

                 ;; SQL access (postgres)
                 [org.clojure/java.jdbc "0.3.3"]
                 [postgresql/postgresql "8.4-702.jdbc4"]]

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
