(ns azondi.login
  (:require
   [cylon.impl.login-form :refer (LoginFormRenderer)]
   [hiccup.core :refer (html)]
   [azondi.basepage :refer (base-page)]))

(defrecord CustomLoginFormRenderer []
  LoginFormRenderer
  (render-login-form
    [this request {:keys [requested-uri action login-status fields]}]
    (base-page request
               (html [:form.form-set {:method "POST"
                                      :action action
                                      :id "sign-in-form"}
                      (when (not-empty requested-uri)
                        [:input {:type "hidden" :name :requested-uri :value requested-uri}])
                      [:h2 "Sign In"]
                      (when requested-uri
                        ;; If requested-uri is not nil, you should add it as a hidden field.
                        [:input {:type "hidden" :name :requested-uri :value requested-uri}])
                      (when login-status
                        [:div.alert.alert-warning
                         [:button.close {:type "button" :data-dismiss "alert"} "x"]"Incorrect Login Details"])

                      (for [{:keys [id name type placeholder]} fields]
                        [:input.form-control {:id id :name name :type type :placeholder id}])

                      [:button {:class "btn btn-lg btn-primary pull-right" :type "submit"} "Sign In"]
                      ]))))

(defn new-custom-login-form-renderer []
  (->CustomLoginFormRenderer))
