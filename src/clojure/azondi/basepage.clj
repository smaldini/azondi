(ns azondi.basepage
  (:require
   [hiccup.page :refer (html5)]
   [hiccup.form :as hf]
   [clojure.java.io :as io]))

(def menus
    [{:label "Devices"
      :security :all
      :location :sidebar
      :target "/devices"}
     {:label "Topics"
      :security :user
      :location :sidebar
      :target "/topics"}
     {:label "Getting Started"
      :security :user
      :location :navbar
      :target "/help"}
     {:label "Account"
      :security :user
      :location :navbar
      :target "#"
      :children [{:label "Reset Password"
                  :security :user
                  :target "/reset-password"}
                 {:label "API"
                  :security :user
                  :target "/api-docs"}]}
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
     ;;[:h2 "Big Data"]
     ;;[:h2 "Small Devices"]
     [:svg {:viewBox "0 20 1000 100"  :height "60"}
      [:circle {:cx 400 :cy 30 :fill "red" :opacity "1.0" :r "1"}
       [:animate {:attributeName "r" :begin "1s" :calcmode "linear" :dur "1s" :values="15; 4; 2; 1"}]]]]]])

(def side-menu
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
    (for [menu menus]
      (when (= :sidebar (:location menu))
        [:li.side-menu-item [:a {:href (:target menu)} (:label menu)]]))]])

(defn base-page [body & scr]
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
    
   [:body
    [:div#wrap
     [:nav {:class "navbar navbar-default" :role "navigation"}
      [:div.container-fluid
       [:div.navbar-header
        [:button.navbar-toggle {:type "buton" :data-toggle "collapse" :data-target "#bs-example-navbar-collapse-1"}
         [:span.sr-only "Toggle navigation"]
         [:span.icon-bar]
         [:span.icon-bar]
         [:span.icon-bar]]
        [:a#home-logo.navbar-brand {:href "/"} [:img {:src "imgs/osio.svg"}]]
        [:ul {:class "nav navbar-nav"}
         [:li [:a {:href "/services"} "Services"]]]]
       [:div {:class "collapse navbar-collapse" :id "bs-example-navbar-collapse-1"}
        [:ul {:class "nav navbar-nav navbar-right"}
         (for [menu menus]
           (if (= :navbar (:location menu))
             (if (:children menu)
               [:li.dropdown [:a.dropdown-toggle {:href "#" :data-toggle "dropdown"} (:label menu) [:b.caret]]
                [:ul.dropdown-menu
                 (for [child (:children menu)]
                   [:li [:a {:href (:target child)} (:label child)]])]]
               [:li [:a {:href (:target menu)} (:label menu)]]
               )))]]]]
     logo-area
     [:div.row
      [:div.col-sm-2
       [:div.sidebar-nav
        side-menu]]
      [:div.col-sm-9
       body]
      [:div#ankha]]
     [:script {:src "js/jquery.min.js"}]
     [:script {:src "js/helpers.js"}]
     [:script {:src "js/bootstrap.min.js"}]
     [:script {:src "js/react-0.9.0.js"}]
     ;;cljs
     [:script {:src "cljs/cljs.js"}]
     [:script {:src "cljs/azondi.js"}]
     [:script {:src "cljs/logo.js"}]]
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
     
     ]
     scr
    ]))

;;; We need to pull out the user details from the session
(defn devices-page []
  (base-page
   [:div
    [:h2 "Devices"]
    [:div#content [:p.loading "Loading..."]]]
   [:script "azondi.main.devices_page('yods');" ]))

(defn topics-page []
  (base-page
   [:div
    [:h2 "Topics"]
    [:div#content [:p.loading "Loading..."]]]
   [:script "azondi.main.topics_page('yods');" ]))

(defn reset-password-page []
  (base-page
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
(defn api-page []
  (base-page
   [:div
    [:div.row "Your user info:"]
    [:div.row
     [:span "user: "] [:strong [:span#api-info-user-id ]]
     ]
    [:div.row
     [:span "API: "]  [:strong [:span#api-info-api-key-view ]]]
    [:div.row
     [:a#api-info-api-key-link {:href "#"} "reset the API key..."]]
    [:div.row
     [:span "please add:"]
     [:pre
      [:span#uuid-api-view]
      ]
     [:span " to your API calls."]]
    [:hr]
    [:div "All of the API calls should be made to " [:code "opensensors.IO"]]
    [:div "Authorization is achieved by adding the following HTTP header"]
    [:pre#api-authorisation-key "Authorization: api-key "]
    [:h3#api-devices-url]
    [:p "Send a PUT request to this address to create new devices for your user. The API expects a JSON map with optional entries describing the device's metadata. Each PUT will return a JSON map, containing the following entries :-"]
    [:ul
     [:li "client-id : the client id to use for your device when connecting to the opensensors.io MQTT broker"]
     [:li "user : the user name to use when connecting (this is the same as your username)"]
     [:li "password : the password to use when connecting"]
     [:li "device-id : the device id, you can publish to any topics below this path"]]

    [:h3#api-topics-url]
    [:p "Send a GET request this address to return your existing devices."]]
   [:script "populate_api_page ()"]))