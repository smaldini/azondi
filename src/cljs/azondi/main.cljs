(ns azondi.main
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [clojure.string :as string]
   [cljs.reader :as reader]
   [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
   [om.core :as om :include-macros true]
   [sablono.core :as html :refer-macros [html]]
   [ankha.core :as ankha]
   [azondi.net :refer (ajaj< listen-sse)]
   [goog.events :as events]
   [chord.client :refer [ws-ch]]
   [azondi.csk :as csk]
   [azondi.chart :refer (chart-component)]
   ))

(enable-console-print!)

;; This would eventually be opensensors.io, or probably
;; configurable. It's only used for the mosquitto curl examples.
(def hostname "localhost")

(def app-model
  (atom {:user "alice"
         :devices []
         :topics []
         :device nil
         :topic nil
         :test-card {:messages []}}))

;; TODO The styling of this table component needs a lot of work
(defn devices-list-component
  "Show a list of devices"
  [app-state owner]
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
            (om/update! app-state :devices (-> r :body :devices))))))

    om/IRender
    (render [this]
      (html
       [:table
        [:thead
         [:tr
          [:th "Client id"]
          [:th "Name"]
          [:th "Description"]]]
        [:tbody
         (for [{:keys [client-id name description]} (:devices app-state)]
           [:tr {:style {:background (if (= client-id (get-in app-state [:device :client-id])) "#ff0" "white")}}
            [:td.numeric
             [:a
              {:onClick ; if we click on one of the devices
               (fn [ev]
                 (.preventDefault ev) ; don't follow the link
                 (let [ajax-send (chan)
                       ajax-recv (ajaj< ajax-send
                                        :method :get
                                        :uri (str "/api/1.0/users/" (:user @app-state) "/devices/" client-id)
                                        :content {})]
                   (go
                     (>! ajax-send {}) ; Trigger a 'GET' of the latest device details
                     (let [{:keys [status body] :as response} (<! ajax-recv)]
                       (when (= status 200)
                         ;; Update the device in the app-state. This
                         ;; causes the device details component to
                         ;; refresh.
                         (om/update! app-state :device
                                     ;; We must avoid setting controlled
                                     ;; component input values to nil,
                                     ;; so we merge in empty string
                                     ;; defaults!
                                     (merge {:name "" :description ""}
                                            (select-keys body [:client-id :name :description]))))))))}
              ;; We display the client-id as the link text
              client-id]]

            [:td name]
            [:td description]])]]))))

(defn update-devices-list! [user app-state]
  (let [ajax-send (chan)
        ajax-recv (ajaj< ajax-send
                         :method :get
                         :uri (str "/api/1.0/users/" user "/devices/"))]
    (go
      (>! ajax-send {})
      (let [r (<! ajax-recv)]
        (om/update! app-state :devices (:devices (:body r)))))))

(defn new-device-button-component
  "Click this button to register a new device"
  [app-state owner]
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
                    ;; Empty content, but we can patch in device
                    ;; meta-data later.
                    :content {}})
               (let [{:keys [status body]} (<! ajax-recv)]
                 (when (= status 201)
                   ;; Add the device to the list
                   (om/transact! app-state :devices #(conj % body))
                   ;; Set the current device to this new one
                   (om/update! app-state [:device] body))))))}
        [:div.control-group
         [:div.controls
          [:input.btn.btn-primary {:type "submit" :value "Register new device"}]]]]))))

(defn connect-device-debugger
  "Connect the device debugger to the notification (server-sent event)
  source of the given client-id. This debugger is useful Events are put
  to notify-ch."
  [owner client-id notify-ch]
  ;; We only have one event-source per device-details component, not per device.
  (when-let [es (om/get-state owner :event-source)] (.close es))
  (om/set-state! owner :event-source (listen-sse (str "/events/" client-id) notify-ch)))

(defn device-details-component [app-state owner]
  (reify
    om/IInitState
    (init-state [this]
      ;; We set up a channel that will receive events we'll display in a
      ;; debug messages section
      {:debugger-events (chan)})

    om/IWillMount
    (will-mount [this]
      (let [notify-ch (om/get-state owner :debugger-events)]
        ;; We continuously pull from our debug channel, and add it to
        ;; our messages section.
        (go-loop []
          (when-let [message (<! notify-ch)]
            (om/transact! app-state [:device :messages]
                          #(conj (or % [])
                                 (merge message
                                      (case (:type message)
                                        :open {:text "Debugger connected"}
                                        :error {:text (do
                                                        (.dir js/console (:event message))
                                                        "ERROR")}
                                        {:text (get-in message [:message :message])}))))
            (recur)))
        ;; Connect the device 'debugger' to the device
        (connect-device-debugger owner (get-in app-state [:device :client-id]) notify-ch)))

    om/IWillUpdate
    (will-update [this next-props next-state]
      ;; If the client-id changes, we must reconnect the debugger to the
      ;; corresponding device
      (let [old-client-id (get-in app-state [:device :client-id])
            new-client-id (get-in next-props [:device :client-id])]
        (when (not= old-client-id new-client-id)
          (connect-device-debugger owner new-client-id
                            (om/get-state owner :debugger-events) ))))
    om/IRender
    (render [this]
      (html
       (let [id (get-in app-state [:device :client-id])]
         [:div
          [:h2
           (let [name (get-in app-state [:device :name])]
             ;; If there's a device name, let's display it in the title.
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
                                   :content {:name (or (get-in @app-state [:device :name]) "")
                                             :description (or (get-in @app-state [:device :description]) "")}})
                              (let [response (<! ajax-recv)]
                                (println "Response to PUT is" response))
                              ;; Having PUT, let's update the devices list
                              (update-devices-list! (:user @app-state) app-state)))))}

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
          [:pre
           (for [msg (-> app-state :device :messages)]
;;;;
             (str (:text msg) "\r\n"))]

          [:h4 "Charting"]
          [:p "An example chart, plotting the messages"]
          (om/build chart-component (-> app-state :device :messages))

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
        (om/build devices-list-component app-state)
        (om/build new-device-button-component app-state)
        (when (:device app-state)
          (om/build device-details-component app-state))]))))

(defn ^:export devices-page []
  (om/root devices-page-component app-model {:target (. js/document (getElementById "content"))})
  ;;(om/root ankha/inspector app-model {:target (. js/document (getElementById "ankha"))})
  )

(defn topics-list-component
  "Show a list of topics"
  [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      (let [ajax-send (chan)
            ajax-recv (ajaj< ajax-send
                             :method :get
                             :uri (str "/api/1.0/users/" (:user app-state) "/topics/"))]
        (go
          (>! ajax-send {})
          (let [r (<! ajax-recv)]
            (om/update! app-state :topics (-> r :body :topics))))))

    om/IRender
    (render [this]
      (html
       [:table
        [:thead
         [:tr
          [:th "Name"]
          [:th "Description"]
          [:th "Unit of Measure"]]]
        [:tbody
         (for [{:keys [name description unit]} (:topics app-state)]
           [:tr
            [:td
             [:a
              {:onClick              ; if we click on one of the topics
               (fn [ev]
                 (.preventDefault ev)   ; don't follow the link
                 (let [ajax-send (chan)
                       ajax-recv (ajaj< ajax-send
                                        :method :get
                                        :uri (str "/api/1.0/users/" (:user @app-state) "/topics/" name)
                                        :content {})]
                   (go
                     (>! ajax-send {}) ; Trigger a 'GET' of the latest topic details
                     (let [{:keys [status body] :as response} (<! ajax-recv)]
                       (when (= status 200)
                         ;; Update the device in the app-state. This
                         ;; causes the device details component to
                         ;; refresh.
                         (om/update! app-state :topic
                                     ;; We must avoid setting controlled
                                     ;; component input values to nil,
                                     ;; so we merge in empty string
                                     ;; defaults!
                                     (merge {:name "" :description "" :unit ""}
                                            (select-keys body [:name :description :unit]))))))))}
              ;; We display the topic name as the link text
              name]]
            [:td description]
            [:td unit]])]]))))

(defn update-topics-list! [user app-state]
  (let [ajax-send (chan)
        ajax-recv (ajaj< ajax-send
                         :method :get
                         :uri (str "/api/1.0/users/" user "/topics/"))]
    (go
      (>! ajax-send {})
      (let [r (<! ajax-recv)]
        (om/update! app-state :topics (:topics (:body r)))))))

(defn new-topic-button-component
  "Click this button to register  new topic"
  [app-state owner]
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
                   {:uri (str "/api/1.0/users/" (:user @app-state) "/topics/")
                    :content {:name (get-in @app-state [:topic :name])
                              :description (or (get-in @app-state [:topic :description]) "")
                              :unit (or (get-in @app-state [:topic :unit]) "")}
                              })
               (update-topics-list! (:user @app-state) app-state)
               (let [{:keys [status body]} (<! ajax-recv)]
                 
                 (when (= status 201)
                   ;; Add the device to the list
                   (om/transact! app-state :topics #(conj % body))
                   
                   ;; Set the current device to this new one
                   (om/update! app-state [:topic] body))))))}
        [:div.control-group
         [:div.controls
          [:input {:id "name"
                   :type "text"
                   :placeholder "Name of New Topic"
                   :onChange
                   (fn [e]
                     (let [value (.-value (.-target e))]
                       (om/update! app-state [:topic :name] value)))}]]
         [:div.controls

          [:input.btn.btn-primary {:type "submit" :value "Create topic"}]]]]))))

;; TODO This could be rewritten in terms of connect-device-debugger
(defn connect-topic-debugger
  "Connect the topic debugger to the notification (server-sent event)
  source of the given topic name. Events are put to notify-ch."
  [owner name notify-ch]
  ;; We only have one event-source per device-details component, not per device.
  (when-let [es (om/get-state owner :event-source)] (.close es))
  (om/set-state! owner :event-source (listen-sse (str "/topic-events/" name) notify-ch)))

(defn topic-details-component [app-state owner]
  (reify
    om/IInitState
    (init-state [this]
      ;; We set up a channel that will receive events we'll display in a
      ;; debug messages section
      {:debugger-events (chan)})

    om/IWillMount
    (will-mount [this]
      (let [notify-ch (om/get-state owner :debugger-events)]
        ;; We continuously pull from our debug channel, and add it to
        ;; our messages section.
        (go-loop []
          (when-let [message (<! notify-ch)]
            (om/transact! app-state [:topic :messages]
                          #(conj (or % [])
                                 (str (:time message) " "
                                      (case (:type message)
                                        :open "Debugger connected"
                                        :error (do
                                                 (.dir js/console (:event message))
                                                 "ERROR")
                                        (get-in message [:message :message])))))
            (recur)))
        ;; Connect the device 'debugger' to the device
        (connect-topic-debugger owner (get-in app-state [:topic :name]) notify-ch)))

    om/IWillUpdate
    (will-update [this next-props next-state]
      ;; If the client-id changes, we must reconnect the debugger to the
      ;; corresponding device
      (let [old-name (get-in app-state [:topic :name])
            new-name (get-in next-props [:topic :name])]
        (when (not= old-name new-name)
          (connect-topic-debugger owner new-name
                            (om/get-state owner :debugger-events) ))))
    om/IRender
    (render [this]
      (html
       (let [name (get-in app-state [:topic :name])]
         [:div
          [:h2
           (str "Topic: " name)]
          [:form.form-horizontal
           {:onSubmit (fn [ev]
                        (.preventDefault ev)
                        (let [ajax-send (chan)
                              ajax-recv (ajaj< ajax-send :method :put)]
                          (if-let [name (get-in @app-state [:topic :name])]
                            (go
                              (>! ajax-send
                                  {:uri (str "/api/1.0/users/" (:user @app-state) "/topics/" name)
                                   :content {:description (or (get-in @app-state [:topic :description]) "")
                                             :unit (or (get-in @app-state [:topic :unit]) "")
                                             }})
                              (let [response (<! ajax-recv)]
                                (println "Response to PUT is" response)
                                )
                              ;; Having PUT, let's update the devices list
                              (update-topics-list! (:user @app-state) app-state)))))}

           [:div.control-group
            [:label.control-label "Name"]
            [:div.controls
             [:input {:name "name"
                      :type "text"
                      :value (get-in app-state [:topic :name]) :editable false :disabled true}]]]

           [:div.control-group
            [:label.control-label "Description"]
            [:div.controls
             [:input {:name "description" :style {:width "60%"}
                      :type "text"
                      :value (get-in app-state [:topic :description])
                      :onChange
                      (fn [e]
                        (let [value (.-value (.-target e))]
                          (om/update! app-state [:topic :description] value)))
                      :placeholder "optional description"}]]]

           [:div.control-group
            [:label.control-label "Unit"]
            [:div.controls
             [:input {:name "unit" :style {:width "60%"}
                      :type "text"
                      :value (get-in app-state [:topic :unit])
                      :onChange
                      (fn [e]
                        (let [value (.-value (.-target e))]
                         (om/update! app-state [:topic :unit] value)
                          ))
                      :placeholder "optional unit of measure e.g. PM25, celcius"}]]]

           [:div.control-group
            [:div.controls
             [:input.btn {:name "action" :type "submit" :value "Apply"}]]]]


          [:h4 "Events"]
          [:p "We will show all messages to this topic here"]
          [:pre
           (for [msg (-> app-state :topic :messages)]
;;;;
             (str msg "\r\n"))]

          [:form.form-horizontal
           {:onSubmit
            (fn [ev]
              (.preventDefault ev)
              (let [ajax-send (chan)
                    ajax-recv (ajaj< ajax-send :method :delete)]
                (if-let [name (get-in @app-state [:topic :name])]
                  (go
                    (>! ajax-send
                        {:uri (str "/api/1.0/users/" (:user @app-state) "/topics/" name)})
                    (let [{:keys [status body]} (<! ajax-recv)]
                      (when (= status 204)
                        (om/update! app-state [:topic] nil)
                        (om/transact! app-state [:topics] (fn [topics] (remove #(= (:name %) name) topics)))))))))}
           [:h3 "Delete topic"]
           [:p "This will delete the topic permanently."]
           [:input.btn.btn-danger {:name "action" :type "submit" :value "Delete topic"}]]])))))

(defn topics-page-component [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (om/build topics-list-component app-state)
        (om/build new-topic-button-component app-state)
        (when (:topic app-state)
          (om/build topic-details-component app-state))
        ]))))

(defn ^:export topics-page []
  (om/root topics-page-component app-model {:target (. js/document (getElementById "content"))})
  (om/root ankha/inspector app-model {:target (. js/document (getElementById "ankha"))})
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


(defn ^:export new-device-page []
  (om/root new-device-page-component app-model {:target (. js/document (getElementById "content"))}))


(defn ^:export test-card []
  (om/root test-card-page-component app-model {:target (. js/document (getElementById "content"))}))

