(ns azondi.bridges.ws
  (:require [taoensso.timbre :as log]
            [com.stuartsierra.component :as component]
            [org.httpkit.server :refer [run-server with-channel send! on-close close]]
            [compojure.core :refer [routes GET POST]]
            [compojure.route :as route]
            [compojure.handler :refer [api]]
            [clojurewerkz.meltdown.reactor :as mr]
            [clojurewerkz.meltdown.selectors :refer [set-membership]]
            [clojurewerkz.meltdown.consumers :as mc]
            [cheshire.core :as json]
            ))

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
  [ws ^String topic data]
  (send! ws (event-message topic (:payload data))))

(defn authenticated?
  [pg-conn ^String username ^String token]
  true
  #_(let [row (first (j/query pg-conn
                            ["SELECT * FROM ws_session_tokens WHERE user_id = ?
                                                              AND token = ? AND expires_at > now()
                                                              LIMIT 1" username token]))]
    (not (nil? row))))

(defn ws-connection-handler
  [req clients reactor pg-conn]
  (let [query-params (:query-params req)
        username     (get-in req [:params :username])
        token        (get query-params "token")]
    (with-channel req ws
      (if (authenticated? pg-conn username token)
        (let [rows [] #_(j/query pg-conn
                            ["SELECT user_id, topic FROM subscriptions WHERE user_id = ?" username])
              subs (set (map :topic rows))]
          (log/infof "Accepted WebSocket bridge connection from %s (username: %s)" (:remote-addr req) username)
          (swap! clients conj ws)
          (let [rsub (mr/on reactor (set-membership subs)
                            (fn [evt]
                              (send-event-message ws (:key evt) (:data evt))))]
            (on-close ws (fn [status]
                           (swap! clients disj ws)
                           (mc/cancel rsub)
                           (log/infof "WebSocket bridge connection from %s is closed, status: %s" (:remote-addr req) status))))
          (send-welcome-message ws))
        (do
          (log/warnf "WebSocket authentication failure. Username: %s, token: %s" username token)
          (close ws))))))

(defrecord WebsocketBridge [port]
  component/Lifecycle
  (start [this]
    (let [r       (get-in this [:reactor :reactor])
          pg-conn (get-in this [:postgres :connection])
          clients (atom #{})
          ;; define routes here so that they have access to
          ;; clients, reactor, etc. MK.
          routes  (routes
                   (GET  "/events/stream/users/:username" req (ws-connection-handler req clients r pg-conn))
                   (route/resources "/"))
          server (run-server (api routes) {:port port})]
      (log/infof "About to start WebSocket/polling bridge server on port %d" port)
      (assoc this :server server)))
  (stop [this]
    (when-let [server (:server this)]
      (log/debugf "About to stop WebSocket/polling bridge server")
      (server))
    this))

(defn new-websocket-bridge
  [opts]
  (-> (map->WebsocketBridge opts)
      (component/using [:reactor :postgres])))
