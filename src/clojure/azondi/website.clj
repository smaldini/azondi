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
   [hiccup.core :refer (html)]))

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
                              :cljs "azondi.main.topics_page()"
                              }))
     ::new-topic (wrap-template
                  (fn [req] {:body (html [:div
                                          [:h1 "New Topic"]
                                          [:div#content [:p.loading "Loading..."]]])
                             :cljs "azondi.main.new_topic_page()"}))

     ::test-card (wrap-template
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
          ["topics/" ::topics]
          ["developer/" {"test-card" ::test-card}]

          ]])

  (uri-context [_] "")

  MenuItems
  (menu-items [_ context]
    [{:label "Home" :order "A1" :href ::index}
     {:label "Devices" :order "B1" :href ::devices :parent "My"}
     {:label "Topics" :order "B2" :href ::topics :parent "My"}
     {:label "Test Card" :order "T1" :href ::test-card :parent "Developer"}
     ]))

(defn new-website []
  (->Website))
