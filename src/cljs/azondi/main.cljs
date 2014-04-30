(ns azondi.main
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [clojure.string :as string]
   [cljs.reader :as reader]
   [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
   [om.core :as om :include-macros true]
   [sablono.core :as html :refer-macros [html]]
   [ajax.core :refer (GET PUT POST DELETE ajax-request)]
   [ankha.core :as ankha]
   [goog.events :as events]))

(enable-console-print!)

(def hostname "localhost")

(def app-model (atom {:user "alice"
                      :devices []
                      :device nil}))

(defn error-handler [{:keys [status status-text] :as response}]
  (println (str "Error: " status " " status-text)))

(defn devices-list [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      (GET (str "/api/1.0/users/" (:user app-state) "/devices/")
          {:handler (fn [body]
                      (println "Got body" body)
                      (om/update! app-state :devices (get body "devices")))
           :error-handler error-handler
           :response-format :json
           :format :json}))
    om/IRender
    (render [this]
      (println "Rendering devices list" (:devices app-state))
      (html
       [:table
        [:thead
         [:tr
          [:th "Client id"]
          [:th "Name"]
          [:th "Description"]]
         ]
        [:tbody
         (for [d (:devices app-state)]
           [:tr
            [:td (get d "clientId")]
            [:td (get d "name")]
            [:td (get d "description")]])
         ]]))))


(defn new-device-form [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:form {:onSubmit (fn [ev]
                           (.preventDefault ev)
                           (POST (str "/api/1.0/users/" (:user @app-state) "/devices/")
                               {:handler (fn [body]
                                           (println "Got body back!" (get body "clientId"))
                                           (om/update! app-state [:device :client-id] (get body "clientId"))
                                           (om/update! app-state [:device :password] (get body "password"))
                                           (om/transact! app-state :devices #(conj % body)))
                                :error-handler error-handler
                                :response-format :json
                                :params {}
                                :format :json})
                           )}
        [:input {:type "submit" :value "New device" :style {:background "#8e8" :border "1px solid black"}}]]))))

(defn device-details-form [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        [:form {:onSubmit (fn [ev]
                            (.preventDefault ev)
                            (if-let [id (get-in @app-state [:device :client-id])]
                              (PUT (str "/api/1.0/users/" (:user @app-state) "/devices/" id)
                                  {:handler (fn [body] (println "Got body back!" body))
                                   :error-handler error-handler
                                   :response-format :json
                                   :params {"name" "abc"
                                            "description" "def"}
                                   :format :json})
                              (println "No client id"))
                            )}

         [:h2 "Device details"]

         [:div.field
          [:label "Client id"]
          [:input {:name "id" :type "text" :value (get-in app-state [:device :client-id]) :editable false :disabled true}]]

         [:div.field
          [:label.optional "Name"]
          [:input {:name "name" :type "text" :value (get-in app-state [:device :name])}]]

         [:div.field
          [:label.optional "Description"]
          [:input {:name "description" :style {:width "90%"}
                   :type "text" :value (get-in app-state [:device :name])}]]

         [:div
          [:input {:name "action" :type "submit" :value "Update device" :style {:background "#8e8" :border "1px solid black"}}]]

         ]
        [:form {:onSubmit (fn [ev]
                            (.preventDefault ev)
                            (if-let [id (get-in @app-state [:device :client-id])]
                              (PUT (str "/api/1.0/users/" (:user @app-state) "/devices/" id)
                                  {:handler (fn [body] (println "Got body back!" body))
                                   :error-handler error-handler
                                   :response-format :json
                                   :params {}
                                   :format :json})
                              ))}
         [:h2 "Delete device"]
         [:p "Deleting this device is permanent"]
         [:input {:name "action" :type "submit" :value "Delete device" :style {:background "red" :border "1px solid black"}}]]

        [:h3 "Test this device"]
         [:h4 "Mosquitto"]
         [:pre (str "mosquitto_pub"
                    " -h " hostname
                    " -i " (-> app-state :device :client-id)
                    " -u " (:user app-state)
                    " -P " (-> app-state :device :password)
                    " -t " "test"
                    " -m " "'This is a test'"
                    )]]))))

(defn list-devices-page-component [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (om/build devices-list app-state)]))))

(defn ^:export list-devices-page []
  (om/root list-devices-page-component app-model {:target (. js/document (getElementById "content"))}))

(defn new-device-page-component [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (om/build new-device-form app-state)
        (when (:device app-state)
          (om/build device-details-form app-state))])
      )))

(defn ^:export new-device-page []
  (om/root new-device-page-component app-model {:target (. js/document (getElementById "content"))}))
