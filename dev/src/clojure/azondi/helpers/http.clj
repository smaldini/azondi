(ns azondi.helpers.http
  (:require
   [org.httpkit.client :refer (request) :rename {request http-request}]
   [cheshire.core :refer (encode decode)]
   [clojure.pprint :refer (pprint)]
   [azondi.api :refer (->js ->clj)]))

(defn request
  [method uri & {:keys [data api-key expected auth]}]
  (let [response
        @(http-request
          (merge
           {:method method
            :url uri
            :headers
            (merge
             {"Content-Type" "application/json"
              "Accept" "application/json"}
             (when api-key
               {"Authorization" (str "api-key " api-key)}))}
           (when auth {:basic-auth auth})
           (when data {:body (str (encode (->js data)))}))
          identity)]
    (assert (:status response) (format "Failed to connect to %s!" uri))
    (when
        (if expected
          (not= (:status response) expected)
          (>= (:status response) 400))
      (println "Error status returned on HTTP request")
      (pprint response)
      (throw (ex-info (format "Unexpected status, response status is %d with body %s" (:status response) (pr-str (:body response))) {})))
    (if (< (or expected 200) 400)
      (update-in response [:body] (comp ->clj decode))
      response)))
