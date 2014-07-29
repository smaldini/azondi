(ns azondi.basepage
  (:require
   [hiccup.page :refer (html5)]
   [hiccup.form :as hf]
   [clojure.java.io :as io]
   ))

(def menus
    [{:label "Devices"
      :security :user ; surely you need to have a username in order to create devices?
      :location :sidebar
      :target "/devices"}
     {:label "Topics"
      :security :user
      :location :sidebar
      :target "/topics"}
     {:label "API"
      :security :user
      :location :sidebar
      :target "/api-docs"}
    {:label "Web Sockets"
      :security :user
      :location :sidebar
      :target "/web-sockets"}
    {:label "Getting Started"
      :security :all
      :location :navbar
      :target "/help"}
     {:label "Account"
      :security :user
      :location :navbar
      :target "#"
      :children [{:label "Reset Password"
                  :security :user
                  :target "/reset-password"}
                 ]}
     {:label "Login"
      :security :none
      :location :navbar
      :target "/login"}
     {:label "Logout"
      :security :user
      :location :navbar
      :target "/logout"}])

(def logo-area
  [:div#header
   [:div.jumbotron
    [:div#logoarea {:class "vcenter"}
     [:h1#osioheader "opensensors.io"]
     [:svg {:viewBox "0 20 1000 100"  :height "60"}
      [:circle {:cx 400 :cy 30 :fill "red" :opacity "1.0" :r "1"}
       [:animate {:attributeName "r" :begin "1s" :calcmode "linear" :dur "1s" :values="15; 4; 2; 1"}]]]]
    [:div.info
     [:h1 "The Operating System for the Internet of Things"]     
     [:h2 "Connect and manage your devices in one place." [:br] " Share your data or create private projects."]
     [:form {:id "beta-signup" :role "form"}
      [:div.form-inline
       
       [:input {:type "text" :class "form-control" :id "beta-user-id" :name "beta-user-id" :placeholder "Your User ID"} [:i [:p#username_notification {:style "display:none"}]]]
       
       [:input {:type "text" :class "form-control" :id "beta-name" :name "beta-name" :placeholder "Your Name"}]
       [:input {:type "email" :class "form-control" :id "beta-email" :name "beta-email" :placeholder "Your Email"} [:i [:p#email_notification {:style "display:none"}]]]
       [:input {:type "password" :class "form-control" :id "beta-password" :name "beta-password" :placeholder "Your Password"}]
       [:button {:id "beta-access-btn" :type "submit" :class "btn btn-primary btn-lg"
                 :disabled true} "Get Early Access"]]]]]
   ])

;; MS: This is a bit of a hack that will have to do for now. A better solution is warranted.
(defn displayed? [menu user]
  (case (:security menu)
    :user user
    :all true
    :none (nil? user)
    true))

(defn side-menu [user]
  [:div.navbar-default.navbar.sbar {:role "navigation"}
                     [:div.navbar-header.sbar
                      [:button {:type "button"
                                :class "navbar-toggle"
                                :data-toggle="collapse"
                                :data-target=".sidebar-navbar-collapse"}
                       [:span.sr-only "Toggle Navigation"]
                       [:span.icon-bar]
                       [:span.icon-bar]
                       [:span.icon-bar]
                       [:span.icon-bar]]
                      [:span {:class "visible-xs navbar-brand"} "Menu"]]

   ;;put back when parent menu is back
   ;; (if (and parent (not-empty listitems))
   ;;   (list
   ;;    [:li [:a {:data-toggle "collapse"
   ;;              :data-parent "#accordion"
   ;;              :href (str "#" parent)
   ;;              :class "collapsed"
   ;;              } parent]])
   ;;[:div {:id (str parent) :class "collapse out"}])

   [:ul
    (for [menu menus
          :when (displayed? menu user)
          ]
      (when (= :sidebar (:location menu))
        [:li.side-menu-item [:a {:href (:target menu)} (:label menu)]]))]])

(defn base-page [user body & scr]
  (html5
   [:head
    [:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}]
    [:meta {:property "dc:language" :content "en"}]
    [:meta {:property "dc:title" :content "opensensors.IO"}]
    [:meta {:property "dc:description" :content "opensensors.IO processes sensor data using azondi"}]
    [:title "opensensors.IO"]
    [:link {:href "//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" :rel "stylesheet"}]
    [:link {:href "css/bootstrap.min.css" :rel "stylesheet"}]
    [:link {:href "css/style.css" :rel "stylesheet"}]
    [:script {:src "js/jquery.min.js"}]
    [:script {:src "js/bootstrap.min.js"}]
    [:script {:src "js/jquery.session.js"}]]
   [:body
    [:div#wrap
     [:nav {:class "navbar navbar-default" :role "navigation"}
      [:div.container-fluid
       [:div.navbar-header
        [:button.navbar-toggle {:type "button" :data-toggle "collapse" :data-target "#bs-example-navbar-collapse-1"}
         [:span.sr-only "Toggle navigation"]
         [:span.icon-bar]
         [:span.icon-bar]
         [:span.icon-bar]]
        [:a#home-logo.navbar-brand (if user
                                     {:href "/devices"}
                                     {:href "/"}) "opensensors.io"]
        
        ;; [:ul {:class "nav navbar-nav"}
        ;;  [:li [:a {:href "/services"} "Services"]]]
        ]
       [:div {:class "collapse navbar-collapse" :id "bs-example-navbar-collapse-1"}
        [:ul {:class "nav navbar-nav navbar-right"}
         (for [menu menus
               :when (displayed? menu user)]
           (if (= :navbar (:location menu))
             (if (:children menu)
               [:li.dropdown [:a.dropdown-toggle {:href "#" :data-toggle "dropdown"} (:label menu) [:b.caret]]
                [:ul.dropdown-menu
                 (for [child (:children menu)
                       :when (displayed? child user)]
                   [:li [:a {:href (:target child)} (:label child)]])]]
               [:li [:a {:href (:target menu)} (:label menu)]]
               )))
         (when user
           [:li [:a user]]
           [:script (format "$.session.set('user', '%s')" user)])]]]]
     (if user
       [:div#user-page.row
        [:div.col-sm-2
         [:div.sidebar-nav
          (side-menu user)]]
        [:div.col-sm-9
         body]]
       body)]

     ;;cljs
    [:script {:src "js/react.js"}]
    [:script {:src "cljs/cljs.js"}]
    [:script {:src "cljs/azondi.js"}]

    [:script {:src "cljs/logo.js"}]
    [:script {:src "js/helpers.js"}]
    [:div#footer {:class "navbar-default navbar-fixed-bottom"}
     [:ul.footer-list
      [:li "&copy; 2014 open sensors ltd"]
      [:li [:a {:href "/about"} "About Us"]]
      [:li [:a {:href "http://blog.opensensors.IO"} "Blog"]]
      [:li [:a {:href "/terms"} "Terms"]]
      [:li [:a {:href "https://twitter.com/opensensorsio"}
            [:img {:src "imgs/glyphicons_social_31_twitter.png"}]]]
      [:li [:a {:href "mailto:hello@opensensors.io?subject=website%20enquiry"}
            [:img {:src "imgs/glyphicons_010_envelope.png"}]]]]]

    ;; extenal libs
    scr]))

(def index-page
  [:div
    logo-area
   [:div#index
    [:div#features-index
     [:h1 [:b "Create realtime IOT applications in minutes"]]
     [:div.row
      [:div#left.col-sm-6
       [:img {:src "imgs/icon_824.svg" :height 100 :width 100} [:b#features-ind " Data Broadcast"]]
       [:p "Share communal data with the world or publish privately"]]
      [:div.col-sm-6
       [:img {:src "imgs/icon_7138.svg" :height 100 :width 100} [:b#features-ind " Hardware Agnostic"]]
       [:p "Connect any device to our messaging broker easily"]
       ]]
     
     [:div.row
      [:div#left.col-sm-6
       [:img {:src "imgs/icon_1518.svg" :height 100 :width 100} [:b#features-ind "  Device Management"]]
       [:p "Built-in device security authentication and management"]]
      [:div.col-sm-6
       [:img {:src "imgs/icon_5460.svg" :height 100 :width 100} [:b#features-ind " Real Time Firehose"]]
       [:p "Your own personal data stream for M2M or web applications"]]]
     [:div.row
      [:div#left.col-sm-6
       [:img {:src "imgs/icon_6001.svg" :height 100 :width 100} [:b#features-ind "  Storage"]]
       [:p "Persistent storage and easy access to your historical data"]]
      [:div.col-sm-6
       [:img {:src "imgs/icon_22612.svg" :height 100 :width 100} [:b#features-ind " Enterprise grade"]]
       [:p "Would you like to run the opensensors.IO IOT network inside your firewall?"]
       [:a {:href "#"} "Contact Us"]]]]
    [:hr]
    [:div#how-index
     [:h2 "How to use us"]
     [:p "How to you us"]]]] 
  )
;;; We need to pull out the user details from the session
(defn devices-page [user]
  (base-page user
   [:div
    [:h2 "Devices"]
    [:div#content [:p.loading "Loading..."]]]
   [:script (format "azondi.main.devices_page('%s');" user)]))

(defn topics-page [user]
  (base-page user
   [:div
    [:h2 "Topics"]
    [:div#content [:p.loading "Loading..."]]]
   [:script (format "azondi.main.topics_page('%s');" user)]))

(defn reset-password-page [user]
  (base-page user
   [:div#pword-reset
    [:h2 "Password Reset"]
    [:p "Change your password"]
    [:form {:id "reset-password-form" :role "form" }
     [:div.form-group
      [:input {:type "password" :class "form-control" :id "passwordVerif1" :name "passwordVerif1" :placeholder "Enter New Password"}]
      [:div#ireset1]]
     [:div.form-group
      [:input {:type "password" :class "form-control" :id "passwordVerif2" :name "passwordVerif2" :placeholder "Verfiy Password"}]
      [:div#ireset2]]
     [:button {:id "reset-password-btn" :type "submit" :class "btn" :disabled "true"} "Reset Password"]
     ]]))

;; add api key
;; add user id
;; reset the api key
(defn api-page [user]
  (base-page user
   [:div
    [:div.row
     [:div#api-info.col-sm-10
      [:div#your-api-keys
       [:h3 "Your API Key"]
       [:span "api-key: "] [:strong [:span.api-info-api-key-view]] [:br]
       [:p "Please keep this information secure"] [:br]
       [:a#api-info-api-key-link {:href "#"} "reset your API key..."]]

      [:div
       [:div "All API calls should be made to " [:code "opensensors.IO"]]
       [:h3 [:b "Authentication"]]
       [:div "Authorization is achieved by adding the following HTTP header"]
       [:pre#api-authorisation-key "Authorization: api-key " [:span.api-info-api-key-view]]
       "For example send a GET request to return your existing devices"
       [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' opensensors.IO/api/1.0/users/" [:span#api-info-user-id] "/devices/"]
       [:hr]]

      [:div
       [:h3 [:b "New Devices"]]
       [:p "Send a POST request to this address to create new devices. Each POST will return a JSON map, containing the following entries :-"]
       [:pre "curl -X POST -H 'Authorization: api-key " [:span.api-info-api-key-view] "' opensensors.IO/api/1.0/users/" [:span#api-info-user-id] "/devices/ -d '{}'"]
       [:ul
        [:li "client-id : the client id to use for your device when connecting to the opensensors.io MQTT broker"]
        [:li "ownerUserId : the user name to use when connecting (this is the same as your username)"]
        [:li "password : the password to use when connecting with the device"]
        [:li "name : the name of the device"]
        [:li "description : the description of the device"]]
       [:hr]]
      [:div
       [:h3 [:b "Update Devices"]]
       [:p "Send a PUT request to this address ending with a device id to update the device details. The request should have a JSON map with entries to be updated currently name and description"]
       [:hr]]]]]
   [:script "populate_api_page ()"]
   ))

(defn web-sockets [user]
  (base-page user
             [:div#web-socket-information.row
              [:p "To use the real time device data streams in your websites or applications use the provided URL"]
              [:div#your-websocket-session
               [:h3 [:b "Firehose Details"]] [:br]
               [:span "Session Token ID: " [:strong [:span.ws-info-session-token]] [:br]]
               [:br]
               [:span#ws-session-url "URL: " [:strong [:span#ws-session-url-info]] [:br]]
               [:br]
               [:a#ws-info-ws-session-token-link {:href "#"} "reset your session id"]]
              ]
              [:script "populate_ws_page ()"]))
