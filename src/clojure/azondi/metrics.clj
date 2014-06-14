(ns azondi.metrics
  (:require [metrics.core       :as mc]
            [metrics.meters     :as mm]
            [metrics.histograms :as mh]
            [metrics.timers     :as mt]
            [metrics.counters   :as mct]
            [metrics.reporters          :as mr]
            [metrics.reporters.graphite :as mrg]
            [com.stuartsierra.component :as component]))

(defrecord Metrics [^String hostname ^String prefix]
  component/Lifecycle
  (start [this]
    (println this)
    (let [reg (mc/new-registry)
          rep (mrg/reporter reg {:hostname (.hostname this)
                                 :prefix   (str (.prefix this) "." (.hostname this))})]
      (when (System/getenv "USE_GRAPHITE")
        (mr/start rep 5))
      (merge this
             {:registry                                      reg
              :mqtt-connections-active                       (mct/counter reg ["mqtt" "connections" "active"])
              :mqtt-connections-authentication-failures      (mm/meter reg ["mqtt" "connections" "authentication_failures"])
              :mqtt-connections-authorization-failures       (mm/meter reg ["mqtt" "connections" "authorization_failures"])
              :mqtt-connections-unsupported-protocol-version (mct/counter reg ["mqtt" "connections" "unsupported_protocol_version"])
              :mqtt-exceptions-uncaught                      (mm/meter reg ["mqtt" "exceptions" "uncaught"])
              :mqtt-messages-published                       (mm/meter reg ["mqtt" "messages" "published"])
              :mqtt-messages-payload-size                    (mh/histogram reg ["mqtt" "messages" "payload_size"])
              :mqtt-messages-publish-latency                 (mt/timer reg ["mqtt" "messages" "publish_latency"])})))

  (stop [this]
    this))

(defn new-metrics
  [opts]
  (map->Metrics opts))
