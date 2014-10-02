(ns azondi.stub-emailer
  (:require
   [clojure.tools.logging :refer :all]
   [cylon.signup.protocols :refer (Emailer)]
   [schema.core :as s ]))

(defrecord StubEmailer []
  Emailer
  (send-email [_ email body]
    (warnf "Not sending email to %s: %s" email body)))

(def new-stub-emailer-schema {})

(defn new-stub-emailer [& {:as opts}]
  (->> opts
       (merge {})
       (s/validate new-stub-emailer-schema)
       map->StubEmailer))
