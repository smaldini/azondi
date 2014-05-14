(ns azondi.sidemenu
  (:require
   [com.stuartsierra.component :as component]
   [modular.template :refer (TemplateModel)]
   [bidi.bidi :refer (path-for)]
   [hiccup.core :refer (html)]
   ;;[cylon.core :refer (allowed-handler?)]
   [schema.core :as s]))

(defprotocol MenuItems
  (menu-items [_]))

(defrecord MenuIndex []
  MenuItems
  (menu-items [this]
    (->> this
         vals
         (filter (partial satisfies? MenuItems))
         (mapcat menu-items)
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
  (template-model [this {{routes :modular.bidi/routes :as req} :request}]
    (let [menu (menu-items (:menu-index this))]
      {:menu
       (html
        (apply concat
               (for [[parent items] menu]
                 (let [listitems
                       (remove nil?
                               (for [{:keys [target order label args visible?] :or {visible? (constantly true)} :as ctx} items]
                                 (when (visible? (-> ctx
                                                     (assoc :request req)
                                                     (dissoc :visible?)))
                                   [:li [:a {:href (apply path-for routes target args)} label]])))]

                   (if (and parent (not-empty listitems))
                     (list
                      [:li [:a {:data-toggle "collapse"
                                :data-parent "#accordion"
                                :href (str "#" parent)
                                :class "collapsed"
                                } parent]]
                      [:div {:id (str parent) :class "collapse out"}
                       [:ul listitems]])
                     listitems
                     )))))})))

(defn new-side-menu []
  (component/using (->SideMenu) [:menu-index]))

(defrecord NavMenu []
  TemplateModel
  (template-model [this {{routes :modular.bidi/routes :as req} :request}]
    (let [menu (menu-items (:nav-index this))]
      {:navmenu
       (html
        (apply concat
               (for [[parent items] menu]
                 (let [listitems
                       (remove nil?
                               (for [{:keys [target order label args visible?] :or {visible? (constantly true)} :as ctx} items]
                                 (when (visible? (-> ctx
                                                     (assoc :request req)
                                                     (dissoc :visible?)))
                                   [:li [:a {:href (apply path-for routes target args)} label]])))]

                   (if (and parent (not-empty listitems))
                     (list
                      [:li.dropdown]
                      [:div {:id (str parent) :class "collapse out"}
                       [:a.dropdown-toggle {:data-toggle "dropdown"} parent [:b.caret]]
                       [:ul.dropdown-menu listitems]])
                     listitems
                     )))))})))

(defn new-nav-menu []
  (component/using (->NavMenu) [:menu-index]))
