(ns azondi.sidebar
  (:require
   [com.stuartsierra.component :as component]
   [modular.template :refer (TemplateModel)]
   [bidi.bidi :refer (path-for)]
   [hiccup.core :refer (html)]
   [schema.core :as s]))


;; take routes
;; with parent
;; and child lists
;; not parent just show as a link
;; if it is a parent then make an accordion

(defprotocol MenuItems
  (menu-items [_ context]))

;; If there is a protection system... see accounting2 eae2f02 src/juxt/accounting/menu.clj
#_(when-let [{:keys [handlers]} (-> this :protection-system :login-form)]
                  [(if-not (:cylon.core/session req)
                     {:label "Login" :order "Z" :handler (:login handlers)}
                     {:label "Logout" :order "Z" :handler (:logout handlers)})])

(defrecord MenuIndex []
  MenuItems
  (menu-items [this context]
    (s/validate {:request {s/Keyword s/Any}} context)
    (->> this
         vals
         (filter (partial satisfies? MenuItems))
         (mapcat #(menu-items % context))
         (remove nil?)
;; (filter (partial show-menu-item? (:request context)))
         (sort-by :order)
         (group-by :parent)
         seq
         (sort-by (comp nil? first)))))

(defn new-menu-index []
  (->MenuIndex))

(defrecord SideMenu []
  TemplateModel
  (template-model [this {{routes :modular.bidi/routes :as req} :request :as context}]
    (let [menu (menu-items (:menu-index this) context)]
      {:menu
       (html
        (apply concat
               (for [[parent items] menu]
                 (for [{:keys [href order label args]} items]
                   (if (not (= label "Home"))
                     [:li [:a {:href (apply path-for routes href args)} label]])))))})))

(defn new-bootstrap-menu []
  (component/using (->SideMenu) [:menu-index]))
