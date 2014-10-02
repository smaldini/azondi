(ns azondi.webapp
  (:require
   [com.stuartsierra.component :as component :refer (using)]
   [clojure.java.io :as io]
   [clojure.tools.logging :refer :all]
   [bidi.bidi :refer (make-handler ->ResourcesMaybe ->Files path-for)]
   [modular.bidi :refer (WebService)]
   [markdown.core :as md]
   [hiccup.core :refer (html h)]
   [azondi.basepage :refer :all]
   [org.httpkit.server :refer (run-server)]
   [cylon.authentication :refer (authenticate get-subject-identifier)]
   [cylon.oauth.client :refer (solicit-access-token
                               refresh-access-token
                               wrap-require-authorization)]
   [ring.util.response :refer (response)]
   [plumbing.core :refer (<-)]))

(defn md->html
  "Reads a markdown file/resource and returns an HTML string"
  [r]
  (md/md-to-html-string (slurp r)))
(defn unrestricted-pages [oauth-client page]
   (fn [req]
    (let [user (authenticate oauth-client req)]
      {:status 200 :body (page user)})))

(defn handlers [oauth-client]
  {
   :users
   (->
    (fn [req]
      (response
       (users-page req
                   (:cylon/subject-identifier req)
                   (:cylon/access-token req))))
    (wrap-require-authorization oauth-client :superuser/read-users))

   :index
   (fn [req]
     {:status 200
      :body (base-page req
                       (get-subject-identifier oauth-client req)
                       index-page
                       [:script {:src "cljs/logo.js"}])})

   :help
   (fn [req]
     {:status 200
      :body (base-page req
                       (get-subject-identifier oauth-client req)
                       (md->html (io/resource "markdown/getting-started.md")))})

   :about
   (fn [req]
     {:status 200
      :body (base-page req
                       (get-subject-identifier oauth-client req)
                       (md->html (io/resource "markdown/about-us.md")))})
   :terms
   (fn [req]
     {:status 200
      :body (base-page req
                       (get-subject-identifier oauth-client req)
                       (md->html (io/resource "markdown/terms.md")))})

   :services
   (fn [req]
     {:status 200
      :body (base-page req
                       (get-subject-identifier oauth-client req)
             (md->html (io/resource "markdown/services.md")))})
   :careers
   (fn [req]
     {:status 200
      :body (base-page req
                       (get-subject-identifier oauth-client req)
                       (md->html (io/resource "markdown/careers.md")))})

   :clojure-cup
    (fn [req]
     {:status 200
      :body (base-page req
                       (get-subject-identifier oauth-client req)
                       (md->html (io/resource "markdown/clojure-cup.md")))})

   :devices (->
             (fn [req]
               (response (devices-page req
                                       (:cylon/subject-identifier req)
                                       (:cylon/access-token req))))
             (wrap-require-authorization oauth-client :user))

   #_:topics #_(restrict-to-valid-user authorizer topics-page)

   #_:api-docs-page #_(restrict-to-valid-user authorizer api-page)

   :topic-browser (->
             (fn [req]
               (response (topic-browser req
                                       (:cylon/subject-identifier req)
                                       (:cylon/access-token req))))
             (wrap-require-authorization oauth-client :user))

;   (restrict-to-valid-user oauth-client topic-browser)
   :topics-list (unrestricted-pages oauth-client public-topics-list)

   :topic-show (unrestricted-pages oauth-client public-topic-page)
   })


(def routes
  ["/" [["" :index]
        ["" (->ResourcesMaybe {:prefix "public/"})]
        ["js/" (->ResourcesMaybe {:prefix "react/"})]
        ["help" :help]
        ["about" :about]
        ["terms" :terms]
        ["services" :services]
        ["users" :users]
        ["login" :login]
        ["signup" :signup]
        ["devices" :devices]
        ["topics" :topics]
        ["reset-password" :reset-password]
        ["api-docs" :api-docs-page]
        ["web-sockets" :web-sockets-page]
        ["topic-browser" :topic-browser]
        ["clojure-cup" :clojure-cup]
        ["topic-browser" :topic-browser]]])

(defrecord WebApp [oauth-client]
  WebService
  (request-handlers [this] (handlers oauth-client))
  (routes [_] routes)
  (uri-context [_] ""))

(defn new-webapp [& {:as opts}]
  (->> opts
       (merge {})
       map->WebApp
       (<- (using [:oauth-client]))))
