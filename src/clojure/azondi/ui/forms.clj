(ns azondi.ui.forms
  (:require
   [com.stuartsierra.component :as component]
   [cylon.authentication.login :refer (LoginFormRenderer)]
   [clostache.parser :refer (render-resource)]))


(defrecord OsioUserFormRenderer []  
  LoginFormRenderer
  (render-login-form [this req model] (render-resource "templates/login.html.mustache" {})))


(defn new-osio-user-form-renderer [& {:as opts}]
  (->> opts
       (merge {:login-prompt "Please sign in&#8230"
               :signup-prompt "Please sign up&#8230"
               :reset-password-request-prompt "Reset your password&#8230"
               :totp-appname "cylon"})
       map->OsioUserFormRenderer))
