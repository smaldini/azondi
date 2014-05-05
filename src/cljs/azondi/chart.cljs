(ns azondi.chart
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [cljs.core.async :refer [<! >! timeout]]
   [om.core :as om :include-macros true]
   [sablono.core :as html :refer-macros [html]]))

(defn chart-component [app-state owner]
  (reify
    om/IInitState
    (init-state [this]
      {:from-time (.getTime (new js/Date))})

    om/IWillMount
    (will-mount [this]
      (go-loop []
        (<! (timeout 250))
        (om/set-state! owner :from-time (.getTime (new js/Date)))
        (recur)))

    om/IRender
    (render [this]
      (html
       [:svg {:version "1.1" :width 810 :height 140}
        [:g {:transform "translate(0,0)"}
         (let [now (om/get-state owner :from-time)]
           (concat
            [[:rect {:x 800 :y 0 :width 2 :height 80
                      :style {:font-size "12pt" :stroke "none" :fill "red"}}]]
            (for [{:keys [value]} (map #(if-let [then (get-in % [:message :time])]
                                          (assoc % :value (- 800 (int (/ (- now then) 1000))))
                                          %) (seq app-state))]

              (when value
                [:rect {:x value :y 0 :width 1 :height 80
                        :style {:font-size "12pt" :stroke "none" :fill "#888"}}])
              )))


         ]]))))
