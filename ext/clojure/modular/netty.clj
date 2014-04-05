(ns modular.netty
  (:require
   [com.stuartsierra.component :as component])
  (:import
   (io.netty.channel.nio NioEventLoopGroup)
   (io.netty.bootstrap ServerBootstrap)
   (io.netty.channel.socket.nio NioServerSocketChannel)
   (io.netty.channel ChannelInitializer ChannelHandler ChannelOption)))

(defprotocol NettyHandlerProvider
  (netty-handler [_]))

 (defrecord NettyServer [port so-options]
  component/Lifecycle
  (start [this]

    (let [handlers (filter (partial satisfies? NettyHandlerProvider) (vals this))]

      (when (empty? handlers)
        (throw (ex-info "No netty handler dependencies on server" {:component this})))

      (let [boss-group (NioEventLoopGroup.)
            worker-group (NioEventLoopGroup.)]
        (let [b (ServerBootstrap.)]
          (-> b
              (.group boss-group worker-group)
              (.channel NioServerSocketChannel)
              (.childHandler
               (proxy [ChannelInitializer] []
                 (initChannel [ch]
                   ;;(debugf "Initializing channel with handlers: %s" (vec handlers))
                   (-> ch (.pipeline) (.addLast (into-array ChannelHandler (map (fn [f] (if (fn? f) (f) f)) handlers)))))))
              (.option ChannelOption/SO_BACKLOG (int (or (:so-backlog so-options) 128)))
              (.childOption ChannelOption/SO_KEEPALIVE (or (:so-keepalive so-options) true)))

          (assoc this
            :channel (.bind b port)
            :boss-group (NioEventLoopGroup.)
            :worker-group (NioEventLoopGroup.))))))

  (stop [this]
    (let [fut (:channel this)]
      (.awaitUninterruptibly fut)       ; await for it to be bound
      (-> fut (.channel) (.close) (.sync)))
    (.shutdownGracefully (:worker-group this))
    (.shutdownGracefully (:boss-group this))
    this))

(defn new-netty-server [& {:as opts}]
  (println "Starting new netty server: opts are " opts)
  (map->NettyServer opts))
