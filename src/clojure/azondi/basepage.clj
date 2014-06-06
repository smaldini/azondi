(ns azondi.basepage
  (:require
   [hiccup.page :refer (html5)]
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
     {:label "Login"
      :security :none
      :location :navbar
      :target "/login"}
     {:label "Logout"
      :security :user
      :location :navbar
      :target "/logout"}
     {:label "Getting Started"
      :security :user
      :location :navbar
      :target "/help"}])

(def logo-area
  [:div#header
   [:div.jumbotron
    [:div#logoarea {:class "vcenter"}
     [:h1 "opensensors.IO" [:sup "beta"]]
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
    [:link {:href "css/bootstrap.min.css" :rel "stylesheet"}]
    [:link {:href "http://fonts.googleapis.com/css?family=Montserrat" :rel "stylesheet"}]
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
        [:a.navbar-brand {:href "/"} "Home"]
        [:ul {:class "nav navbar-nav"}
         [:li [:a {:href "/services"} "Services"]]]]
       [:div {:class "collapse navbar-collapse" :id "bs-example-navbar-collapse-1"}
        [:ul {:class "nav navbar-nav navbar-right"}
         (for [menu menus]
           (if (= :navbar (:location menu))
             [:li [:a {:href (:target menu)} (:label menu)]]))]]]]
     logo-area
     [:div.row
      [:div.col-sm-2
       [:div.sidebar-nav
        side-menu]]
      [:div.col-sm-9
       body]
      [:div#ankha]]
     [:script {:src "js/jquery.min.js"}]
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

(defn devices-page []
  (base-page
   [:div
    [:h1 "Devices"]
    [:div#content [:p.loading "Loading..."]]]
   [:script "azondi.main.devices_page('alice');" ]))

(defn topics-page []
  (base-page
   [:div
    [:h1 "Devices"]
    [:div#content [:p.loading "Loading..."]]]
   [:script "azondi.main.topics_page('alice');" ]))

