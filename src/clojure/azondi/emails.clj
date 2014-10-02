(ns azondi.emails
  (:require
   [com.stuartsierra.component :as component]
   [cylon.signup.protocols :refer (Emailer)]
   [org.httpkit.client :refer (request) :rename {request http-request}]
   [cheshire.core :refer (encode decode)]
   [azondi.api-utils :refer (->js ->clj process-maps)]
   [schema.core :as s ]))



(defn request-sendgrid [method uri data]
  (let [response
        @(http-request
          (merge
           {:method method
            :url uri
            :headers
            (merge
             {"Content-Type" "application/json"
              "Accept" "application/json"})}
           (when data { :form-params   data })
           )
          identity)]
    (:body (update-in response [:body] (comp ->clj decode)))
    ))

(defrecord SendgridEmailer [settings]
  Emailer
  (send-email [_ email body]
    (request-sendgrid :post "https://api.sendgrid.com/api/mail.send.json"
                      (merge {:to email
                              :subject "Please give me access to beta"
                              :text body
                              :from "info@opensensors.io"}
                             settings))))

(defn new-emailer [& {:as opts}]
  (component/using
   (->> opts
        (merge {:settings
                {:api_user "the-user"
                 :api_key "the-pass"}})
        (s/validate {:settings {
                                :api_user s/Str
                                :api_key s/Str}})
        map->SendgridEmailer)[]))
