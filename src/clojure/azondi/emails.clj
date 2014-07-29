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

