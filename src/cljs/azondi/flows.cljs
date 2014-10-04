(ns azondi.flows
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

(declare app-model) ; evil

(def filter-color "#aa0")

;; Components

(defn topic-segment [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div.flow-segment
        {:style {:min-height "200px"
                 :width "300px"
                 :background "#070"}}
        [:h1 "Topic"]
        [:input {:type "text" :value (:topic app-state)}]
        ]))))

(defn segment [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div.flow-segment
        {:style {:min-height "200px"
                 :width "300px"
                 :background (:color app-state)}}
        [:h1 (:label app-state)]
        ]))))

(defn sink-segment [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div.flow-segment
        {:style {:min-height "200px"
                 :width "300px"
                 :background "#007"}}
        [:h1 "Sink"]
        [:input {:type "text" :value "/user/yods/sink"}]
        ]))))

(defn flow [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (for [seg (-> app-state :segments)]
          (case (:type seg)
            :topic (om/build topic-segment seg)
            (om/build segment seg)))
        [:div {:style {:min-height "60px"
                       :width "100px"
                       :background filter-color
                       :color "white"}
               :onClick (fn [ev]
                          (.preventDefault ev)
                          (println "Append!")
                          (om/transact! app-state :segments #(conj % {:label "Filter" :color filter-color}))
                          )}
         [:p [:span.fa.fa-plus] "Filter"]]
        (om/build sink-segment app-state)
        ]))))

(defn topic [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:p "This form allows you to edit the topic -- hello yodit"]))))

(defn content [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (let [content (:content app-state)]
          (if content
            [:div
             [:h1 (:label content)]
             (if-let [component (:component content)]
               (om/build component content)
               [:div "(watch this space)"])]
            [:div "(intentionally left blank)"]
            ))]))))

(defn drawer [model owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:li
        [:a {:href "#"}
         [:i.fa.fa-bar-chart-o.fa-fw]
         (:label model)
         [:span.fa.arrow]]
        [:ul.nav.nav-second-level.collapse {:style {"height" "0px"}}
         (for [item (:items model)]
           [:li
            [:a {:onClick (fn [ev]
                            (.preventDefault ev)
                            (swap! app-model assoc :content @item)
                            )}
             (:label item)]])
         [:li [:a {:onClick (fn [ev] (.preventDefault ev) (println "Foo!")
                              (om/transact! model :items #(conj % (:archetype @model))))}

               "New...!"]]]]))))

(defn drawers [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:ul#side-menu.nav
        [:li.sidebar-search
          [:div.input-group.custom-search-form
           [:input.form-control {:type "text" :placeholder "Search..."}]
           [:span.input-group-btn
            [:button.btn.btn-default {:type "button"}
             [:i.fa.fa-search]]]]]
        (om/build-all drawer (:side-menu app-state))])
      )))


;; View model

(def app-model
  (atom
   {:content nil
    :side-menu
    [{:label "Devices"
      :items [{:label "iPhone"}
              {:label "Android"}
              {:label "Arduino"}
              {:label "Raspberry Pi"}
              {:label "Dimmer switch"}
              {:label "Temperature sensor"}
              {:label "Pollution sensor"}]}

     {:label "Topics"
      :archetype {:component topic :label "/users/yods/new"}
      :items [{:component topic :label "/users/yods/temperature"}
              {:component topic :label "/users/yods/mixer"}]}

     {:label "Flows"
      :archetype {:component flow
                  :label "My new flow"
                  :segments
                  [{:type :topic
                    :topic "/users/yods/*"}]}
      :items [{:component flow
               :label "Alarm if too hot"
               :segments
               [{:type :topic
                 :topic "/users/yods/foo"
                 }
                {:label "Filter" :color filter-color}
                ]}

              {:component flow
               :label "River overflowing!"
               :segments
               [{:type :topic :topic "/users/yods/river"}
                ]}
              ]}

     {:label "API"
      :items [{:label "Usage"}
              {:label "Docs"}]}]

    }))


(defn ^:export main [user]
  (om/root drawers app-model {:target (. js/document (getElementById "sidebar-drawers"))})
  (om/root content app-model {:target (. js/document (getElementById "content"))})
  )
