(ns azondi.ui.forms
  (:require
   [com.stuartsierra.component :as component :refer (Lifecycle)]
   [schema.core :as s]
   [cylon.authentication.login :refer (LoginFormRenderer)]
   [cylon.signup.protocols :refer (SignupFormRenderer WelcomeRenderer)]
   [clojure.walk :refer (postwalk)]
   [clostache.parser :refer (render-resource)]
   [clojure.tools.logging :refer :all]
   [clojure.java.io :refer (resource)]
   [plumbing.core :refer (<-)]))


(def contact-us-form [:form {:id "contact-us-form" :role "form"}
                      [:div.form-inline
                       [:input {:type "text" :class "form-control" :id "beta-name" :name "beta-name" :placeholder "Your Name"}]
                       [:input {:type "text" :class "form-control" :id "beta-company" :name "beta-company" :placeholder "Your company"}]
                       [:input {:type "email" :class "form-control" :id "beta-email" :name "beta-email" :placeholder "Your Email"} [:i [:p#email_notification {:style "display:none"}]]]
                       [:input {:type "text" :class "form-control" :id "beta-phone" :name "beta-phone" :placeholder "Your Phone Number"}]
                       [:textarea {:cols 20 :rows 2 :class "form-control" :id "beta-comments" :name "beta-comments" :placeholder "Any comments"}]
                       [:button {:id "contact-form-btn" :type "submit" :class "btn btn-primary btn-lg"
                                 :disabled true} "Submit"]]])


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
  Lifecycle
  (start [component]
    (assoc component
      :partials {:header (slurp (resource "templates/header.html.mustache"))
                 :footer (slurp (resource "templates/footer.html.mustache"))}))
  (stop [component] component)
  LoginFormRenderer
  (render-login-form [component req model]
    (let [template-model (model->template-model model)]
      (infof "Template model is %s" template-model)
      (render-resource "templates/login.html.mustache"
                       template-model
                       (:partials component))))


  SignupFormRenderer
  (render-signup-form [component req model]
    (infof "Model is %s" (postwalk stringify-map-values model))
    (render-resource "templates/signup.html.mustache"
                     (postwalk stringify-map-values model)
                     (:partials component)))

  WelcomeRenderer
  (render-welcome [component req model]
    ;; TODO
    (infof "Model is %s" (postwalk stringify-map-values model))
    (render-resource "templates/welcome.html.mustache"
                     (postwalk stringify-map-values model)
                     (:partials component))))

;; TODO MS: I don't like the name 'osio' in code. Can we give our house style a name? Like Google's Material: http://www.google.co.uk/design/spec/material-design/introduction.html
(defn new-osio-user-form-renderer [& {:as opts}]

  (->> opts
       (merge {:login-prompt "Please sign in&#8230"
               :signup-prompt "Please sign up&#8230"
               :reset-password-request-prompt "Reset your password&#8230"
               :totp-appname "cylon"})
                                        ;        (s/validate new-bootstrap-user-form-renderer-schema)
       map->OsioUserFormRenderer))
