(ns azondi.main
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [clojure.string :as string]
   [cljs.reader :as reader]
   [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
   [om.core :as om :include-macros true]
   [sablono.core :as html :refer-macros [html]]
   [ajax.core :refer (GET PUT POST ajax-request)]
   [ankha.core :as ankha]
   [azondi.ajax :as ajax :refer (ajaj<)]
   [goog.events :as events]
   [azondi.csk :as csk]
   ))

(enable-console-print!)

(def hostname "localhost")

(def app-model (atom {:user "alice"
                      :devices []
                      :device nil
                      :test-card {:messages []}}))

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
       [:form.form-horizontal
        {:onSubmit (fn [ev]
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
        [:div.control-group
         [:div.controls
          [:input.btn.btn-primary {:type "submit" :value "New device"}]]]]))))

(defn device-details-form [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        [:form.form-horizontal
         {:onSubmit (fn [ev]
                      (.preventDefault ev)
                      (println "Name is " (om/get-state owner :name))
                      (println "Description is " (om/get-state owner :description))
                      (if-let [id (get-in @app-state [:device :client-id])]
                        (PUT (str "/api/1.0/users/" (:user @app-state) "/devices/" id)
                            {:handler (fn [body] (println "Got body back!" body))
                             :error-handler error-handler
                             :response-format :json
                             :params {"name" "abc"
                                      "description" "def"}
                             :format :json})
                        )
                      )}
         [:div.control-group
          [:label.control-label "Client id"]
          [:div.controls
           [:input {:name "id" :type "text" :value (get-in app-state [:device :client-id]) :editable false :disabled true}]]]

         [:div.control-group
          [:label.control-label "Name"]
          [:div.controls
           [:input {:name "name"
                    :type "text"
                    :defaultValue (get-in app-state [:device :name])
                    :onChange (fn [e] (om/set-state! owner :name (.-value (.-target e))))
                    :placeholder "optional device name"}]]]

         [:div.control-group
          [:label.control-label "Description"]
          [:div.controls
           [:input {:name "description" :style {:width "90%"}
                    :type "text"
                    :defaultValue (get-in app-state [:device :description])
                    :onChange (fn [e] (om/set-state! owner :description (.-value (.-target e))))
                    :placeholder "optional description"}]]]

         [:div.control-group
          [:div.controls
           [:input.btn {:name "action" :type "submit" :value "Update device"}]]]

         ]

        ;; Delete device
        [:form.form-horizontal
         #_{:onSubmit (fn [ev]
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
         [:input.btn.btn-danger {:name "action" :type "submit" :value "Delete device"}]]

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
  (om/root new-device-page-component app-model {:target (. js/document (getElementById "content"))})
  (om/root ankha/inspector app-model {:target (. js/document (getElementById "ankha"))}))


(defn test-card-page-component [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      (let [c (chan)
            in (ajaj< c)]
        (go-loop []
          (when-let [data (<! in)]
            (prn data)
            (om/transact! app-state [:test-card :messages] #(conj % (pr-str data)))
            (recur)))
        (om/set-state! owner :channel c)))

    om/IRender
    (render [this]
      (html
       [:div [:h1 "Test Card"]
        [:p "Click on the buttons to test the API."]
        [:p "This demonstrates (and tests) that the JSON messages of the API are rendered as canonical JSON with camelCase keys. Check this by analysing the request/response of each message with the Developer Tools of your browser."]
        [:p "The use of the " [:code "ajaj<"] " core.async function ensures that the ClojureScript code doesn't have to deal with JSON. Check this by looking at the format of the messages printed below. They should be in canonical EDN format with kebab-case keywords."]
        [:p
         [:button.btn.btn-primary
          {:onClick #(go (>! (om/get-state owner :channel) {:uri "/api/1.0"}))}
          "Welcome in JSON"]
         [:button.btn
          {:onClick #(om/update! app-state [:test-card :messages] [])}
          "Clear"]]
        [:h2 "Messages"]
        (for [msg (get-in app-state [:test-card :messages])]
          [:p msg]
          )
        ]))))

(defn ^:export test-card []
  (om/root test-card-page-component app-model {:target (. js/document (getElementById "content"))}))
