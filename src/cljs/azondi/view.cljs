(ns azondi.view
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [om.core :as om :include-macros true]
            [azondi.net :refer (ajaj< listen-sse)]
            [goog.events :as events]
            [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
            [sablono.core :as html :refer-macros [html]]))


(def user
  ;;temp
  "yods" )

(def topicname
  ;; temporary until we can fix the routing issue
  "/users/yods/foo"
  ;;(.-pathname js/location)
  )

(def uri-init "/api/1.0")
;; topics list get the table of public topics
;; each topic links to the ind topic

(def app-model
  (atom {:user user
         :topics []
         :topic ""
         :messages []}))

(defn public-topics-list-component
  "show a list of all public topics for each user"
  [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      ;; get all public topics for this user
      (let [ajax-send (chan)
            uri (str uri-init "/users/" (:user app-state) "/public-topics/")
            ajax-recv (ajaj< ajax-send
                             :method :get
                             :uri uri)]
        (go
          (>! ajax-send {}
              (let [r (<! ajax-recv)]
                (om/update! app-state :topics (-> r :body :topics)))))))
    om/IRender
    (render [this]
      (html
       [:div
        [:p "Holding page for topics list"]
        (str "user" (:user app-state))
        
        (for [t (:topics app-state)]
          [:p (str t)])]))))


(defn ^:export public-topics-list-page []
  (om/root public-topics-list-component app-model
           {:target (. js/document (getElementById "content"))}))
