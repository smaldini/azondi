(ns azondi.webapp
  (:require
   [com.stuartsierra.component :as component]
   [clojure.java.io :as io]
   [bidi.bidi :refer (make-handler ->ResourcesMaybe)]
   [markdown.core :as md]
   [hiccup.core :refer (html)]
   [azondi.basepage :refer :all]
   [org.httpkit.server :refer (run-server)]
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
   :reset-password
   (fn [req]
     {:status 200 :body (reset-password-page)})
     })



(defn app [api-routes]
  ["/" [["" (:index pages)]
        ["" (->ResourcesMaybe {:prefix "public/"})]
        ["help" (:help pages)]
        ["about" (:about pages)]
        ["terms" (:terms pages)]
        ["services" (:services pages)]
        ["devices" (:devices pages)]
        ["topics" (:topics pages)]
        ["reset-password" (:reset-password pages)]
        ["api/1.0" api-routes]]])


(defrecord WebApp []
  component/Lifecycle
  (start [this]
    (let [webapp-routes (app (get-in this [:api :api-routes]))
          server (run-server (make-handler webapp-routes) {:port 8010})]
      (assoc this
        :webapp-routes webapp-routes
        :webserver server)))
  (stop [this]
    (when-let [server (:webserver this)]
      (server)
      (dissoc this :webapp-routes :webserver))))

(defn new-webapp []
  (component/using (->WebApp)
                   [:api]))


