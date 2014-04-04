(ns azondi.development.seed
  "Seeds the database with data useful for development"
  (:require [clojurewerkz.cassaforte.client :as cc]
            [clojurewerkz.cassaforte.cql :refer :all]
            [clojurewerkz.cassaforte.query :refer :all])
  (:import jig.Lifecycle))

(defn seed-users
  [_]
  (let [t "users"]
    (insert t {:fname "Yodit"
               :sname "S"
               :id    "yods"
               :email "yods@example.org"
               ;; yods-pwd
               :pword "$s0$e0801$MVTNO5fjX8fKevLhQby8zw==$zto1GKhCct/zBL8CXf5rlqjlTUThkSTPNRu2krbSof0="
               :role  "user"
               :publisher true}
            (if-not-exists))
    (insert t {:fname "Malcolm"
               :sname "S"
               :id    "malcolm"
               :email "malcolm@example.org"
               ;; "malcolm-pwd"
               :pword "$s0$e0801$Rx1hB/mKositO9iDGWRIxg==$TJirCI5umAUPzD5ITuU2YpFoiSqFHITjxi8CJAFOktg="
               :role  "user"
               :publisher true}
            (if-not-exists))
    (insert t {:fname "Michael"
               :sname "K"
               :id    "novemberain"
               :email "michael@example.org"
               ;; "michael-pwd"
               :pword "$s0$e0801$NvT1nSA6A4MRc5vE5m3ADA==$95syoMec4Ql6Ytlq30WeUnib9Hy3TaWgKKmikupqQ6o="
               :role  "user"
               :publisher true}
            (if-not-exists))
    (insert t {:fname "John"
               :sname "Appleseed"
               :id    "appleseed"
               :email "appleseed@example.org"
               ;; "appleseed-pwd"
               :pword "$s0$e0801$5MJbCuB5cU5iNxYFINjBNw==$R0ughkDXkVDEzqynjfsljlpvWlU1MRpUQWqGiR81y6I="
               :role  "user"
               :publisher false}
            (if-not-exists))))

(defn seed
  [system]
  (seed-users system))

(deftype Database [config]
  Lifecycle
  (init [_ system]
    system)
  (start [_ system]
    (let [ks (get-in system [:opensensors/database :keyspace])]
      (use-keyspace ks)
      (seed system))
    system)
  (stop [_ system]
    system))
