(ns azondi.main
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require
   [clojure.string :as string]
   [cljs.reader :as reader]
   [cljs.core.async :refer [<! >! chan put! sliding-buffer close! pipe map< filter< mult tap map> timeout]]
   [om.core :as om :include-macros true]
   [sablono.core :as html :refer-macros [html]]
   [azondi.net :refer (ajaj< listen-sse)]
   [goog.events :as events]
   [chord.client :refer [ws-ch]]
   [azondi.csk :as csk]
   [azondi.chart :refer (chart-component)]))

(enable-console-print!)

;; This would eventually be opensensors.io, or probably
;; configurable. It's only used for the mosquitto curl examples.
(def hostname (let [a (.createElement js/document "a")]
                (set! (.-href a) (.-URL js/document))
                (.-hostname a)))
(def uri-init "http://localhost:8030/api/1.0")
(def filter-color "#aa0")

(defn topic-segment [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div.flow-segment
        {:style {:min-height "200px"
                 :width "300px"
                 :background "#070"}}
        [:h1 "Topic"]
        [:input {:type "text" :value (:topic app-state)}]
        ]))))

(defn segment [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div.flow-segment
        {:style {:min-height "200px"
                 :width "300px"
                 :background (:color app-state)}}
        [:h1 (:label app-state)]
        ]))))

(defn sink-segment [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div.flow-segment
        {:style {:min-height "200px"
                 :width "300px"
                 :background "#007"}}
        [:h1 "Sink"]
        [:input {:type "text" :value "/user/yods/sink"}]
        ]))))

(defn flow [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (for [seg (-> app-state :segments)]
          (case (:type seg)
            :topic (om/build topic-segment seg)
            (om/build segment seg)))
        [:div {:style {:min-height "60px"
                       :width "100px"
                       :background filter-color
                       :color "white"}
               :onClick (fn [ev]
                          (.preventDefault ev)
                          (println "Append!")
                          (om/transact! app-state :segments #(conj % {:label "Filter" :color filter-color}))
                          )}
         [:p [:span.fa.fa-plus] "Filter"]]
        (om/build sink-segment app-state)
        ]))))

(defn topic [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:p "This form allows you to edit the topic -- hello yodit"]))))

(def app-model
  (atom {:user "nobody"
         :devices []                    ; All the devices
         :device nil                    ; The current device detail

         :topics []                     ; All the topics
         :topic nil                     ; The current topic detail

         :topic-detail nil        ; the current details
         :new-topic-name nil      ; The candidate suffix for a new topic
         :new-password nil
         :test-card {:messages []}

         :side-menu
         [{:label "Devices"
           :items [{:label "iPhone"}
                   {:label "Android"}
                   {:label "Arduino"}
                   {:label "Raspberry Pi"}
                   {:label "Dimmer switch"}
                   {:label "Temperature sensor"}
                   {:label "Pollution sensor"}]}

          {:label "Topics"
           :archetype {:component topic :label "/users/yods/new"}
           :items [{:component topic :label "/users/yods/temperature"}
                   {:component topic :label "/users/yods/mixer"}]}

          {:label "Flows"
           :archetype {:component flow
                       :label "My new flow"
                       :segments
                       [{:type :topic
                         :topic "/users/yods/*"}]}
           :items [{:component flow
                    :label "Alarm if too hot"
                    :segments
                    [{:type :topic
                      :topic "/users/yods/foo"
                      }
                     {:label "Filter" :color filter-color}
                     ]}

                   {:component flow
                    :label "River overflowing!"
                    :segments
                    [{:type :topic :topic "/users/yods/river"}
                     ]}
                   ]}

          {:label "API"
           :items [{:label "Usage"}
                   {:label "Docs"}]}]
         }))

(defn content [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (let [content (:content app-state)]
          (if content
            [:div
             [:h1 (:label content)]
             (if-let [component (:component content)]
               (om/build component content)
               [:div "(watch this space)"])]
            [:div "(intentionally left blank)"]
            ))]))))

(defn drawer [model owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:li
        [:a {:href "#"}
         [:i.fa.fa-bar-chart-o.fa-fw]
         (:label model)
         [:span.fa.arrow]]
        [:ul.nav.nav-second-level.collapse {:style {"height" "0px"}}
         (for [item (:items model)]
           [:li
            [:a {:onClick (fn [ev]
                            (.preventDefault ev)
                            (swap! app-model assoc :content @item)
                            )}
             (:label item)]])
         [:li [:a {:onClick (fn [ev] (.preventDefault ev) (println "Foo!")
                              (om/transact! model :items #(conj % (:archetype @model))))}

               "New...!"]]]]))))

(defn drawers [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div.navbar-default.sidebar {:role "navigation"}
        [:div#sidebar-drawers.sidebar-nav.navbar-collapse
         [:ul#side-menu.nav
          [:li.sidebar-search
           [:div.input-group.custom-search-form
            [:input.form-control {:type "text" :placeholder "Search..."}]
            [:span.input-group-btn
             [:button.btn.btn-default {:type "button"}
              [:i.fa.fa-search]]]]]
          (om/build-all drawer (:side-menu app-state))]]])
      )))


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
            uri (str uri-init "/users/" (:identity app-state) "/devices/")
            ajax-recv (ajaj< ajax-send
                                  :method :get
                                  :uri uri
                                  :authorization (str "Bearer " (:access-token app-state)))]
        (go
          (>! ajax-send {})
          (let [r (<! ajax-recv)]
            (om/update! app-state :devices (-> r :body :devices))))))

    om/IRender
    (render [this]
      (html
       [:div
        [:p "user: " (:identity app-state)]
        (let [devices (:devices app-state)]
          (when (not-empty devices)
            [:table.table.table-hover.table-condensed.tbl
             [:thead
              [:tr
               [:th "Client id"]
               [:th "Name"]
               [:th "Description"]]]
             [:tbody
              (for [{:keys [client-id name description]} devices]
                [:tr {:style {:background (if (= client-id (get-in app-state [:device :client-id])) "#ff0" "white")}}
                 [:td.numeric
                  [:a
                   {:href "#"
                    :onClick ; if we click on one of the devices
                    (fn [ev]
                      (.preventDefault ev) ; don't follow the link
                      (let [uri (str uri-init "/users/" (:identity @app-state) "/devices/" client-id)
                            ajax-send (chan)
                            ajax-recv (ajaj< ajax-send
                                             :method :get
                                             :uri uri
                                             :authorization (str "Bearer " (:access-token app-state))
                                             :content {})]
                        (go
                          (>! ajax-send {}) ; Trigger a 'GET' of the latest device details
                          (let [{:keys [status body] :as response} (<! ajax-recv)]
                            (if (= status 200)
                              ;; Update the device in the app-state. This
                              ;; causes the device details component to
                              ;; refresh.
                              (do
                                (om/update! app-state [:device]
                                            ;; We must avoid setting controlled
                                            ;; component input values to nil,
                                            ;; so we merge in empty string
                                            ;; defaults!
                                            (merge {:name "" :description ""}
                                                   (select-keys body [:client-id :name :description]))))
                              (println "ERROR with GET on " uri ": " status body))))))}
                   client-id]]
                 [:td name]
                 [:td description]])]]))]))))

(defn update-devices-list! [app-state]
  (let [ajax-send (chan)
        ajax-recv (ajaj< ajax-send
                         :method :get
                         :uri (str uri-init "/users/" (:identity @app-state) "/devices/"))]
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
                   (println "Response to creating device is" [status body])
                   ;; Add the device to the list
                   (om/transact! app-state :devices #(conj % body))
                   ;; Set the current device to this new one
                   (om/update! app-state [:device] body))))))}
        [:div.control-group
         [:div.controls
          [:input.btn.btn-primary.btn-xlarge {:type "submit" :value "Create New Device"}]]]]))))

(defn connect-device-debugger
  "Connect the device debugger to the notification (server-sent event)
  source of the given client-id. This debugger is useful Events are put
  to notify-ch."
  [owner client-id notify-ch]
  ;; We only have one event-source per device-details component, not per device.
  (when-let [es (om/get-state owner :event-source)] (.close es))
  (om/set-state! owner :event-source (listen-sse (str "/debug-events/" client-id) notify-ch)))

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
                                                        (println (pr-str message))
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
                            (om/get-state owner :debugger-events)))))
    om/IRender
    (render [this]
      (html
       (let [id (get-in app-state [:device :client-id])]
         [:div#device-details
          [:a.device-close {:href "#"
                            :onClick (fn [ev]
                                      (om/update! app-state [:device] nil))} [:i {:class "fa fa-minus"} [:b
                                                                     (let [name (get-in app-state [:device :name])]
                                                                       ;; If there's a device name, let's display it in the title.
                                                                       (if (and name (not-empty name))
                                                                         (str " Device: " name)
                                                                         "Device"))]]]
          [:form.form-horizontal
           {:onSubmit (fn [ev]
                        (.preventDefault ev)
                        (let [ajax-send (chan)
                              ajax-recv (ajaj< ajax-send :method :put)]
                          (if-let [id (get-in @app-state [:device :client-id])]
                            (go
                              (>! ajax-send
                                  {:uri (str "/api/1.0/users/" (:identity @app-state) "/devices/" id)
                                   :authorization (str "Bearer " (:access-token @app-state))
                                   :content {:name (or (get-in @app-state [:device :name]) "")
                                             :description (or (get-in @app-state [:device :description]) "")}})
                              (let [response (<! ajax-recv)]
                                (println "Response to PUT is" response))
                              ;; Having PUT, let's update the devices list
                              (update-devices-list! app-state)))))}

           [:div.control-group
            [:div#device-clientid-label.controls
             [:p (str "Client id: " (get-in app-state [:device :client-id]))]]
            ]

           [:div.control-group
            [:div#device-name-desc.controls
             [:input {:name "name"
                      :type "text"
                      :value (get-in app-state [:device :name])
                      :onChange
                      (fn [e]
                        (let [value (.-value (.-target e))]
                          (om/update! app-state [:device :name] value)))
                      :placeholder "optional device name"}]
             [:input {:name "description" :style {:width "50%"}
                      :type "text"
                      :value (get-in app-state [:device :description])
                      :onChange
                      (fn [e]
                        (let [value (.-value (.-target e))]
                          (om/update! app-state [:device :description] value)))
                      :placeholder "optional description"}]
             [:input.btn.btn-small.btn-primary {:name "action" :type "submit" :value "Save"}]]]]

          [:form.form-horizontal
           {:onSubmit (fn [ev]
                        (.preventDefault ev)
                        (let [ajax-send (chan)
                              ajax-recv (ajaj< ajax-send :method :post)]
                          (if-let [id (get-in @app-state [:device :client-id])]
                            (go
                              (>! ajax-send
                                  {:uri (str "/api/1.0/users/" (:identity @app-state) "/devices/" id "/reset-password")
                                   :authorization (str "Bearer " (:access-token @app-state))
                                   :content {:name (or (get-in @app-state [:device :name]) "")
                                             :description (or (get-in @app-state [:device :description]) "")}})
                              (let [response (<! ajax-recv)]
                                (om/update! app-state [:device :password] (-> response :body :password)))

                              ))))}
           [:div.control-group
            [:div.controls
             [:input.btn.btn-primary {:name "action" :type "submit" :value "Reset Device Password"}]]]]

          (when-let [password (-> app-state :device :password)]
            (list
             [:h3 "Password"]
             [:p "This device has a password that you must use when connecting to the broker. Please make a note of this password now, you will not get another chance. If you lose it you will have to delete and recreate the device."]
             [:pre {:style {:font-size "2em"}} password]))

          [:h2 "Test this device"]
          [:div#device-mosquitto [:h3 "Mosquitto"]
           [:p "Mosquitto is an MQTT messaging tool that you can use to test your device.  Download a mosquitto client library from " [:a {:href "http://mosquitto.org/"} "mosquitto.org"]]
           [:pre (str "mosquitto_pub"
                      " -h " hostname
                      " -i " (-> app-state :device :client-id)
                      " -t " (str "/users/" (:user app-state) "/test")
                      " -m " "'This is a test'"
                      " -u " (:user app-state)
                      " -P " (or (-> app-state :device :password) "<enter password>")
                      )]

           [:pre (str "mosquitto_sub"
                      " -h " hostname
                      " -i " (-> app-state :device :client-id)
                      " -t " (str "/users/" (:user app-state) "/test")
                      " -u " (:user app-state)
                      " -P " (or (-> app-state :device :password) "<enter password>")
                      )]]

          [:div#device-events [:h3 "Events"]
           [:p "We will show all connection attempts from this device to help you succeed in establishing a connection from your device to the broker."]
           [:pre
            (for [msg (-> app-state :device :messages)]
;;;;
              (str (:text msg) "\r\n"))]

           [:button.btn {:onClick (fn [ev] (om/update! app-state [:device :messages] []))} "Clear"]]

          [:div#device-charting [:h3 "Charting"]
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
                         {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/" id)
                          :authorization (str "Bearer " (:access-token @app-state))})
                     (let [{:keys [status body]} (<! ajax-recv)]
                       (when (= status 204)
                         (om/update! app-state [:device] nil)
                         (om/transact! app-state [:devices] (fn [devices] (remove #(= (:client-id %) id) devices)))))))))}
            ]]
          [:div#device-delete
           [:form.form-horizontal
            {:onSubmit
            (fn [ev]
              (.preventDefault ev)
              (let [ajax-send (chan)
                    ajax-recv (ajaj< ajax-send :method :delete)]
                (if-let [id (get-in @app-state [:device :client-id])]
                  (go
                    (>! ajax-send
                        {:uri (str "/api/1.0/users/" (:user @app-state) "/devices/" id)
                         :authorization (str "Bearer " (:access-token @app-state))})
                    (let [{:keys [status body]} (<! ajax-recv)]
                      (when (= status 204)
                        (om/update! app-state [:device] nil)
                        (om/transact! app-state [:devices] (fn [devices] (remove #(= (:client-id %) id) devices)))))))))}
            [:h3 "Delete device"]
            [:p "This will delete the device permanently."]

            [:input.btn.btn-danger {:name "action" :type "submit" :value "Delete device"}]]]])))))


(defn devices-page-component [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (om/build new-device-button-component app-state)
        (when (:device app-state)
          (om/build device-details-component app-state))
        (om/build devices-list-component app-state)
        ]))))

;; IMPORTANT: (MS) I think devices-page component (below) should be evolved into the
;; whole 'user' app, such that /devices, /topics, etc. become
;; 'bookmarks' of the user app. So we'll keep the devices-page name for
;; now, but eventually we'll rename it to 'user-app' or something along
;; those lines.

(defn page [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (om/build drawers app-state)
        (om/build devices-page-component app-state)
        ])))
  )

(defn ^:export devices-page [identity access-token]
  (swap! app-model assoc :access-token access-token :identity identity)
  (om/root page app-model {:target (. js/document (getElementById "content"))})
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
       [:table.table.table-hover.table-condensed.tbl
        [:thead
         [:tr
          [:th]
          [:th "Topic"]
          [:th "Description"]
          [:th "Unit of Measure"]]]

        [:tbody
         (for [{:keys [topic description unit public]} (:topics app-state)]
           [:tr
            [:td (if (= true public)
                   [:i {:class "fa fa-users"}]
                   [:i {:class "fa fa-lock"}])]
            [:td
             [:a
              {:onClick              ; if we click on one of the topics
               (fn [ev]
                 (.preventDefault ev)   ; don't follow the link
                 (let [uri (str "/api/1.0/users/" (:user @app-state) "/topics/" (subs topic (count (str "/users/" (:user @app-state) "/"))))
                       ajax-send (chan)
                       ajax-recv (ajaj< ajax-send
                                        :method :get
                                        :uri uri
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
                                     (merge {:name "" :description "" :unit "" :topic ""}
                                            (select-keys body [:name :description :unit :topic :public]))))))))}
              topic]]
            [:td description]
            [:td unit]
            ])]]))))

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
    om/IInitState
    (init-state [this]
      {:visibility :public})

    om/IRender
    (render [this]
      (html
       [:form.form-horizontal
        {:onSubmit
         (fn [ev]
           (.preventDefault ev)

           )}

        [:div#new-topic-form.control-group
         [:div.controls
          [:input {:id "name"
                   :type "text"
                   :placeholder "Name of new topic"
                   :value (:new-topic-name app-state)
                   :onChange
                   (fn [e]
                     (let [value (.-value (.-target e))]
                       (om/update! app-state [:new-topic-name] value)))}]

          (when (not-empty (:new-topic-name app-state)) [:p "Topic will be created as " [:code (str "/users/" (:user app-state) "/" (:new-topic-name app-state))] "(" (name (om/get-state owner :visibility)) ")"])]

         [:div.controls
          [:div#public-private-btn.btn-group.btn-group-lg
           [:button.btn.btn-default
            {:type "button"
             :onClick (fn [ev] (om/set-state! owner :visibility :public))}
            [:span.fa.fa-users] " Public Topic"]

           [:button.btn.btn-default
            {:type "button"
             :onClick (fn [ev] (om/set-state! owner :visibility :private))}
            [:span.fa.fa-lock] " Private Topic"]]]

         [:div.controls
          (if (not-empty (:new-topic-name app-state))
            [:input.btn.btn-primary.btn-xlarge
             {:type "submit"
              :onClick (fn [ev]

                         (let [ajax-send (chan)
                               ajax-recv (ajaj< ajax-send :method :put)
                               topic-name (:new-topic-name @app-state)]
                           (om/update! app-state [:new-topic-name] "")
                           (go
                             (>! ajax-send
                                 {:uri (str "/api/1.0/users/" (:identity @app-state) "/topics/" topic-name)
                                  :authorization (str "Bearer " (:access-token @app-state))
                                  :content {:description (or (get-in @app-state [:topic :description]) "")
                                            :unit (or (get-in @app-state [:topic :unit]) "")
                                            :public (case (om/get-state owner :visibility)
                                                      :public true
                                                      :private false)}
                                  })

                             (let [{:keys [status body]} (<! ajax-recv)]
                               (println "Response to creating topic is" [status body])
                               ;; TODO: Update topic detail
                               )
                             (update-topics-list! (:user @app-state) app-state)))
                         )
              :value "Create user topic"}]
            [:input.btn.btn-primary.btn-xlarge.disabled {:type "submit"
                                              :value "Create user topic"}]

            )]]]))))

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
                                                 (println (pr-str message))
                                                 "ERROR")
                                        (get-in message [:message :message])))))
            (recur)))
        ;; Connect the device 'debugger' to the device
        (connect-topic-debugger owner (get-in app-state [:topic :name]) notify-ch)))

    om/IWillUpdate
    (will-update [this next-props next-state]
      ;; If the client-id changes, we must reconnect the debugger to the
      ;; corresponding device
      (let [old-topic (get-in app-state [:topic :topic])
            new-topic (get-in next-props [:topic :topic])]
        (when (not= old-topic new-topic)
          ;; TODO uncomment this
          #_(connect-topic-debugger owner new-topic
                                  (om/get-state owner :debugger-events)))))
    om/IRender
    (render [this]
      (html
       (let [topic (get-in app-state [:topic :topic])]
         [:div
          [:form.form-horizontal
           {:onSubmit (fn [ev]
                        (.preventDefault ev)
                        (let [ajax-send (chan)
                              ajax-recv (ajaj< ajax-send :method :put)]
                          (when-let [topic (get-in @app-state [:topic :topic])]
                            (let [uri (str "/api/1.0/users/" (:identity @app-state) "/topics/" (subs topic (count (str "/users/" (:identity @app-state) "/"))))]
                              (go
                                (>! ajax-send
                                    {:uri uri
                                     :authorization (str "Bearer " (:access-token @app-state))
                                     :content {:description (or (get-in @app-state [:topic :description]) "")
                                               :unit (or (get-in @app-state [:topic :unit]) "")}})
                                (let [response (<! ajax-recv)]
                                  (println "Response to PUT is" response))
                                ;; Having PUT, let's update the devices list
                                (update-topics-list! (:user @app-state) app-state))))))}

           [:div.control-group
            [:label.control-label "Topic"]
            [:div.controls
             [:input {:name "topic"
                      :style {:width "60%"}
                      :type "text"
                      :value (get-in app-state [:topic :topic]) :editable false :disabled true}]]]

           [:div.control-group
            [:label.control-label "Description"]
            [:div.controls
             [:input {:name "description"
                      :style {:width "60%"}
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
             [:input {:name "unit"
                      :style {:width "60%"}
                      :type "text"
                      :value (get-in app-state [:topic :unit])
                      :onChange
                      (fn [e]
                        (let [value (.-value (.-target e))]
                         (om/update! app-state [:topic :unit] value)))
                      :placeholder "optional unit of measure e.g. PM25, celcius"}]]]

           [:div.control-group
            [:div.controls
             [:input.btn {:name "action" :type "submit" :value "Apply"}]]]]

          [:form.form-horizontal
           {:onSubmit
            (fn [ev]
              (.preventDefault ev)
              (let [ajax-send (chan)
                    ajax-recv (ajaj< ajax-send :method :delete)]
                (if-let [topic (get-in @app-state [:topic :topic])]
                  (go
                    (>! ajax-send
                        {:uri (str "/api/1.0/users/" (:identity @app-state) "/topics/"  (subs topic (count (str "/users/" (:identity @app-state) "/"))))})
                    (let [{:keys [status body]} (<! ajax-recv)]
                      (when (= status 204)
                        (om/update! app-state [:topic] nil)
                        (om/transact! app-state [:topics] (fn [topics] (remove #(= (:name %) name) topics))))))))
              (update-topics-list! (:user @app-state) app-state))}
           [:h3 "Delete topic"]
           [:p "This will delete the topic permanently."]
           [:input.btn.btn-danger {:name "action" :type "submit" :value "Delete topic"}]]])))))

(defn topics-page-component [app-state owner]
  (reify
    om/IRender
    (render [this]
      (html
       [:div
        (om/build new-topic-button-component app-state)
        (om/build topics-list-component app-state)
        (when (:topic app-state)
          (om/build topic-details-component app-state))]))))

(defn ^:export topics-page [identity access-token]
  (swap! app-model assoc :identity identity :access-token access-token)
  (om/root topics-page-component app-model {:target (. js/document (getElementById "content"))}))

;; USERS PAGE

(defn update-users-list! [access-token owner]
  (let [ajax-send (chan)
        ajax-recv (ajaj< ajax-send
                         :method :get
                         :uri (str "/api/1.0/users/")
                         :authorization (str "Bearer " access-token))]
    (go
      (>! ajax-send {})
      (let [r (<! ajax-recv)]
        (println "Receiving value " r)
        (if (= (:status r) 200)
          (om/set-state! owner :users (:body r))
          (println "Failed to get users: " (:body r)))))))

(defn users-page-component [app-state owner]
  (reify
    om/IWillMount
    (will-mount [this]
      (update-users-list! (:access-token app-state) owner))
    om/IRender
    (render [this]
      (html
       [:div
        [:table.table.table-hover.table-condensed.tbl
         [:tbody
          (for [user (om/get-state owner :users)]
            [:tr
             [:td [:a {:href (:href user)} (:user user)]]
             [:td [:a {:href (:href user)} (:name user)]]
             [:td [:a {:href (:href user)} (:email user)]]])]]]))))

(defn ^:export users-page [identity access-token]
  (swap! app-model assoc :access-token access-token :identity identity)
  (om/root users-page-component app-model {:target (. js/document (getElementById "content"))}))

(defn ^:export test-card []
  (om/root test-card-page-component app-model {:target (. js/document (getElementById "content"))}))
