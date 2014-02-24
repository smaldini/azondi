(def jig-version "2.0.0-RC7")

(defproject azondi "0.1.0-SNAPSHOT"
  :description "Azondi helps you make sense of sensors data"
  :url "http://github.com/opensensorsio/azondi"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :source-paths ["src" "src-cljs"]

  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/core.async "0.1.256.0-1bf8cf-alpha"]

                 ;; Front end
                 [prismatic/dommy "0.1.1"]
                 ;;[org.clojars.ideal-knee/dommy "0.1.3-SNAPSHOT"]


                 ;; Back-end
                 [clojurewerkz/cassaforte "1.3.0-beta10"]
                 [clojurewerkz/scrypt     "1.1.0"]
                 [clojurewerkz/triennium  "1.0.0-beta2"]
                 [cheshire "5.3.1"]
                 [clojurewerkz/meltdown "1.0.0-beta4"]

                 ;; Logging
                 [com.taoensso/timbre "3.0.1"]

                 ;; Jig
                 [jig ~jig-version]
                 [jig/async ~jig-version]
                 [jig/cljs-builder ~jig-version]
                 [jig/bidi ~jig-version]
                 [jig/stencil ~jig-version]
                 [jig/netty ~jig-version]
                 [jig/netty-mqtt ~jig-version]
                 [jig/http-kit ~jig-version]]

  :repl-options {:prompt (fn [ns] (str "Jig " ns "> "))
                 :welcome (user/welcome)}

  :profiles {:1.6 {:dependencies [[org.clojure/clojure "1.6.0-beta1"]]}
             :master {:dependencies [[org.clojure/clojure "1.6.0-master-SNAPSHOT"]]}
             :dev {:resource-paths ["test/resources"]
                   :dependencies   [[com.lmax/disruptor "3.2.0"]
                                    [clojurewerkz/machine_head "1.0.0-beta6"]]}})
