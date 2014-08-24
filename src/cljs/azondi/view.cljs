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
         :user nil
         :public-topics []
         :public-topic nil
         :msgs []
         }))

(defn subscribe-btn [_]
  [:button#public-topic-subscribe-btn.btn.btn-primary
   {:onClick (fn [ev]
               (if (:user app-state)
                 (let [uri (str "/api/1.0/" (:user @app-state) "subscribe" (:topic @app-state))]
                   (.preventDefault ev)
                   (.log js/console "hi"))
                 (.replace window.location "/login"))
               )} "Subscribe"])
;; onclick send an ajax message to subscribe or unsubscribe

(def unsubscribe-btn [:button#public-topic-subscribe-btn.btn "UnSubscribe"])

#_(defn sub-unsub-btn [app-model user]
  ;; if the user is not null an ajax to see if the user is subscribed to that button
  ;; if the user is subbed (unsub butn) if the user is unsubbed (sub buttn) (on click sub and unsub)
  (if (:user app-model) 
   
    (let [ajax-send (chan)
          uri (str uri-init "/users/" user "/is-subscribed" (:u app-model))
          ajax-recv (ajaj< ajax-send
                           :method :get
                           :uri uri)]
      (go
        (>! ajax-send {})
        (let [r (<! ajax-recv)
              subscribed? (:body r)]
          (om/update! app-model :subscribed? subscribed?)))
      (if subscribed? unsubscribe-btn subscribe-btn))
    subscribe-btn
    )
  )

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
                    {:href (str topic)}
                    topic]]
                  
                  [:td description]
                  [:td unit]])]]]
            [:p (str "Unable to find any public topics for " (:u app-state))]))
         ]))))

;; {:onClick              ; if we click on one of the topics
;;                      (fn [ev]
;;                        ;;(.preventDefault ev)   ; don't follow the link
;;                        (let [uri (str "/api/1.0" (:u @app-state) "/public-topics/" (subs topic (count (str (:u @app-state) "/"))))
;;                              ajax-send (chan)
;;                              ajax-recv (ajaj< ajax-send
;;                                               :method :get
;;                                               :uri uri
;;                                               :content {})]
;;                          (.log js/console uri)
;;                          (go
;;                            (>! ajax-send {}) ; Trigger a 'GET' of the latest topic details
;;                            (let [{:keys [status body] :as response} (<! ajax-recv)]
;;                              (when (= status 200)
;;                                ;; Update the device in the app-state. This
;;                                ;; causes the device details component to
;;                                ;; refresh.
;;                                (om/update! app-state :public-topic
;;                                            ;; We must avoid setting controlled
;;                                            ;; component input values to nil,
;;                                            ;; so we merge in empty string
;;                                            ;; defaults!
;;                                            (merge {:name "" :description "" :unit "" :topic ""}
;;                                                   (select-keys body [:name :description :unit :topic ]))))))))}

(defn ^:export public-topics-list-page [user]
  (swap! app-model-public-topics assoc :user user)
  (om/root public-topics-list-component app-model-public-topics
           {:target (. js/document (getElementById "content"))}))


;; I want to see the latest messages of this topic
;; In the future I want to graph this topic
;; I want to be able to subscribe to this topic

(defn public-topic-component [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      (let [ajax-send (chan)
            topic (.-pathname js/location)
            uuid (-> (clojure.string/split topic #"/")
                     (nth 2))
            
            uri (if (:user app-state)
                  (str uri-init "/users/" (:user app-state) "/public-topics" topic) ;; if logged in
                  (str uri-init "/users/" "guest" "/public-topics" topic))
            ajax-recv (ajaj< ajax-send
                             :method :get
                             :uri uri)]
        
        
        (go
          (>! ajax-send {})
          (let [r (<! ajax-recv)]
            (om/update! app-state :public-topic (-> r :body))))))

    om/IRender
    (render [this]
      (html
       [:div.row
        (let [public-topic (:public-topic app-state)]
          [:p (str "Topic Details")]
          (if (not-empty public-topic)
            [:div
             [:p (str "Topic Details for " (:topic public-topic))]
             [:table.table.table-hover.table-condensed.tbl
              [:thead
               [:tr
                [:th "Topic"]
                [:th "Description"]
                [:th "Unit of Measure"]
                [:th ""]]]
              [:tbody
               [:tr
                [:td (:topic public-topic)]
                [:td (:description public-topic)]
                [:td (:unit public-topic)]
                [:td (if (= true (:subscribed public-topic)) unsubscribe-btn (subscribe-btn 1))]]]]]
            [:p (str "Unable to find topic" )]))
         ]))))


;; checks if you are logged in if not asks you to
;; if you are already subscribed you can unsubscribe
;; 

(defn message-view-component [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this])
    ;;create a chan and listen to the events from this topic
    ;; have a go loop that updates app-state messages
    
    om/IRender
    (render [this]
      ;; in a debugger show the messages
      [:pre
       (for [msg (-> app-state :msgs)]
         (str msg "\r\n"))])))

(defn ^:export public-topic-page [user]
  (when (not= "null" user) (swap! app-model-public-topics assoc :user user))
  (om/root public-topic-component app-model-public-topics
           {:target (. js/document (getElementById "content"))}))
