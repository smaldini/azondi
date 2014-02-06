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
                 [clojurewerkz/machine_head "1.0.0-beta6"]
                 [clojurewerkz/cassaforte "1.3.0-beta8"]
                 [clojurewerkz/scrypt     "1.1.0"]
                 [cheshire "5.3.0"]

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

                )
