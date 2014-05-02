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

(def app-model
  (atom {:user "alice"
         :devices []
         :device nil
         :test-card {:messages []}}))

(defn devices-list [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      ;; This code below is in preference to using clj-ajax. As such, it
      ;; is written out each time in long-hand but eventually common
      ;; patterns will emerge which can be factored into
      ;; azondi/ajax.cljs. Until then, please forgive the long-winded
      ;; set up. One such pattern is only setting up one channel-pair for
      ;; each resource and registering it somewhere, in an atom or
      ;; something, which can be looked up by keyword corresponding to
      ;; the resource.
      (let [ajax-send (chan)
            ajax-recv (ajaj< ajax-send
                             :method :get
                             :uri (str "/api/1.0/users/" (:user app-state) "/devices/"))]
        (go
          (>! ajax-send {})
          (let [r (<! ajax-recv)]
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
           [:tr {:style {:background (if (= client-id (get-in app-state [:device :client-id])) "#ff0" "white")}}
            [:td.numeric
             [:a
              {:onClick
               (fn [ev]
                 (.preventDefault ev)
                 (let [ajax-send (chan)
                       ajax-recv (ajaj< ajax-send
                                        :method :get
                                        :uri (str "/api/1.0/users/" (:user @app-state) "/devices/" client-id)
                                        :content {})]
                   (go
                     (>! ajax-send {})
                     (let [{:keys [status body] :as response} (<! ajax-recv)]
                       (when (= status 200)
                         (println "Updating device to body" body)
                         ;; We must avoid setting controlled component input values to nil!
                         (om/update! app-state :device (merge {:name "" :description ""}
                                                              (select-keys body [:client-id :name :description]))))
                       ))))} client-id]]
            [:td name]
            [:td description]])]]))))

(defn new-device-button [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:form.form-horizontal
        {:onSubmit
         (fn [ev]
           (.preventDefault ev)
           (let [ajax-send (chan)
                 ajax-recv (ajaj< ajax-send :method :post)]
             (go
               (>! ajax-send
                   {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/")
                    :content {}})
               (let [{:keys [status body]} (<! ajax-recv)]
                 (when (= status 201)
                   (om/update! app-state [:device] body)
                   (om/transact! app-state :devices #(conj % body)))
                 ))))}
        [:div.control-group
         [:div.controls
          [:input.btn.btn-primary {:type "submit" :value "Register new device"}]]]]))))

(defn device-details-form [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       (let [id (get-in app-state [:device :client-id])]
         [:div
          [:h2
           (let [name (get-in app-state [:device :name])]
             (if (and name (not-empty name))
               (str "Device: " name)
               "Device"))]
          [:form.form-horizontal
           {:onSubmit (fn [ev]
                        (.preventDefault ev)
                        (let [ajax-send (chan)
                              ajax-recv (ajaj< ajax-send :method :put)]
                          (if-let [id (get-in @app-state [:device :client-id])]
                            (go
                              (>! ajax-send
                                  {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/" id)
                                   :content-type "application/json"
                                   :content {:name (or (get-in @app-state [:device :name]) "")
                                             :description (or (get-in @app-state [:device :description]) "")}})
                              (let [response (<! ajax-recv)]
                                (println "Response to PUT is" response))
                              (let [ajax-send (chan)
                                    ajax-recv (ajaj< ajax-send
                                                     :method :get
                                                     :uri (str "/api/1.0/users/" (:user @app-state) "/devices/"))]
                                (go
                                  (>! ajax-send {})
                                  (let [r (<! ajax-recv)]
                                    (om/update! app-state :devices (:devices (:body r))))))))))}

           [:div.control-group
            [:label.control-label "Client id"]
            [:div.controls
             [:input {:name "id"
                      :type "text"
                      :value (get-in app-state [:device :client-id]) :editable false :disabled true}]]]

           [:div.control-group
            [:label.control-label "Name"]
            [:div.controls
             [:input {:name "name"
                      :type "text"
                      :value (get-in app-state [:device :name])
                      :onChange
                      (fn [e]
                        (let [value (.-value (.-target e))]
                          (om/update! app-state [:device :name] value)))
                      :placeholder "optional device name"}]]]

           [:div.control-group
            [:label.control-label "Description"]
            [:div.controls
             [:input {:name "description" :style {:width "90%"}
                      :type "text"
                      :value (get-in app-state [:device :description])
                      :onChange
                      (fn [e]
                        (let [value (.-value (.-target e))]
                          (om/update! app-state [:device :description] value)))
                      :placeholder "optional description"}]]]

           [:div.control-group
            [:div.controls
             [:input.btn {:name "action" :type "submit" :value "Apply"}]]]]


          (when-let [password (-> app-state :device :password)]
            (list
             [:h3 "Password"]
             [:p "This device has a password that you must use when connecting to the broker. Please make a note of this password now, you will not get another chance. If you lose it you will have to delete and recreate the device."]
             [:pre {:style {:font-size "2em"}} password]))

          [:h3 "Test this device"]
          [:h4 "Mosquitto"]
          [:pre (str "mosquitto_pub"
                     " -h " hostname
                     " -i " (-> app-state :device :client-id)
                     " -t " "test"
                     " -m " "'This is a test'"
                     " -u " (:user app-state)
                     " -P " (or (-> app-state :device :password) "<enter password>")
                     )]

          [:h4 "Events"]
          [:p "We will show all connection attempts from this device to help you succeed in establishing a connection from your device to the broker."]
          [:pre]

          [:form.form-horizontal
           {:onSubmit
            (fn [ev]
              (.preventDefault ev)
              (let [ajax-send (chan)
                    ajax-recv (ajaj< ajax-send :method :delete)]
                (if-let [id (get-in @app-state [:device :client-id])]
                  (go
                    (>! ajax-send
                        {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/" id)})
                    (let [{:keys [status body]} (<! ajax-recv)]
                      (when (= status 204)
                        (om/update! app-state [:device] nil)
                        (om/transact! app-state [:devices] (fn [devices] (remove #(= (:client-id %) id) devices)))))))))}
           [:h3 "Delete device"]
           [:p "This will delete the device permanently."]
           [:input.btn.btn-danger {:name "action" :type "submit" :value "Delete device"}]]])))))

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
  (om/root devices-page-component app-model {:target (. js/document (getElementById "content"))})
  ;;(om/root ankha/inspector app-model {:target (. js/document (getElementById "ankha"))})
  )

(defn test-card-page-component [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      (let [ajax-send (chan)
            ajax-recv (ajaj< ajax-send :method :get)]
        (go-loop []
          (when-let [data (<! ajax-recv)]
            (prn data)
            (om/transact! app-state [:test-card :messages] #(conj % (pr-str data)))
            (recur)))
        (om/set-state! owner :channel ajax-send)))

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
          [:p msg])]))))

(defn ^:export test-card []
  (om/root test-card-page-component app-model {:target (. js/document (getElementById "content"))}))
