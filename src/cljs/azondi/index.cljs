(ns azondi.index)

(enable-console-print!)

(.log js/console "Hello, welcome to index!")

(let [ws (js/WebSocket. "ws://localhost:8083/events/stream")]
  (set! (.-onmessage ws)
        (fn [ev]
          (let [message (.-data ev)]
            (println "A message arrived! " message)
            ))))
