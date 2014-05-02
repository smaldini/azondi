(ns azondi.main
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [clojure.string :as string]
   [cljs.reader :as reader]
   [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
   [om.core :as om :include-macros true]
   [sablono.core :as html :refer-macros [html]]
   [ankha.core :as ankha]
   [azondi.ajax :as ajax :refer (ajaj<)]
   [goog.events :as events]
   [chord.client :refer [ws-ch]]
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
      (let [ajax-req (chan)
            ajax-resp (ajaj< ajax-req
                             :method :get
                             :uri (str "/api/1.0/users/" (:user app-state) "/devices/"))]
        (go
          (>! ajax-req {})
          (let [r (<! ajax-resp)]
            (println "Response is" r)
            (om/update! app-state :devices (:devices (:body r)))))))
    om/IRender
    (render [this]
      (html
       [:table
        [:thead
         [:tr
          [:th "Client id"]
          [:th "Name"]
          [:th "Description"]]
         ]
        [:tbody
         (for [{:keys [client-id name description]} (:devices app-state)]
           [:tr
            [:td.numeric [:a  {:onClick (fn [ev]
                                          (.preventDefault ev)
                                          (let [req (chan)
                                                resp (ajaj< req :method :get)]
                                            (go
                                              (>! req
                                                  {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/" client-id)
                                                   :content {}})
                                              (let [{:keys [status body] :as response} (<! resp)]
                                                (println "Response to GET is" response)
                                                (when (= status 200)
                                                  (om/update! app-state [:device] body))
                                                ))))} client-id]]
            [:td name]
            [:td description]])
         ]]))))


(defn new-device-button [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:form.form-horizontal
        {:onSubmit (fn [ev]
                     (.preventDefault ev)
                     (let [req (chan)
                           resp (ajaj< req :method :post)]
                       (go
                         (>! req
                             {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/")
                              :content {}})
                         (let [{:keys [status body] :as response} (<! resp)]
                           (println "Response to POST is" response)
                           (when (= status 201)
                             (om/update! app-state [:device] body)
                             (om/transact! app-state :devices #(conj % body)))
                           ))))}
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
                      (let [req (chan)
                            resp (ajaj< req :method :put)]
                        (if-let [id (get-in @app-state [:device :client-id])]
                          (go
                            (>! req
                                {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/" id)
                                 :content-type "application/json"
                                 :content {:name (om/get-state owner :name)
                                           :description (om/get-state owner :description)}})
                            (let [response (<! resp)]
                              (println "Response to PUT is" response))))))}

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
           [:input.btn {:name "action" :type "submit" :value "Update device"}]]]]



        (when-let [password (-> app-state :device :password)]
          (list
           [:h3 "Password"]
           [:p "This device has a password that you must use when connecting to the broker. Please make a note of this password now. If you lose it you will have to delete and recreate the device."]
           [:pre {:style {:font-size "2em"}} password]

           [:h3 "Test this device"]
           [:h4 "Mosquitto"]
           [:pre (str "mosquitto_pub"
                      " -h " hostname
                      " -i " (-> app-state :device :client-id)
                      " -u " (:user app-state)
                      " -P " password
                      " -t " "test"
                      " -m " "'This is a test'"
                      )]))

        [:form.form-horizontal
         {:onSubmit
          (fn [ev]
            (.preventDefault ev)
            (let [req (chan)
                  resp (ajaj< req :method :delete)]
              (if-let [id (get-in @app-state [:device :client-id])]
                (go
                  (>! req
                      {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/" id)})
                  (let [{:keys [status body]} (<! resp)]
                    (when (= status 204)
                      (om/update! app-state [:device] nil)
                      (om/transact! app-state [:devices] (fn [devices] (remove #(= (:client-id %) id) devices)))))))))}
         [:h3 "Delete device"]
         [:p "This will delete the device permanently."]
         [:input.btn.btn-danger {:name "action" :type "submit" :value "Delete device"}]]

        ]))))

(defn devices-page-component [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (om/build devices-list app-state)
        (om/build new-device-button app-state)
        (when (:device app-state)
          (om/build device-details-form app-state))]))))

(defn ^:export devices-page []
  (om/root devices-page-component app-model {:target (. js/document (getElementById "content"))}))

(defn test-card-page-component [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      (let [c (chan)
            in (ajaj< c :method :get)]
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
        [:p "The use of the " [:code "ajaj<"] " core.async function ensures that the ClojureScript code doesn't have to deal with JSON. Check this by looking at the format of the messages printed below. They should be in canonical EDN format with kebab-case keywords. JSON keys, in contrast, don't work well with many ClojureScript forms, such as map destructuring."]
        [:p
         [:button.btn.btn-primary
          {:onClick #(go (>! (om/get-state owner :channel) {:uri "/api/1.0"}))}
          "Welcome in JSON"]
         [:button.btn
          {:onClick #(om/update! app-state [:test-card :messages] [])}
          "Clear"]
         [:button.btn
          {:onClick (fn [ev]
                      (println "Connecting")
                      (go
                        (let [ws
                              (<! (ws-ch "ws://localhost:8083/events/stream/users/alice" {:format :json-kw}))]
                          (println "Websocket ch" ws-ch)
                          )))}
          "Connect"]]
        [:h2 "Messages"]
        (for [msg (get-in app-state [:test-card :messages])]
          [:p msg]
          )
        ]))))

(defn ^:export test-card []
  (om/root test-card-page-component app-model {:target (. js/document (getElementById "content"))}))
