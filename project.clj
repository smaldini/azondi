(defproject azondi "0.1.0-SNAPSHOT"
  :description "Azondi helps you make sense of sensors data"
  :url "http://github.com/opensensorsio/azondi"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :source-paths ["src/clojure" "ext/clojure" "joplin"]

  :resource-paths ["resources"]

  :exclusions [prismatic/schema
               prismatic/plumbing
               org.clojure/tools.trace]

  :plugins [[joplin.lein "0.1.11"]]

  :dependencies [[org.clojure/clojure "1.6.0"]
                 ;; Assembly
                 [com.stuartsierra/component "0.2.1"]

                 ;; Tracing - explictly required
                 [org.clojure/tools.trace "0.7.8" :exclusions [org.clojure/clojure]]

                 ;; Front end
                 #_[org.clojure/clojurescript "0.0-2138"
                    :exclusions [org.apache.ant/ant]]

                 ;; Back-end
                 [clojurewerkz/triennium  "1.0.0-beta2"]
                 [cheshire                "5.3.1"]
                 [clojurewerkz/meltdown   "1.1.0-beta1"]
                 [org.clojure/core.cache  "0.6.3"]

                 ;; Database
                 [org.clojure/java.jdbc "0.3.3"]
                 [postgresql/postgresql "8.4-702.jdbc4"]
                 [clojurewerkz/cassaforte "2.0.0-beta4"]

                 ;; HeapByteBuffer - String converter
                 [byte-streams "0.1.11"]

                 ;; Metrics
                 [metrics-clojure          "2.3.0"]
                 [metrics-clojure-ring     "2.3.0"]
                 [metrics-clojure-graphite "2.3.0"]

                 ;; for query string parsing
                 ;;[javax.servlet/servlet-api "2.5"]
                 [clj-time "0.8.0"]
                 [liberator "0.11.0" :exclusions [org.clojure/tools.logging]]
                 [prismatic/schema "0.2.6"]
                 [prismatic/plumbing "0.3.3"]
                 [clojurewerkz/scrypt     "1.1.0"]

                 ;; Pre-built components supplied by modular

                 [juxt.modular/cljs "0.5.0"]
                 [juxt.modular/mqtt "0.1.0"]
                 [juxt.modular/netty "0.1.0"]
                 [juxt.modular/http-kit "0.5.1"]
                 [juxt.modular/http-kit-events "0.5.1"]
                 [juxt.modular/bidi "0.5.2"]

                 ;; Required by bootstrap - remove when they are resolve transitively
                 [juxt.modular/bootstrap "0.2.0"]

                 [hiccup "1.0.5"]
                 [garden "1.1.5" :exclusions [org.clojure/clojure org.clojure/clojurescript]]
                 [compojure "1.1.8"]
                 [markdown-clj "0.9.36"]

                 ;; Security

                 [cylon "0.5.0-SNAPSHOT"]

                 ;; Logging

                 ;; I tried but couldn't get timbre to talk to
                 ;;.logging - plus I don't know how its global
                 ;; atom plays with component
                 [org.clojure/tools.logging "0.2.6"]
                 [ch.qos.logback/logback-classic "1.0.7" :exclusions [org.slf4j/slf4j-api]]
                 [org.slf4j/jul-to-slf4j "1.7.2"]
                 [org.slf4j/jcl-over-slf4j "1.7.2"]
                 [org.slf4j/log4j-over-slf4j "1.7.2"]

                 [camel-snake-kebab "0.1.4"]

                 ;; ClojureScript libraries
                 [org.clojure/clojurescript "0.0-2322"]
                 [sablono "0.2.6" :exclusions [com.facebook/react org.clojure/clojurescript]]
                 [om "0.6.0"]

                 [org.clojure/core.async "0.1.338.0-5c5012-alpha"]

                 [org.clojars.ideal-knee/dommy "0.1.3-SNAPSHOT"]
                 [jarohen/chord "0.3.1"]

                 ;; Temp cylon deps - remove these once depending on lib
                 ;; version of cylon
                 [clj-jwt "0.0.8"]

                 ;; Templating for MQTT message bodies
                 [de.ubercode.clostache/clostache "1.3.1"]

                 ;; email
                 [com.draines/postal "1.11.1"]

                 [clojurewerkz/stream-punk "1.0.0-beta1"]

                 ;; database migrations
                 [joplin.core          "0.1.12" :exclusions [ragtime/ragtime]]
                 ;; see weavejester/ragtime#44
                 ;;     weavejester/ragtime#34
                 [clojurewerkz/ragtime.core      "0.3.9"]
                 [clojurewerkz/ragtime.sql       "0.3.9"]
                 [clojurewerkz/ragtime.sql.files "0.3.9"]
                 [joplin.jdbc          "0.1.12"]
                 [joplin.cassandra     "0.1.12"]
                ]

  :jvm-opts ^:replace ["-server" "-Xss8m" "-Xmx1g" "-Duser.timezone=UTC"]
  :main azondi.main
  :repl-options {:init-ns user}
  ;; data migrations
  :joplin {:migrators {:pg-mig "joplin/migrators/sql"
                       :c*-mig "joplin/migrators/cassandra"}
           :seeds     {:pg-seed "azondi.seeds.sql/run"
                       :c*-seed "azondi.seeds.cassandra/run"}
           :databases {:pg-dev {:type :jdbc :url "jdbc:postgresql://127.0.0.1/osio?user=azondi&password=opendata"}
                       :c*-dev {:type :cass :hosts ["127.0.0.1"] :keyspace "opensensors"}
                       :pg-test {:type :jdbc :url "jdbc:postgresql://127.0.0.1/opensensors_test?user=azondi&password=opendata"}
                       :c*-test {:type :cass :hosts ["127.0.0.1"] :keyspace "opensensors_test"}}
           :environments {:dev  [{:db       :pg-dev
                                  :migrator :pg-mig
                                  :seed     :pg-seed}
                                 {:db       :c*-dev
                                  :migrator :c*-mig
                                  :seed     :c*-seed}]
                          :test [{:db       :pg-test
                                  :migrator :pg-mig
                                  :seed     :pg-seed}
                                 {:db       :c*-test
                                  :migrator :c*-mig
                                  :seed     :c*-seed}]
                          :prod []}}
  :profiles {:dev {:dependencies [[org.clojure/tools.namespace "0.2.4"]
                                  [clojurewerkz/machine_head "1.0.0-beta9"]]
                   :source-paths ["dev/src/clojure" "src/cljs"]
                   :resource-paths ["test/resources" "dev/src/sql" "dev/src/cql"]}

             :uberjar {:main azondi.main
                       :aot [azondi.main]}}
  :test-selectors {:mqtt :mqtt
                   :api  :api})
