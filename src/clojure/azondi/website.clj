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
          [:form
            {:border "1px dotted #aaa"
             :padding (em 1)}
           [:div.field {:padding (em 0.5)}]
           [:label {:margin-right (em 1)}]
           [:input {:padding (em 0.5)}]
           ]
          [:p.loading {:color "#aaa" :font-size (pt 32)}]
          [:label.optional {:color "#aaa"}]
          [:h1 :h2 :h3 {:color (rgb 0 0 154)}]
          [:th {:padding-left (em 0.5)}]
          [:td {:font-family "monospace" :font-size (pt 12) :padding-left (em 0.5)}]
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
     ::list-devices (wrap-template
                     (fn [req] {:body (html [:div
                                             [:h1 "Devices"]
                                             [:div#content [:p.loading "Loading..."]]])
                                :cljs "azondi.main.list_devices_page()"
                                }))
     ::new-device (wrap-template
                   (fn [req] {:body (html [:div
                                           [:h1 "New device"]
                                           [:div#content [:p.loading "Loading..."]]])
                              :cljs "azondi.main.new_device_page()"
                              }))
     ::styles styles})

  (routes [_]
    ["/" [["" (->Redirect 307 ::index)]
          ["" (->ResourcesMaybe {:prefix "public/"})]

          ["index" ::index]
          ["css/style.css" ::styles]
          ["devices/" {"list" ::list-devices
                       "new" ::new-device}]
          ]])

  (uri-context [_] "")

  MenuItems
  (menu-items [_ context]
    [{:label "Home" :order "A1" :href ::index}
     {:label "New device" :order "B1" :href ::new-device :parent "Devices"}
     {:label "List devices" :order "B2" :href ::list-devices :parent "Devices"}
     ]))

(defn new-website []
  (->Website))
