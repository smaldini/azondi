(ns azondi.authentication
  (:require [clojurewerkz.cassaforte.client :as c]
            [clojurewerkz.cassaforte.cql :refer :all]
            [clojurewerkz.cassaforte.query :refer :all]
            [clojurewerkz.scrypt.core :as sc]))

(defn user-exists?
  "Returns true if a user with the provided username
   exists."
  [^String email]
  (not (empty? (select "users"
                       (where :email email)
                       (limit 1)))))

(defn authenticates?
  "Returns true if the provided user
   successfully authenticates with the provided password."
  [^String email ^String password]
  (if-let [user (first (c/with-consistency-level :quorum
                         (select "users"
                                 (where :email email)
                                 (limit 1))))]
    (sc/verify password (:pword user))
    false))
