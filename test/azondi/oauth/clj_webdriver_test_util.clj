(ns azondi.oauth.clj-webdriver-test-util
  (:require
   [clj-webdriver.window :refer (position reposition size resize)]
   [clj-webdriver.taxi :refer (set-driver! implicit-wait quit)]))


(def ^:private browser-count (atom 0))



(defn browser-up
  "Start up a browser if it's not already started."
  []
  (when (= 1 (swap! browser-count inc))
    (let [ driver (set-driver! {:browser :chrome})]
      (resize  driver {:width 1300 })
      (reposition driver {:x 1930 :y 0})

      (implicit-wait 60000)
      driver
      )

    ))

(defn browser-down
  "If this is the last request, shut the browser down."
  [& {:keys [force] :or {force false}}]
  (when (zero? (swap! browser-count (if force (constantly 0) dec)))
    (quit)))
