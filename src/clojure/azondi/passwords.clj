(ns azondi.passwords
  (:require
   [clojurewerkz.scrypt.core :as sc]
   [cylon.password.protocols :refer (PasswordHashAlgorithm)])
  (:import
   (javax.xml.bind DatatypeConverter)))

(defn encrypt
  ([^String s]
     (sc/encrypt s 16384 8 1))
  ([^String s ^long n ^long r ^long p]
     (sc/encrypt s n r p)))

(defn verify
  [^String given pwd-hash]
  (sc/verify given pwd-hash))

(defrecord ScryptHashAlgorithm []
  PasswordHashAlgorithm
  (make-hash [_ password salt]
    (encrypt (str password salt)))
  (check [_ password salt hashed]
    (verify (str password salt) hashed)))

(defn new-scrypt-hash-algo [& {:as opts}]
  (->> opts
       (merge {})
       map->ScryptHashAlgorithm))

;; (encrypt (str "pwd" "somesalt"))
