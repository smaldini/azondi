(def jig-version "2.0.0")

(defproject azondi "0.1.0-SNAPSHOT"
  :description "Azondi helps you make sense of sensors data"
  :url "http://github.com/opensensorsio/azondi"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :source-paths ["src/clojure" "src/cljs"]

  :dependencies [[org.clojure/clojure "1.5.1"]

                 ;; Jig
                 [jig ~jig-version]

                 ;; Front end
                 [org.clojure/clojurescript "0.0-2138"
                  :exclusions [org.apache.ant/ant]]

                 ;; Back-end
                 [jig/netty ~jig-version]
                 [jig/netty-mqtt ~jig-version]
                 [clojurewerkz/cassaforte "1.3.0-beta10"]
                 [clojurewerkz/scrypt     "1.1.0"]
                 [clojurewerkz/triennium  "1.0.0-beta2"]
                 [cheshire                "5.3.1"]
                 [clojurewerkz/meltdown   "1.0.0-beta7"]
                 [compojure               "1.1.6"]
                 [http-kit                "2.1.17"]
                 [com.taoensso/sente      "0.8.1"]

                 ;; Logging
                 [com.taoensso/timbre "3.0.1"]]

  :jvm-opts ["-Xss8m" "-Xmx1g"]

  :repl-options {:prompt (fn [ns] (str "Jig " ns "> "))
                 :welcome (user/welcome)}

  :plugins [[lein-cljsbuild "1.0.2"]]
  :hooks [leiningen.cljsbuild]

  :cljsbuild
  {:builds {:main
            {:source-paths ["src/cljs"]
             :compiler {:output-to "resources/public/js/bridge.js"
                        :optimizations :whitespace
                        :pretty-print true}}}}

  :profiles {:1.6 {:dependencies [[org.clojure/clojure "1.6.0-beta1"]]}
             :master {:dependencies [[org.clojure/clojure "1.6.0-master-SNAPSHOT"]]}
             :dev {:resource-paths ["test/resources"]
                   :dependencies   [[com.lmax/disruptor "3.2.0"]
                                    [clojurewerkz/machine_head "1.0.0-beta6"]]}})
