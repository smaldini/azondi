(ns azondi.ui.forms
  (:require
   [com.stuartsierra.component :as component]
   [schema.core :as s]
   [cylon.authentication.login :refer (LoginFormRenderer)]
   [cylon.signup.protocols :refer (SignupFormRenderer WelcomeRenderer)]
   [clojure.walk :refer (postwalk)]
   [clostache.parser :refer (render-resource)]
   [clojure.tools.logging :refer :all]
   [plumbing.core :refer (<-)]))

(defprotocol TemplateDataValue
  (as-template-data-value [_]
    "Turn Clojure things into strings (useful for a Mustache template model)"))

(extend-protocol TemplateDataValue
  nil
  (as-template-data-value [_] "")
  clojure.lang.Keyword
  (as-template-data-value [k] (name k))
  Object
  (as-template-data-value [s] s ))

(defn stringify-map-values [a]
  (if (and (vector? a) (= (count a) 2))
    [(first a) (as-template-data-value (second a))]
    a))

(defn- model->template-model
  "Some pre-processing on the model provided by Cylon"
  [model]
  (cond-> model
          true ((partial postwalk stringify-map-values))
          true (update-in [:form :fields]
                          (fn [fields]
                            (map (fn [field]
                                   (assoc field :type (if (= (:name field) "password") "password" "text"))) fields)))
          (-> model :form :post-login-redirect)
          (update-in [:form :fields]
                     conj {:name "post_login_redirect"
                           :type "hidden"
                           :value (-> model :form :post-login-redirect)})))

(defrecord OsioUserFormRenderer []
  LoginFormRenderer
  (render-login-form [this req model]
    (let [template-model (model->template-model model)]
      (infof "Template model is %s" template-model)
      (render-resource "templates/boilerplate.html.mustache"
                       {:content (render-resource "templates/login.html.mustache"
                                                  template-model)})))


  SignupFormRenderer
  (render-signup-form [this req model]
    (infof "Model is %s" (postwalk stringify-map-values model))
    (render-resource "templates/boilerplate.html.mustache"
                     {:content (render-resource "templates/welcome.html.mustache"
                                                (postwalk stringify-map-values model))})
    )
  WelcomeRenderer
  (render-welcome [this req model]
    ;; TODO
    (infof "Model is %s" (postwalk stringify-map-values model))
    (render-resource "templates/boilerplate.html.mustache"
                     {:content (render-resource "templates/welcome.html.mustache"
                                                (postwalk stringify-map-values model))})
)
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
