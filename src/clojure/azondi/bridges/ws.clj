(ns azondi.bridges.ws
  (:require [taoensso.timbre :as log]
            [org.httpkit.server :refer [run-server with-channel send! on-close]]
            [compojure.core :refer [routes GET POST]]
            [compojure.route :as route]
            [clojurewerkz.meltdown.reactor :as mr]
            [clojurewerkz.meltdown.selectors :refer [match-all]]
            [clojurewerkz.meltdown.consumers :as mc]
            [cheshire.core :as json])
  (:import jig.Lifecycle))

(defn welcome-message
  []
  (json/generate-string {:type "welcome"}))

(defn send-welcome-message
  [ws]
  (send! ws (welcome-message)))

(defn event-message
  [^String topic ^bytes payload]
  (json/generate-string {:type "event" :topic topic :payload (String. payload "UTF-8")}))

(defn send-event-message
  [ws ^String topic payload]
  (send! ws (event-message topic payload)))

(defn ws-connection-handler
  [req clients reactor]
  (with-channel req ws
    (log/infof "Accepted WebSocket bridge connection from %s" (:remote-addr req))
    (swap! clients conj ws)
    (let [sub (mr/on reactor (match-all) (fn [evt]
                                           (send-event-message ws (:key evt) (:data evt))))]
      (on-close ws (fn [status]
                     (swap! clients disj ws)
                     (mc/cancel sub)
                     (log/infof "WebSocket bridge connection from %s is closed, status: %s" (:remote-addr req) status))))
    (send-welcome-message ws)))

(deftype WebSocketBridge [config]
  Lifecycle
  (init [_ system]
    system)
  (start [_ system]
    (let [port    (:port config)
          r       (get-in system [:opensensors/reactor :reactor])
          clients (atom #{})
          ;; define routes here so that they have access to
          ;; clients, reactor, etc. MK.
          routes  (routes
                    (GET  "/events/stream" req (ws-connection-handler req clients r))
                    (route/resources "/"))
          server (run-server routes {:port port})]
      (log/infof "About to start WebSocket/polling bridge server on port %d" port)
      (assoc-in system [(:jig/id config) :server] server)))
  (stop [_ system]
    (when-let [server (get-in system [(:jig/id config) :server])]
      (log/info "About to stop WebSocket/polling bridge server")
      (server))
    (dissoc system (:jig/id config))))
