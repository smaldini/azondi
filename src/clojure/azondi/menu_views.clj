(ns azondi.menu-views
  (:require
   [com.stuartsierra.component :as component]
   [modular.menu :refer (MenuItems menu-items)]
   [modular.template :refer (TemplateModel)]
   [bidi.bidi :refer (path-for)]
   [hiccup.core :refer (html)]
   ;;[cylon.core :refer (allowed-handler?)]
   [schema.core :as s]))

(defrecord NavbarMenu []
  TemplateModel
  (template-model [this {{routes :modular.bidi/routes :as req} :request}]
    (let [menu (menu-items (:menu-index this))]
      {:menu
       (html
        (apply concat
               (for [[parent items] menu]
                 (let [listitems
                       (remove nil?
                               (for [{:keys [target order label args visible? location] :or {visible? (constantly true)} :as ctx} items :when (= location :navbar)]
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

(defn new-navbar-menu []
  (component/using (->NavbarMenu) [:menu-index]))

(defrecord SidebarMenu []
  TemplateModel
  (template-model [this {{routes :modular.bidi/routes :as req} :request}]
    (let [menu (menu-items (:menu-index this))]
      {:menu
       (html
        (apply concat
               (for [[parent items] menu]
                 (let [listitems
                       (remove nil?
                               (for [{:keys [target order label args visible? location] :or {visible? (constantly true)} :as ctx} items :when (= location :sidebar)]
                                 (when (visible? (-> ctx
                                                     (assoc :request req)
                                                     (dissoc :visible?)))
                                   [:li.side-menu-item [:a {:href (apply path-for routes target args)} label]])))]
                   
                   (list [:div.navbar-header
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
                           )) ))))})))

(defn new-sidebar-menu []
  (component/using (->SidebarMenu) [:menu-index]))
