(ns azondi.view
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [dommy.macros :refer [node sel sel1]])
  (:require [om.core :as om :include-macros true]
            [azondi.net :refer (ajaj< listen-sse)]
            [goog.events :as events]
            [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
            [sablono.core :as html :refer-macros [html]]
            [dommy.core :as dommy]))


(def uri-init "/api/1.0")
;; topics list get the table of public topics
;; each topic links to the ind topic

(def app-model-public-topics
  (atom {:u (.-pathname js/location) ;; whose details they are looking for e.g. /users/yods/
         :user nil
         :public-topics []
         :public-topic nil
         :msgs [{:device_id "53", :payload "This is a test", :content_type "application/json", :charset "UTF-8", :topic "/users/yods/test", :owner "yods"}]
         }))

(declare unsubscribe-btn);; so I can use it in subscribe-btn

(defn subscribe-btn [app-state]
  [:button#public-topic-subscribe-btn.btn.btn-primary
   {:onClick (fn [ev]
               (if (:user @app-state)
                 (let [ajax-send (chan)
                       uri (str uri-init "/users/"
                                (:user @app-state) "/public-topics"
                                (-> @app-state
                                    :public-topic
                                    :topic))
                       ajax-recv (ajaj< ajax-send
                           :method :post
                           :uri uri)]
                   (go
                     (>! ajax-send {}))
                   (dommy/replace! (sel1 "#public-topic-subscribe-btn") (unsubscribe-btn app-state)))
                 (do (.replace window.location "/login"))))} "Subscribe"])

(defn unsubscribe-btn [app-state]
  [:button#public-topic-subscribe-btn.btn
   {:onClick (fn [ev]
               (if (:user @app-state)
                 (let [ajax-send (chan)
                       uri (str uri-init "/users/"
                                (:user @app-state) "/public-topics"
                                (-> @app-state
                                    :public-topic
                                    :topic))
                       ajax-recv (ajaj< ajax-send
                           :method :delete
                           :uri uri)]
                   (go
                     (>! ajax-send {}))
                   (dommy/replace! (sel1 "#public-topic-subscribe-btn") (subscribe-btn app-state)))
                 (do (.replace window.location "/login") ;; TODO update this so that it once logged in it sends you back to where you were
                     )))}
   "UnSubscribe"])

(defn public-topics-list-component
  "show a list of all public topics for each user"
  [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      ;; get all public topics for this user
      (let [ajax-send (chan)
            uri (str uri-init (:u app-state) "/public-topics")
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

(defn ^:export public-topics-list-page [user]
  (swap! app-model-public-topics assoc :user user)
  (om/root public-topics-list-component app-model-public-topics
           {:target (. js/document (getElementById "content"))}))


;; I want to see the latest messages of this topic
;; In the future I want to graph this topic
(defn public-topic-component [app-state owner]
  (reify
     om/IInitState
    (init-state [this]
      {:public-stream (chan)})
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
                             :uri uri)
            notify-ch (om/get-state owner :public-stream)]
        (go
          (>! ajax-send {})
          (let [r (<! ajax-recv)]
            (om/update! app-state :public-topic (-> r :body))))

        ;;update msgs a message arrives
        (go-loop []
          (when-let [message (<! notify-ch)]
            (om/transact! app-state [:msgs]
                          (fn [e]
                            (take 10 (cons (:message message) e))))

            (recur)))
        (listen-sse (str "/public-stream" (:u app-state)) notify-ch)))

    om/IWillUpdate
    (will-update [this next-props next-state]
      (let [old-topic (get-in app-state [:public-topic :topic])
            new-topic (get-in next-props [:public-topic :topic])]
        (when (not= old-topic new-topic)
          (listen-sse (str "/public-stream" (:u app-state)) (om/get-state owner :public-stream)))))

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
                [:td (if (= true (:subscribed public-topic))
                       (unsubscribe-btn app-state)
                       (subscribe-btn app-state))]]]]
             [:div#topic-events [:h3 "Events"]
              [:p "Messages on Topic"]
              [:pre
               (for [msg (-> app-state :msgs)]
                 (str (:payload msg) "\r\n"))]]]
            [:p (str "Unable to find topic" )]))]))))


(defn ^:export public-topic-page [user]
  (when (not= "null" user) (swap! app-model-public-topics assoc :user user))
  (om/root public-topic-component app-model-public-topics
           {:target (. js/document (getElementById "content"))}))
