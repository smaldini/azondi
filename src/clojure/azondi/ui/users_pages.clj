(ns azondi.ui.users-pages
  (:require [com.stuartsierra.component :as component]
            [clostache.parser :refer (render-resource)]
            [clojure.java.io :as io]
            [modular.bootstrap :refer (ContentBoilerplate)]
            [cylon.session :refer (session)]
            [cylon.authentication :refer (get-subject-identifier)]))


;; devices page
;; topics page
;; api

(defn menus [req]
    [{:label "Devices"
      :security :user ; surely you need to have a username in order to create devices?
      :location :sidebar
      :target "/devices"}
     {:label "Topics"
      :security :user
      :location :sidebar
      :target "/topics"}
     {:label "API"
      :security :user
      :location :sidebar
      :target "/api-docs"
      :children [{:label "API Keys"
                  :security :user
                  :target "/api-docs"}
                 {:label "Devices"
                  :security :user
                  :target "/api-docs#devices-api-info"}
                 {:label "Topics"
                  :security :user
                  :target "/api-docs#topics-api-info"}
                 {:label "Streaming Api"
                  :security :user
                  :target "/api-docs#firehose-api-info"}
                 {:label "Messages"
                  :security :user
                  :target "/api-docs#messages-api-info"}]}
     {:label "Sign up"
     :security :none
     :location :navbar
     :target "/signup"}
     {:label "Account"
      :security :user
      :location :navbar
      :target "#"
      :children [{:label "Reset Password"
                  :security :user
                  :target "/reset-password"}
                 ]}
     {:label "Login"
      :security :none
      :location :navbar
      :target "/devices"}
     {:label "Logout"
      :security :user
      :location :navbar
      :target "/logout"}])

(defn render-users-page [req user]
  (render-resource "templates/users-page.html.mustache" {}
                   {:header (slurp (io/resource "templates/header.html.mustache"))
                    :navbar (slurp (io/resource "templates/navbar.html.mustache"))
                    :scripts (slurp (io/resource "templates/scripts.html.mustache"))
                    :footer (slurp (io/resource "templates/footer.html.mustache"))
                    :body "test"})
  )

;; (defrecord BasePageContentBoilerplate [authenticator]
;;   ContentBoilerplate
;;   (wrap-content-in-boilerplate [this req content]
;;     (base-page req (get-subject-identifier authenticator req) content)))

;; (defn new-basepage-content-boilerplate []
;;   (component/using (map->BasePageContentBoilerplate {}) [:authenticator]))

(defrecord AuthBasePageContentBoilerplate [authenticator]
  ContentBoilerplate
  (wrap-content-in-boilerplate [this req content]
    (render-users-page
     req
     (get-subject-identifier authenticator req)
    ;; content
     )))



(defn new-auth-basepage-content-boilerplate []
  (component/using (map->AuthBasePageContentBoilerplate {}) [:authenticator]))
