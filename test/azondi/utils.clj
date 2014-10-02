(ns azondi.utils
  (:require
   [clojure.string :refer (split)]
   [clojure.test :refer :all]))

(defn cookie-value-from-set-cookie-header
  [response cookie-id]
  (let [set-cookie-header (get-in response [ :headers :set-cookie])]
   (->>
    (split set-cookie-header  #";")
    (map #(split % #"="))
    (filter #(= cookie-id (first % )))
    first
    second
    )))





(deftest test-cookie-value-from-set-cookie-header
  (testing "utility fn"
    (let [data-example {:headers
                        {:set-cookie
                         "my-cookie=my-value;Expires=16 Jul 2014..."}}]
      (is (= "my-value"(cookie-value-from-set-cookie-header data-example "my-cookie"))))))
