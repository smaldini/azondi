(ns azondi.passwords
  (:require [clojurewerkz.scrypt.core :as sc]))

(defn encrypt
  ([^String s]
     (sc/encrypt s 16384 8 1))
  ([^String s ^long n ^long r ^long p]
     (sc/encrypt s n r p)))

(defn verify
  [^String given pwd-hash]
  (sc/verify given pwd-hash))
