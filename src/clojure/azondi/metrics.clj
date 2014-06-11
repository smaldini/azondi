(ns azondi.metrics
  (:require [metrics.core       :as mc]
            [metrics.meters     :as mm]
            [metrics.histograms :as mh]
            [metrics.counters   :as mct]
            [com.stuartsierra.component :as component]))

(defrecord Metrics []
  component/Lifecycle
  (start [this]
    (let [reg (mc/new-registry)]
      (merge this
             {:registry                                      reg
              :mqtt-connections-active                       (mct/counter reg ["mqtt" "connections" "active"])
              :mqtt-connections-auth-failures                (mm/meter reg ["mqtt" "connections" "auth_failures"])
              :mqtt-connections-unsupported-protocol-version (mm/meter reg ["mqtt" "connections" "unsupported_protocol_version"])
              :mqtt-connections-invalid-client-ids           (mm/meter reg ["mqtt" "connections" "invalid_client_id"])
              :mqtt-exceptions-uncaught                      (mm/meter reg ["mqtt" "exceptions" "uncaught"])
              :mqtt-messages-published                       (mm/meter reg ["mqtt" "messages" "published"])
              :mqtt-messages-payload-size                    (mh/histogram reg ["mqtt" "messages" "payload_size"])
              :mqtt-messages-publish-latency                 (mh/histogram reg ["mqtt" "messages" "publish_latency"])})))

  (stop [this]
    this))

(defn new-metrics
  []
  (-> (Metrics.)))
