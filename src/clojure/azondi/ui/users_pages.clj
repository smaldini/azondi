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

(defn render-users-page [req body]
  (render-resource "templates/users-page.html.mustache" {}
                   {:header (slurp (resource "templates/header.html.mustache"))
                    :navbar (display-navs req (:cylon/subject-identifier req))
                    :scripts (slurp (resource "templates/scripts.html.mustache")) 
                    :footer (slurp (resource "templates/footer.html.mustache"))
                    :body (slurp (resource body))
                    :script (format "azondi.main.devices_page(\"%s\", \"%s\");\n"
                                    (:cylon/subject-identifier req)
                                     (:cylon/access-token req))}))


