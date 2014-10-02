(ns azondi.ui.forms
  (:require
   [com.stuartsierra.component :as component]
   [schema.core :as s]
   [cylon.authentication.login :refer (LoginFormRenderer)]
   [cylon.signup.protocols :refer (SignupFormRenderer WelcomeRenderer)]
   [clostache.parser :refer (render-resource)]))


(defrecord OsioUserFormRenderer []
  LoginFormRenderer
  (render-login-form [this req model]
    (render-resource "templates/boilerplate.html.mustache"
                     {:content (render-resource "templates/login.html.mustache" {})}))
  SignupFormRenderer
  (render-signup-form [this req model]
    ;; TODO
    (render-resource "templates/login.html.mustache" {}))
  WelcomeRenderer
  (render-welcome [this req model]
    ;; TODO
    (render-resource "templates/login.html.mustache" {}))
  )


;; TODO MS: I don't like the name 'osio' in code. Can we give our house style a name? Like Google's Material: http://www.google.co.uk/design/spec/material-design/introduction.html
(defn new-osio-user-form-renderer [& {:as opts}]

  (->> opts
       (merge {:login-prompt "Please sign in&#8230"
               :signup-prompt "Please sign up&#8230"
               :reset-password-request-prompt "Reset your password&#8230"
               :totp-appname "cylon"})
                                        ;        (s/validate new-bootstrap-user-form-renderer-schema)
       map->OsioUserFormRenderer))
