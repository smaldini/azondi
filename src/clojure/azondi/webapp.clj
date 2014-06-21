(ns azondi.webapp
  (:require
   [com.stuartsierra.component :as component]
   [clojure.java.io :as io]
   [bidi.bidi :refer (make-handler ->ResourcesMaybe)]
   [modular.bidi :refer (WebService)]
   [markdown.core :as md]
   [hiccup.core :refer (html)]
   [azondi.basepage :refer :all]
   [org.httpkit.server :refer (run-server)]
   ))

(defn md->html
  "Reads a markdown file/resource and returns an HTML string"
  [r]
  (md/md-to-html-string (slurp r)))

(def handlers
  {:index
   (fn [req]
     {:status 200 :body (base-page req (md->html (io/resource "markdown/index.md")))})
   :help
   (fn [req]
     {:status 200 :body (base-page req (md->html (io/resource "markdown/getting-started.md")))})
   :about
   (fn [req]
     {:status 200 :body (base-page req (md->html (io/resource "markdown/about-us.md")))})
   :terms
   (fn [req]
     {:status 200 :body (base-page req (md->html (io/resource "markdown/terms.md")))})
   :services
   (fn [req]
     {:status 200 :body (base-page req (md->html (io/resource "markdown/services.md")))})
   :devices
   (fn [req]
     {:status 200 :body (devices-page req)})
   :topics
   (fn [req]
     {:status 200 :body (topics-page req)})
   :reset-password
   (fn [req]
     {:status 200 :body (reset-password-page req)})
   :api-docs-page
   (fn [req]
     {:status 200 :body (api-page req)})
     })

(def routes
  ["/" [["" :index]
        ["" (->ResourcesMaybe {:prefix "public/"})]
        ["help" :help]
        ["about" :about]
        ["terms" :terms]
        ["services" :services]
        ["devices" :devices]
        ["topics" :topics]
        ["reset-password" :reset-password]
        ["api-docs" :api-docs-page]
        ]])

(defrecord WebApp []
  WebService
  (request-handlers [_] handlers)
  (routes [_] routes)
  (uri-context [_] ""))

(defn new-webapp [] (->WebApp))

;; TODO Need a webservice to call
;; require : [metrics.ring.expose :refer [serve-metrics]]
;;["ops/1.0/metrics" (fn [req]
;;                             (serve-metrics req metric-registry {:pretty-print? true}))]
