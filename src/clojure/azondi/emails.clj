(ns azondi.emails
  (:require [postal.core :refer (send-message)]))

(def settings  {:host "smtp.sendgrid.net"
                :user "yods"
                :pass "y0digady"})

(defn beta-signup-email [name email]
  (send-message settings
                {:from "hello@opensensors.IO"
                 :to "hello@opensensors.IO"
                 :subject "Please give me access to beta"
                 :body (str "Please give me access.  Name: " name " Email: " email)
                    }))

(defn contact-form-email [{:keys [name email comments & company phone]}]
  (send-message settings
                {:from "hello@opensensors.IO"
                 :to "eleonore@opensensors.IO"
                 :subject "Inquiry about opensensors.IO"
                 :body (str "Name: " name "\n Company: " company "\n Email: " email "\n Telephone number: " phone "\n Comments: " comments)
                 }))
