(ns azondi.net
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [clojure.string :as str :refer (join upper-case)]
   [goog.net.XhrManager :as xhrm]
   [cljs.reader :as reader]
   [azondi.csk :as csk]
   [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
   ;;[schema.core :as s]
   [goog.json :as json]
   [goog.events :as events]
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

(defn write-json [data]
  (.serialize (goog.json.Serializer.) (clj->js data)))

(defn ajax< [in & {:as opts}]
  (let [out (chan)]
    (go-loop []
      (when-let [m (<! in)]
        (let [m (merge opts m)
              headers (clj->js (into {} (remove (comp nil? second)
                                                 [["Accept" (:accept m)]
                                                  ["Content-Type" (:content-type m)]])))
              priority 1
              _ (assert (contains? m :method) "Missing method")
              _ (assert (contains? m :uri) "Missing URI")
              content (when-let [content (:content m)] (csk/->js content))
              id (get-next-ajax-id)]
          (.send xhr-manager id (:uri m)
                 (if (keyword? (:method m))
                   (upper-case (name (:method m)))
                   (:method m))
                 (case (:content-type m)
                   "application/edn" (pr-str content)
                   "application/json" (write-json content)
                   (throw (ex-info "Unsupported content type" {:content-type (:content-type m)})))

                 headers
                 priority
                 (fn [ev]
                   (let [xhrio (.-target ev)
                         status (.getStatus xhrio)
                         body (parse-response-body xhrio)]
                     (go
                       (>! out {:status status :body body}))))))
        (recur)))
    out))

(defn ajaj<
  "Cheeky name, Async Javascript And JSON. Does automatic conversion
  from the JSON protocol to ClojureScript structures on read."
  [& args]
  (->> (apply ajax< (concat args [:accept "application/json" :content-type "application/json"]))
       (map< js->clj)
       (map< csk/->edn)))


(defn event->clj [evt]
  (-> evt .-event_ .-data json/parse (js->clj :keywordize-keys true)))

(defn listen-sse [uri ch]
  (let [source (js/EventSource. uri)]
    (events/listen source "open" (fn [ev] (println "OPEN")))
    (events/listen source "error" (fn [ev] (println "ERROR")))
    (events/listen source "message"
                   (fn [ev]
                     (go
                       (>! ch (event->clj ev)))))))
