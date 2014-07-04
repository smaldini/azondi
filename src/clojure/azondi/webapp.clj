(ns azondi.webapp
  (:require
   [com.stuartsierra.component :as component]
   [clojure.java.io :as io]
   [bidi.bidi :refer (make-handler ->ResourcesMaybe ->Files)]
   [modular.bidi :refer (WebService)]
   [markdown.core :as md]
   [hiccup.core :refer (html)]
   [azondi.basepage :refer :all]
   [org.httpkit.server :refer (run-server)]
   [cylon.authentication :refer (authenticate)]
   ))

(defn md->html
  "Reads a markdown file/resource and returns an HTML string"
  [r]
  (md/md-to-html-string (slurp r)))

(defn handlers [authenticator]
  {:index
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             (md->html (io/resource "markdown/index.md")))})
   :help
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             (md->html (io/resource "markdown/getting-started.md")))})
   :about
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             (md->html (io/resource "markdown/about-us.md")))})
   :terms
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             (md->html (io/resource "markdown/terms.md")))})

   :services
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             (md->html (io/resource "markdown/services.md")))})
   :devices
   (fn [req]
     {:status 200 :body (devices-page (authenticate authenticator req))})

   :topics
   (fn [req]
     {:status 200 :body (topics-page (authenticate authenticator req))})

   :reset-password
   (fn [req]
     {:status 200 :body (reset-password-page (authenticate authenticator req))})

   :api-docs-page
   (fn [req]
     {:status 200 :body (api-page (authenticate authenticator req))})
     })

(def routes
  ["/" [["" :index]
        ["" (->ResourcesMaybe {:prefix "public/"})]
        ;; React
        ["js/" (->ResourcesMaybe {:prefix "react/"})]

        ;;["cljs/" {:get (->Files {:dir "target/cljs"})}]
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
  (request-handlers [this] (handlers (:authenticator this)))
  (routes [_] routes)
  (uri-context [_] ""))

(defn new-webapp []
  (component/using (->WebApp) [:authenticator]))

;; TODO Need a webservice to call
;; require : [metrics.ring.expose :refer [serve-metrics]]
;;["ops/1.0/metrics" (fn [req]
;;                             (serve-metrics req metric-registry {:pretty-print? true}))]
