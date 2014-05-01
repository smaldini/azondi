(ns azondi.ajax
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [clojure.string :as str :refer (join)]
   [goog.net.XhrManager :as xhrm]
   [cljs.reader :as reader]
   [azondi.csk :as csk]
   [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
   ;;[schema.core :as s]
   ))

;; XHR

(def xhr-manager (goog.net.XhrManager.))

(def next-id (atom 0))

(defn ^:export get-next-ajax-id []
  (str (swap! next-id inc)))

(defmulti parse-response-body "Dispatch on media type"
  (fn [xhrio]
    (first (str/split (.getResponseHeader xhrio "Content-Type") ";"))))

(defmethod parse-response-body "text/plain" [xhrio]
  (.getResponseText xhrio))

(defmethod parse-response-body "application/json" [xhrio]
  (.getResponseJson xhrio
                    ""                  ; prefix - for
                                        ; http://stackoverflow.com/questions/2669690/why-does-google-prepend-while1-to-their-json-responses
                                        ; http://haacked.com/archive/2009/06/24/json-hijacking.aspx
                    ))

(defmethod parse-response-body "text/html" [xhrio]
  (.getResponseText xhrio))

(defmethod parse-response-body "application/xml" [xhrio]
  (.getResponseXml xhrio))

(defmethod parse-response-body "application/edn" [xhrio]
  (reader/read-string (.getResponseText xhrio)))

(defn ajax< [in & {:as opts}]
  (let [out (chan)]
    (go-loop []
      (when-let [m (<! in)]
        (let [m (merge opts m)
              _ (assert (contains? m :uri) "Missing URI")
              _ (assert (contains? m :accept) "Missing Accept")
              id (get-next-ajax-id)]
          (.send xhr-manager id (:uri m)
                 "GET"
                 nil                    ; content
                 (clj->js {"Accept" (:accept m)})  ; headers
                 1                      ; priority
                 (fn [ev]
                   (let [xhrio (.-target ev)
                         status (.getStatus xhrio)
                         response (parse-response-body xhrio)]
                     (go
                       (>! out response))))))
        (recur)))
    out))

(defn ajaj<
  "Cheeky name, Async Javascript And JSON. Does automatic conversion
  from the JSON protocol to ClojureScript structures on read."
  [& args]
  (->> (apply ajax< (concat args [:accept "application/json"]))
       (map< js->clj)
       (map< csk/->edn)))
