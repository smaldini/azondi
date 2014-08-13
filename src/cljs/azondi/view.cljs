(ns azondi.view
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [om.core :as om :include-macros true]
            [azondi.net :refer (ajaj< listen-sse)]
            [goog.events :as events]
            [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
            [sablono.core :as html :refer-macros [html]]))


(def uri-init "/api/1.0")
;; topics list get the table of public topics
;; each topic links to the ind topic

(def app-model-public-topics
  (atom {:u (.-pathname js/location) ;; whose details they are looking for e.g. /users/yods/
         :public-topics []
         :public-topic nil
         :msgs []}))

(defn public-topics-list-component
  "show a list of all public topics for each user"
  [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      ;; get all public topics for this user
      (let [ajax-send (chan)
            uri (str uri-init (:u app-state) "/public-topics/")
            ajax-recv (ajaj< ajax-send
                             :method :get
                             :uri uri)]
        (.log js/console uri)
        (go
          (>! ajax-send {})
          (let [r (<! ajax-recv)]
            (om/update! app-state :public-topics (-> r :body :topics))))))
    om/IRender
    (render [this]
      (html
       [:div.row
         (let [public-topics (:public-topics app-state)]
          (if (not-empty public-topics)
            [:div
             [:p (str "Public Topics for " (:u app-state))]
             [:table.table.table-hover.table-condensed.tbl
              [:thead
               [:tr
                [:th "Topic"]
                [:th "Description"]
                [:th "Unit of Measure"]]]
              [:tbody
               (for [{:keys [topic description unit]} public-topics]
                 [:tr
                  [:td
                   [:a
                    {:onClick              ; if we click on one of the topics
                     (fn [ev]
                       (.preventDefault ev)   ; don't follow the link
                       (let [uri (str "/api/1.0" (:u @app-state) "/public-topics/" (subs topic (count (str (:u @app-state) "/"))))
                             ajax-send (chan)
                             ajax-recv (ajaj< ajax-send
                                              :method :get
                                              :uri uri
                                              :content {})]
                         (.log js/console uri)
                         (go
                           (>! ajax-send {}) ; Trigger a 'GET' of the latest topic details
                           (let [{:keys [status body] :as response} (<! ajax-recv)]
                             (when (= status 200)
                               ;; Update the device in the app-state. This
                               ;; causes the device details component to
                               ;; refresh.
                               (om/update! app-state :public-topic
                                           ;; We must avoid setting controlled
                                           ;; component input values to nil,
                                           ;; so we merge in empty string
                                           ;; defaults!
                                           (merge {:name "" :description "" :unit "" :topic ""}
                                                  (select-keys body [:name :description :unit :topic ]))))))))} topic]]
                  [:td description]
                  [:td unit]])]]]
            [:p (str "Unable to find any public topics for " (:u app-state))]))
         ]))))



(defn ^:export public-topics-list-page []
  (om/root public-topics-list-component app-model-public-topics
           {:target (. js/document (getElementById "content"))}))



