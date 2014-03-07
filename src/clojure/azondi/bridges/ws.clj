(ns azondi.bridges.ws
  (:require [taoensso.sente :as wsg]
            [taoensso.timbre :as log]
            [org.httpkit.server :refer [run-server]]
            [compojure.core :refer [defroutes GET POST]])
  (:import jig.Lifecycle))

(let [{:keys [ch-recv
              send-fn
              ajax-post-fn
              ajax-get-or-ws-handshake-fn]} (wsg/make-channel-socket! {})]
  (def ring-ajax-post                ajax-post-fn)
  (def ring-ajax-get-or-ws-handshake ajax-get-or-ws-handshake-fn)
  (def ch-chsk                       ch-recv)
  (def chsk-send!                    send-fn))

(defroutes sente-routes
  (GET "/hello"         req "hello from http-kit!")
  (GET "/events/stream" req (#'ring-ajax-get-or-ws-handshake req))
  (GET "/events/stream" req (#'ring-ajax-post                req)))

(deftype WebSocketBridge [config]
  Lifecycle
  (init [_ system]
    system)
  (start [_ system]
    (let [port   (:port config)
          server (run-server sente-routes {:port port})]
      (log/infof "About to start HTTP server on port %d" port)
      (assoc-in system [(:jig/id config) :server] server)))
  (stop [_ system]
    (when-let [server (get-in system [(:jig/id config) :server])]
      (log/info "About to stop HTTP server")
      (server))
    (dissoc system (:jig/id config))))
