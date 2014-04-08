{:jig/components
 {

  ;; MQTT transport

  :mqtt-decoder
  {:jig/component jig.netty.mqtt/MqttDecoder
   :jig/project "../azondi/project.clj"}

  :mqtt-encoder
  {:jig/component jig.netty.mqtt/MqttEncoder
   :jig/project "../azondi/project.clj"}

  :mqtt-handler
  {:jig/component azondi.transports.mqtt/NettyMqttHandler
   :jig/project "../azondi/project.clj"
   }

  :mqtt-server
  {:jig/component jig.netty/Server
   :jig/dependencies [:mqtt-decoder :mqtt-encoder :mqtt-handler :opensensors/reactor]
   :jig/project "../azondi/project.clj"
   :port 1883}

  ;; Event stream

  :opensensors/reactor
  {:jig/component azondi.reactor/Reactor
   :jig/project "../azondi/project.clj"}


  ;; WebSockets

  :opensensors/ws
  {:jig/component azondi.bridges.ws/WebSocketBridge
   :jig/project "../azondi/project.clj"
   :port 8083}

  ;; Database

  ;; TODO: this is duplicated with le-web. MK.
  :opensensors/database
  {:jig/component azondi.db/Database
   :jig/project "../azondi/project.clj"
   :hosts ["127.0.0.1"]
   :keyspace "opensensors"
   }

  :opensensors/development/seed
  {:jig/component azondi.development.seed/Database
   :jig/project "../azondi/project.clj"
   :jig/dependencies [:opensensors/database]
   }
  }}
