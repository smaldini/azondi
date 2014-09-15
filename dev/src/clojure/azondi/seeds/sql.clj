(ns azondi.seeds.sql
  (:require [clojure.java.jdbc :as j]))

;;
;; API
;;

(defn run
  [target & args]
  (j/with-connection {:connection-uri (-> target :db :url)}
    #_ (j/insert-values "" [:id]
                     []
                     [])))
