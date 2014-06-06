(ns azondi.logo
  (:require-macros
   [cljs.core.async.macros :refer [go go-loop]]
   [dommy.macros :refer [node sel1]])
  (:require
   [cljs.core.async :refer [<! put! chan mult tap timeout map<]]
   [dommy.core :as dommy :refer (append!)]))

(defn random-color
  "Pick a color, but throw away really dark ones (R + G + B <= 300)"
  []
  (str "fill:rgb("
       (apply str (interpose "," (first (filter #(> (apply + %) 300) (repeatedly (fn [] (take 3 (repeatedly #(rand-int 255)))))))))
       ")"))


(defn logoarea []
  (h/html [:div#logoarea.vcenter
           [:svg {:viewBox "0 20 1000 100"}
            [:circle {:cx 400 :cy 50 :r 1 :fill "red" :opacity "1.0"}
             [:animate {:attributeName "r" :values "15; 4; 2; 1" :dur "1s" :begin "1s" :calcMode "linear"}]]]]))

(defn make-animate []
  (doto (.createElementNS js/document "http://www.w3.org/2000/svg" "animate")
    (.setAttribute "attributeName" "r") ; animate the radius value
    (.setAttribute "dur" "1s") ; over 1 second
    (.setAttribute "values" "12; 4; 2; 1") ; across these values
    (.setAttribute "calcMode" "linear"))) ; linearly interpolated

(defn init []
  (let [svg (sel1 "#logoarea svg")]
    (doseq [n (range 50)]               ; number of circles
      (let [x (rand-int 1000)]          ; width of line
        (let [anim (make-animate)
              el (node [:circle {:cx x :cy 50 :r 1 :style (random-color)} anim])]

          (go-loop []                ; create a go block for each circle
                   (<! (timeout (rand-int 10000))) ; wait for some random time
                   (.beginElement anim)           ; flash!
                   (recur))

          (append! svg el))))))

(set! (.-onload js/window) init)
