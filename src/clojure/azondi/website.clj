(ns azondi.website
  (:require
   [bidi.bidi :refer (->Redirect ->ResourcesMaybe)]
   [modular.bidi :refer (WebService)]
   [modular.template :refer (wrap-template)]
   [garden.core :refer (css)]
   [garden.units :refer (pt em)]
   [garden.color :refer (rgb)]))

(defn styles [req]
  {:headers {"Content-Type" "text/css"}
   :body (css
          [:h1 :h2 :h3 {:color (rgb 0 0 154)}]
          [:td {:font-family "monospace" :font-size (pt 12)}]
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
    {:index (wrap-template (fn [req] {:body "Hi"}))
     :styles styles})

  (routes [_]
    ["" [["" (->Redirect 307 :index)]
         ["index" :index]
         ["css/style.css" :styles]
         ["" (->ResourcesMaybe {:prefix "public/"})]]])

  (uri-context [_] "/"))

(defn new-website []
  (->Website))
