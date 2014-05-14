(ns azondi.website
  (:require
   [clojure.java.io :as io]
   [bidi.bidi :refer (->Redirect ->ResourcesMaybe)]
   [modular.bidi :refer (WebService)]
   [modular.template :refer (wrap-template)]
   [modular.menu :refer (MenuItems)]
   [garden.core :refer (css)]
   [garden.units :refer (pt em px)]
   [garden.color :refer (rgb)]
   [markdown.core :as md]
   [hiccup.core :refer (html)]
   ))

(defn md->html
  "Reads a markdown file/resource and returns an HTML string"
  [r]
  (md/md-to-html-string (slurp r)))

(defn styles [req]
  {:headers {"Content-Type" "text/css"}
   :body (css
          [:p.loading {:color "#aaa" :font-size (pt 32)}]
          [:label.optional {:color "#aaa"}]
          [:button {:margin (em 0.5)}]

          ;;[:h1 :h2 :h3 {:color (rgb 0 0 154)}]
          [:th {:padding-left (em 0.5)}]
          ;;[:td {:font-family "monospace" :font-size (pt 12) :padding-left (em 0.5)}]
          [:td.numeric {:text-align :right}]
          [:th.numeric {:text-align :right}]
          [:div.container-narrow {:margin-left (pt 10) :font-size (pt 12)}]
          [:dt {:float :left}]
          [:dd {:margin-left (em 12 )}]
          [:p {:width (em 60)}]
          [:div.index {:padding-left (em 2)
                       :padding-top (em 1)
                       }])})

(defrecord Website []

  WebService

  (ring-handler-map [_]
    {::index (wrap-template (fn [req] {:body (md->html (io/resource "markdown/index.md"))}))
     ::help (wrap-template (fn [req] {:body (md->html (io/resource "markdown/getting-started.md"))}))
     ::about (wrap-template (fn [req] {:body (md->html (io/resource "markdown/about-us.md"))}))
     ::terms (wrap-template (fn [req] {:body (md->html (io/resource "markdown/terms.md"))}))
     ::services (wrap-template (fn [req] {:body (md->html (io/resource "markdown/services.md"))}))
     ::devices (wrap-template
                   (fn [req] {:body (html [:div
                                           [:h1 "Devices"]
                                           [:div#content [:p.loading "Loading..."]]])
                              :cljs (format "azondi.main.devices_page(\"%s\")" (:cylon/user req))
                              }))

     ::topics (wrap-template
                   (fn [req] {:body (html [:div
                                           [:h1 "Topics"]
                                           [:div#content [:p.loading "Loading..."]]])
                              :cljs (format "azondi.main.topics_page(%s)"
                                            (when-let [user (:cylon/user req)]
                                              (format "\"%s\"" user)
                                              "null"))
                              }))

     ::test-card (wrap-template
                  (fn [req] {:body (html [:div
                                          [:div#content [:p.loading "Loading..."]]])
                             :cljs "azondi.main.test_card()"
                             }))

     ;;for now it will be a test card
     ::reset-password (wrap-template
                       (fn [req] {:body (html [:div
                                          [:div#content [:p.loading "Loading..."]]])
                             :cljs "azondi.main.test_card()"
                             }))



     ::styles styles})

  (routes [_]
    ["/" [["" (->Redirect 307 ::index)]
          ["" (->ResourcesMaybe {:prefix "public/"})]

          ["index" ::index]
          ["css/style.css" ::styles]
          ["devices/" ::devices]
          ["devices" (->Redirect 307 ::devices)]
          ["topics/" ::topics]
          ["topics" (->Redirect 307 ::topics)]
          ["developer/" {"test-card" ::test-card}]
          ["help/" ::help]
          ["about" ::about]
          ["reset-password" ::reset-password]
          ["terms" ::terms]
          ["services" ::services]
          ]])

  (uri-context [_] "")

  MenuItems
  (menu-items [this]
    [
     {:label "Devices"
      :order "B1"
      :target ::devices
      :visible? (fn [ctx] (-> ctx :request :cylon/user))
      :location :sidebar}

     {:label "Topics"
      :order "B2"
      :target ::topics
      :visible? (fn [ctx] (-> ctx :request :cylon/user))
      :location :sidebar}

     #_{:label "Test Card"
      :order "T1"
      :target ::test-card
      }

     {:label "Login"
      :order "L1"
      :target [:login-form :login]
      :visible? (fn [ctx] (nil? (-> ctx :request :cylon/user)))
      :location :navbar}

     {:label "Logout"
      :order "L2"
      :target [:login-form :logout]
      :visible? (fn [ctx] (-> ctx :request :cylon/user))
      :location :navbar}

     {:label "Getting Started"
      :order "C1"
      :target ::help
      :visible? (fn [ctx] (-> ctx :request :cylon/user))
      :location :navbar}

     #_{:label "Reset Password"
      :order "C2"
      :target ::reset-password
      :parent "Account"
        :visible? (fn [ctx] (-> ctx :request :cylon/user))}]))

(defn new-website []
  (->Website))

(defn render-custom-login-form [requested-uri action login-status]
  ;; If login status is :failed, you can generated a banner thing
  (html [:form.form-set {:method "POST"
                         :action action
                         :id "sign-in-form"}
         (when (not-empty requested-uri)
           [:input {:type "hidden" :name :requested-uri :value requested-uri}])
         [:h2 "Sign In"]
         (when requested-uri
           ;; If requested-uri is not nil, you should add it as a hidden field.
           [:input {:type "hidden" :name :requested-uri :value requested-uri}])
         (when login-status
           [:p "foo"]
           [:div.alert.alert-warning
            [:button.close {:type "button" :data-dismiss "alert"} "x"]"Incorrect Login Details"])
         [:input.form-control {:id "username" :name "username" :type "input" :placeholder "user id"}]
         [:input.form-control {:id "password" :name "password" :type "password" :placeholder "password"}]
         [:button {:class "btn btn-lg btn-primary pull-right" :type "submit"} "Sign In"]
         ]))
