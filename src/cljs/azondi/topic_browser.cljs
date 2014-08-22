(ns azondi.topic-browser
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [clojure.string :as string]
   [cljs.reader :as reader]
   [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
   [om.core :as om :include-macros true]
   [sablono.core :as html :refer-macros [html]]
   [azondi.net :refer (ajaj< listen-sse)]
   [goog.events :as events]
   [chord.client :refer [ws-ch]]
   [azondi.csk :as csk]
   [azondi.chart :refer (chart-component)]))


(enable-console-print!)

(def app-model
  (atom {}))

(defn topic-browser [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        [:p [:i "You should not have to be logged in to see this page"]]
        [:h1 "Sources"]
        (for [[title color] [["PM2 levels" "#54bd68"] ["Outside temperature" "#da523c"] ["Oxford river levels" "#4a65bc"] ["Topic 4" "#ff8b24"]]]
          [:div.topic
           [:svg {:version "1.1" :width 220 :height 140}
            [:rect {:fill color :x 0 :y 0 :width 220 :height 140}]
            [:g {:transform "translate(110,0)"}
             [:path {:d "M-100,40q100,-60,200,0l-10,10q-90,-62,-180,0z" :stroke "white" :stroke-width "2" :fill "none"}]
             [:g {:transform "translate(0,100) rotate(-30)"}
              [:path {:d "M0,0v-90" :stroke "white" :stroke-width "2" :fill "none"}]]]
            ]
           [:h1 title]
           [:p "Lorem ipsum "]
           [:div.tag "temperature"]
           [:div.tag "co2"]
           ]
          )

        ]
       ;; Make an AJAX call to get all the 'top' topics
       )
      )))

(defn ^:export main [user]
  (om/root topic-browser app-model {:target (. js/document (getElementById "content"))}))
