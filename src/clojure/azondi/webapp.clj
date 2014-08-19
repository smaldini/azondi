(ns azondi.webapp
  (:require
   [com.stuartsierra.component :as component]
   [clojure.java.io :as io]
   [bidi.bidi :refer (make-handler ->ResourcesMaybe ->Files path-for)]
   [modular.bidi :refer (WebService)]
   [markdown.core :as md]
   [hiccup.core :refer (html h)]
   [azondi.basepage :refer :all]
   [org.httpkit.server :refer (run-server)]
   [cylon.authentication :refer (authenticate)]
   [cylon.authorization :refer (authorized?)]
   ))

(defn md->html
  "Reads a markdown file/resource and returns an HTML string"
  [r]
  (md/md-to-html-string (slurp r)))

(defn restrict-to-valid-user [authorizer page]
  (fn [req]
    (if-let [user (authorized? authorizer req nil)]
      {:status 200 :body (page user)}
      {:status 403
       :body (base-page
              nil
              [:div
               [:h1 "Unauthorized"]
               [:p "Please "
                [:a {:href (path-for (:modular.bidi/routes req) :login)} "login in"] " to continue"]])})))

(defn handlers [authenticator authorizer]
  {:index
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             index-page)})

   :help
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             [:div.markdown-page (md->html (io/resource "markdown/getting-started.md"))])})
   :about
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             [:div.markdown-page (md->html (io/resource "markdown/about-us.md"))])})
   :terms
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             [:div.markdown-page (md->html (io/resource "markdown/terms.md"))])})

   :services
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             [:div.markdown-page (md->html (io/resource "markdown/services.md"))])})
   :careers
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             [:div.markdown-page (md->html (io/resource "markdown/careers.md"))])})

   :devices (restrict-to-valid-user authorizer devices-page)

   :topics (restrict-to-valid-user authorizer topics-page)

   :reset-password (restrict-to-valid-user authorizer reset-password-page)

   :api-docs-page (restrict-to-valid-user authorizer api-page)

   :web-sockets-page (restrict-to-valid-user authorizer web-sockets)

   :topics-list (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             (public-topic)
             [:script (format "azondi.view.public_topics_list_page();")])})

   :topic-show
   (fn [req]
     {:status 200
      :body (base-page
             (authenticate authenticator req)
             (public-topic)
             [:script (format "azondi.view.public_topics_page();")])})
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
        ["careers" :careers]
        ["devices" :devices]
        ["topics" :topics]
        ["reset-password" :reset-password]
        ["api-docs" :api-docs-page]
        ["web-sockets" :web-sockets-page]

        ;; users public topic routes
        [["users/" :user]
         [["" :topics-list]
          [["/" [#".*" :topic-name]] :topic-show]
         ]]
       ]])

(defrecord WebApp []
           WebService
           (request-handlers [this] (handlers (:authenticator this) (:authorizer this)))
           (routes [_] routes)
           (uri-context [_] ""))

(defn new-webapp []
  (component/using (->WebApp) [:authenticator :authorizer]))

;; TODO Need a webservice to call
;; require : [metrics.ring.expose :refer [serve-metrics]]
;;["ops/1.0/metrics" (fn [req]
;;                             (serve-metrics req metric-registry {:pretty-print? true}))]
