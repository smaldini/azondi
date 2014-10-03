(ns azondi.http-kit
  (:require
   [schema.core :as s]
   [com.stuartsierra.component :as component]
   [clojure.tools.logging :refer :all]
   [modular.ring :refer (request-handler WebRequestHandler)]
   [org.httpkit.server :refer (run-server)]
   [ring.middleware.cors :refer (wrap-cors)]))

(defn cors-headers [origin]
  {"Access-Control-Allow-Origin" origin
    "Access-Control-Allow-Headers" "Access-Control-Allow-Origin,Authorization, Content-type"
    "Access-Control-Allow-Methods" "*" })

(defn allow-cross-origin
  "Allow requests from all origins"
  [handler origin]
  (fn [request]
    (let [response (handler request)]
      (update-in response [:headers]
        merge (cors-headers origin) ))))


(defrecord Webserver [port origin-allowed]
  component/Lifecycle
  (start [this]
    (if-let [provider (first (filter #(satisfies? WebRequestHandler %) (vals this)))]
      (let [h (request-handler provider)]
        (assert h)
        (let [server (run-server (-> h
                                     (allow-cross-origin origin-allowed)

                                     ) {:port port})]
          (assoc this :server server :port port)))
      (throw (ex-info (format "http-kit module requires the existence of a component that satisfies %s" WebRequestHandler)
                      {:this this}))))

  (stop [this]
    (when-let [server (:server this)]
      (server)
      (dissoc this :server))))
(def default-port 8030)
(defn new-http-listener-cors [& {:as opts}]
  (let [{:keys [port origin-allowed]} (->> (merge {:port default-port} opts)
                            (s/validate {:port s/Int
                                         :origin-allowed s/Str}))]
    (->Webserver port origin-allowed)
    ))
