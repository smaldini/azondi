(ns modular.netty.mqtt
  (:require
   [com.stuartsierra.component :as component]
   [mqtt.decoder :refer (make-decoder)]
   [mqtt.encoder :refer (make-encoder)]))

(defrecord MqttDecoder []
  component/Lifecycle
  (start [this]
    (assoc this :decoder-provider #(make-decoder)))
  (stop [this] this))

(defn new-mqtt-decoder []
  (->MqttDecoder))

(deftype MqttEncoder []
  component/Lifecycle
  (start [this]
    (assoc-in this :encoder-provider #(make-encoder)))
  (stop [this] this))

(defn new-mqtt-encoder []
  (->MqttEncoder))
