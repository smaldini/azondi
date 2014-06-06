(ns azondi.webapp
  (:require
   [com.stuartsierra.component :as component]
   [clojure.java.io :as io]
   [bidi.bidi :refer (make-handler ->ResourcesMaybe)]
   [markdown.core :as md]
   [hiccup.core :refer (html)]
   [org.httpkit.server :refer (run-server)]
   [azondi.basepage :refer :all]
 ))

(defn md->html
  "Reads a markdown file/resource and returns an HTML string"
  [r]
  (md/md-to-html-string (slurp r)))

(def pages
  {:index
   (fn [req]
     {:status 200 :body (base-page (md->html (io/resource "markdown/index.md")))})
   :help
   (fn [req]
     {:status 200 :body (base-page (md->html (io/resource "markdown/getting-started.md")))})
   :about
   (fn [req]
     {:status 200 :body (base-page (md->html (io/resource "markdown/about-us.md")))})
   :terms
   (fn [req]
     {:status 200 :body (base-page (md->html (io/resource "markdown/terms.md")))})
   :services
   (fn [req]
     {:status 200 :body (base-page (md->html (io/resource "markdown/services.md")))})
   :devices
   (fn [req]
     {:status 200 :body (devices-page)})
   :topics
   (fn [req]
     {:status 200 :body (topics-page)})
   ;; add devices and topics, then reset password
   })



(defn app []
  (make-handler ["/" [["" (:index pages)]
                      ["" (->ResourcesMaybe {:prefix "public/"})]
                      ["help" (:help pages)]
                      ["about" (:about pages)]
                      ["terms" (:terms pages)]
                      ["services" (:services pages)]
                      ["devices" (:devices pages)]
                      ["topics" (:topics pages)]]]))


(defrecord WebServer []
  component/Lifecycle
  (start [this]
    (let [server (run-server (app) {:port 8010})]
     (assoc this :server server)))
  (stop [this]
    (when-let [server (:server this)]
      (server)
      (dissoc this :server))))

(defn new-webserver []
  (->WebServer))


