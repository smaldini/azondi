(ns azondi.bridges.ws
  (:require [taoensso.timbre :as log]
            [org.httpkit.server :refer [run-server with-channel send! on-close]]
            [compojure.core :refer [defroutes GET POST]]
            [clojurewerkz.meltdown.reactor :as mr]
            [clojurewerkz.meltdown.selectors :refer [$]])
  (:import jig.Lifecycle))


(defn ws-connection-handler
  [req clients reactor]
  (with-channel req ws
    (log/infof "Accepted WebSocket bridge connection from %s" (:remote-addr req))
    (swap! clients conj ws)
    (let [sub (mr/on r ($ ))]
      (on-close ws (fn [status]
                     (swap! clients disj ws)
                     (log/infof "WebSocket bridge connection from %s is closed, status: %s" (:remote-addr req) status))))
    (send! ws "You are connected to WS bridge")))

(deftype WebSocketBridge [config]
  Lifecycle
  (init [_ system]
    system)
  (start [_ system]
    (let [port    (:port config)
          r       (get-in system [:opensensors/reactor :reactor])
          clients (atom '())
          ;; define routes here so that they have access to
          ;; clients, reactor, etc. MK.
          routes  (defroutes ws-routes
                    (GET  "/events/stream" req (event-stream-handler req clients r)))
          server (run-server routes {:port port})]
      (log/infof "About to start WebSocket/polling bridge server on port %d" port)
      (assoc-in system [(:jig/id config) :server] server)))
  (stop [_ system]
    (when-let [server (get-in system [(:jig/id config) :server])]
      (log/info "About to stop WebSocket/polling bridge server")
      (server))
    (dissoc system (:jig/id config))))
