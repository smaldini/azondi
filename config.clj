{:jig/components
 {
  ;;
  ;; MQTT transport
  ;;

  :mqtt-decoder
  {:jig/component jig.netty.mqtt/MqttDecoder
   :jig/project "../azondi/project.clj"}

  :mqtt-encoder
  {:jig/component jig.netty.mqtt/MqttEncoder
   :jig/project "../azondi/project.clj"}

  :mqtt-notification-channel
  {:jig/component jig.async/Channel
   :jig/project "../azondi/project.clj"
   :buffer :dropping
   :size 100}

  :mqtt-handler
  {:jig/component azondi.transports.mqtt/NettyMqttHandler
   :jig/project "../azondi/project.clj"
   :jig/dependencies [:mqtt-notification-channel]
   }

  :mqtt-server
  {:jig/component jig.netty/Server
   :jig/dependencies [:mqtt-decoder :mqtt-encoder :mqtt-handler :opensensors/reactor]
   :jig/project "../azondi/project.clj"
   :port 1883}

  ;;
  ;; Event stream
  ;;

  :opensensors/reactor
  {:jig/component azondi.reactor/Reactor
   :jig/project "../azondi/project.clj"}

  ;;
  ;; HTTP API, Web UI
  ;;

  :cljs-builder
  {:jig/component jig.cljs-builder/Builder
   :jig/project "../azondi/project.clj"
   :output-dir "../azondi/target/js"
   :output-to "../azondi/target/js/main.js"
   :source-map "../azondi/target/js/main.js.map"
   :optimizations :none
   }

  ;;
  ;; Database
  ;;

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
