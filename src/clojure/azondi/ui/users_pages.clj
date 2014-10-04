(ns azondi.ui.users-pages
  (:require [com.stuartsierra.component :as component]
            [clostache.parser :refer (render-resource)]
            [clojure.java.io :as io]
            [modular.bootstrap :refer (ContentBoilerplate)]
            [cylon.session :refer (session)]
            [cylon.authentication :refer (get-subject-identifier)]
            [clojure.java.io :refer (resource)]
            [hiccup.core :refer (html)]))


;; devices page
;; topics page
;; api

(defn menus [req]
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
      :target "/api-docs"
      :children [{:label "API Keys"
                  :security :user
                  :target "/api-docs"}
                 {:label "Devices"
                  :security :user
                  :target "/api-docs#devices-api-info"}
                 {:label "Topics"
                  :security :user
                  :target "/api-docs#topics-api-info"}
                 {:label "Streaming Api"
                  :security :user
                  :target "/api-docs#firehose-api-info"}
                 {:label "Messages"
                  :security :user
                  :target "/api-docs#messages-api-info"}]}
     {:label "Sign up"
     :security :none
     :location :navbar
     :target "/signup"}
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
      :target "/devices"}
     {:label "Logout"
      :security :user
      :location :navbar
      :target "/logout"}])


;;To do
;; render navbar
;; create devices, topics & api pages
(defn displayed? [menu user]
  (case (:security menu)
    :user user
    :all true
    :none (nil? user)
    true))


(defn display-navs [req user]
  (render-resource "templates/navbar.html.mustache" {}
                   {:navbar-menu (html (for [menu (menus req)
                                             :when (and (displayed? menu user)
                                                        (= :navbar (:location menu)))]
                                         (if (:children menu)
                                           [:li.dropdown [:a.dropdown-toggle
                                                          {:href "#" :data-toggle "dropdown"} (:label menu) [:b.caret]]
                                            [:ul.dropdown-menu
                                             (for [child (:children menu)
                                                   :when (displayed? child user)]
                                               [:li [:a {:href (:target child)} (:label child)]])]]
                                           [:li [:a {:href (:target menu)} (:label menu)]])))

                    :side-menu (html (for [menu (menus req)
                                             :when (and (displayed? menu user)
                                                        (= :sidebar (:location menu)))]
                                       (if (:children menu)
                                         [:div.accordion-group
                                          [:div.accordion-heading
                                           [:li.side-menu-item
                                            [:a.accordion-toggle
                                             {:data-toggle "collapse" :data-parent "#leftMenu" :href (str "#" (:label menu))} (:label menu)]]
                                           [:div {:id (:label menu) :class "accordion-body collapse" }
                                            [:div.accordion-inner
                                             [:ul
                                              (for [child (:children menu)
                                                    :when (displayed? child user)]
                                                [:li [:a {:href (:target child)} (:label child)]])]]]]]                                            [:li.side-menu-item [:a {:href (:target menu)} (:label menu)]])))}))

(defn render-users-page [req script]
  (render-resource "templates/users-page.html.mustache" {}
                   {:header (slurp (resource "templates/header.html.mustache"))
                    :navbar (display-navs req (:cylon/subject-identifier req))
                    :scripts (slurp (resource "templates/scripts.html.mustache")) 
                    :footer (slurp (resource "templates/footer.html.mustache"))
                    :script script
                    :body (html [:p "Loading...."])}))

(defn reset-password-page [req]
  (render-resource "templates/users-page.html.mustache" {}
   {:header (slurp (resource "templates/header.html.mustache"))
                    :navbar (display-navs req (:cylon/subject-identifier req))
                    :scripts (slurp (resource "templates/scripts.html.mustache")) 
                    :footer (slurp (resource "templates/footer.html.mustache"))
    :script (format "populate_api_page ('%s')" (:cylon/subject-identifier req)) 
    :body (html [:div#pword-reset
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
                  ]])}))

(defn render-api-page [req]
  (render-resource "templates/users-page.html.mustache" {}
                   {:header (slurp (resource "templates/header.html.mustache"))
                    :navbar (display-navs req (:cylon/subject-identifier req))
                    :scripts (slurp (resource "templates/scripts.html.mustache")) 
                    :footer (slurp (resource "templates/footer.html.mustache"))
                    :script (format "populate_api_page ('%s')" (:cylon/subject-identifier req))
                    :body (html [:div
                                 [:div.row
                                  [:div#api-info.col-xs-10
                                   [:div#your-api-keys
                                    [:h3 "Your API Key"]
                                    [:span "api-key: "] [:strong [:span.api-info-api-key-view]] [:br]
                                    [:p "Please keep this information secure"] [:br]
                                    [:a#api-info-api-key-link {:href "#"} "reset your API key..."]]

                                   [:div
                                    [:div "All API calls should be made to " [:code [:span#api-host-name] ]]
                                    [:h3 [:b "Authentication"]]
                                    [:div "Authorization is achieved by adding the following HTTP header"]
                                    [:pre#api-authorisation-key "Authorization: api-key " [:span.api-info-api-key-view]]]

                                   [:hr]

                                   [:div#devices-api-info
                                    [:h2 "Devices"]
                                    [:h3 [:b "List of Devices"]]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' " [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/devices/"]
                                    [:h3 [:b "New Devices"]]
                                    [:p "Send a POST request to this address to create new devices. Each POST will return a JSON map, containing the following entries :-"]
                                    [:pre "curl -X POST -H 'Authorization: api-key " [:span.api-info-api-key-view] "' " [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/devices/ -d '{}'"]
                                    [:ul
                                     [:li "client-id : the client id to use for your device when connecting to the opensensors.io MQTT broker"]
                                     [:li "ownerUserId : the user name to use when connecting (this is the same as your username)"]
                                     [:li "password : the password to use when connecting with the device"]
                                     [:li "name : the name of the device"]
                                     [:li "description : the description of the device"]]

                                    [:div
                                     [:h3 [:b "Update Devices"]]
                                     [:p "Send a PUT request to this address ending with a device id to update the device details. The request should have a JSON map with entries to be updated currently name and description"]]]
                                   [:hr]

                                   [:div#topics-api-info
                                    [:h2 "Topics"]
                                    [:h3 [:b "List of Topics"]]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' " [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/topics/"]]
                                   [:hr]

                                   [:div#firehose-api-info
                                    [:h2 "Real Time Data"]
                                    [:p "Get the streaming data feed of all topics you are subscribed to using"]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' " [:span#api-host-name] "/events/users/" [:span#api-info-user-id]]]
                                   [:hr]

                                   [:div#messages-api-info
                                    [:h2 "Messages"]
                                    [:p "List of Messages By Owner"]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' '" [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/messages-by-owner'"]

                                    [:p "List of Messages By Owner And Date"]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' '" [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/messages-by-owner?start-date=2014-07-08&end-date=2014-08-08'"]


                                    [:p "List of Messages By Topic"]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' '" [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/messages-by-topic?topic=/the-topic/you-want'"]

                                    [:p "List of Messages By Topic And Date"]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' '" [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/messages-by-topic?topic=/the-topic/you-want&start-date=2014-07-08&end-date=2014-08-08'"]

                                    [:p "List of Messages By Device/Client"]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' '" [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/messages-by-device?client=1'"]

                                    [:p "List of Messages By Device/Client And Date"]
                                    [:pre "curl -X GET -H 'Authorization: api-key " [:span.api-info-api-key-view] "' ' " [:span#api-host-name] "/api/1.0/users/" [:span#api-info-user-id] "/messages-by-device?client=1&start-date=2014-07-08&end-date=2014-08-08'"]]
                                   [:hr]]]])}))
