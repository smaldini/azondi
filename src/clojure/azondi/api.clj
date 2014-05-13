(ns azondi.api
  (:require
   ;; The reason to use bidi here is to create a proper RESTful API
   ;; where resources are linked together using hyperlinks. Without
   ;; bidi, construction of these hyperlinks becomes increasingly
   ;; cumbersome and brittle.
   [bidi.bidi :as bidi :refer (path-for ->Redirect)]
   [modular.bidi :refer (WebService)]
   [liberator.core :refer (resource)]
   [com.stuartsierra.component :as component]

   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [cheshire.core :refer (decode decode-stream encode)]
   [schema.core :as s]
   [camel-snake-kebab :as csk :refer (->kebab-case-keyword ->camelCaseString)]
   [azondi.db :refer (get-users get-user delete-user! create-user! devices-by-owner get-device delete-device! create-device! patch-device! topics-by-owner get-topic delete-topic! create-topic! patch-topic! set-device-password!)]
   [hiccup.core :refer (html)]
   [clojure.walk :refer (postwalk)]
   [cylon.authorization :refer (restrict-handler Authorizer)]
   liberator.representation
   ))

;; Coercians

(defn process-maps [fm t]
  (postwalk (fn [fm]
              (cond
               (map? fm) (reduce-kv (fn [acc k v] (assoc acc (t k) v)) {} fm)
               :otherwise fm)) fm))

(defn ->clj
  "Convert JSON keys into Clojure keywords. This is because we receive
  JSON but want to process it as Clojure."
  [fm]
  (process-maps fm ->kebab-case-keyword))

(defn ->js
  "Convert Clojure keywords into JSON keys. This is because we respond
  with JSON."
  [fm]
  (process-maps fm ->camelCaseString))

(defprotocol Body
  (read-edn-body [body])
  (read-json-body [body]))

(extend-protocol Body
  String
  (read-edn-body [body] (edn/read-string body))
  (read-json-body [body] (decode body keyword))
  org.httpkit.BytesInputStream
  (read-edn-body [body] (io! (edn/read (java.io.PushbackReader. (io/reader body)))))
  (read-json-body [body] (io! (decode-stream (io/reader body) true))))

(def version "1.0 (beta)")

;; We override the Liberator defaults because we want maps to be
;; converted to JSON with Cheshire, and with conversion to camelCase for
;; the keys.

(defmethod liberator.representation/render-map-generic "application/json" [data context]
  (encode (->js data)))

(defmethod liberator.representation/render-seq-generic "application/json" [data _]
  (encode (->js data)))

;; Utility

(defn create-schema-check [schema]
  (fn [{{body :body method :request-method} :request}]
    (or
     (= method :get)
     (= method :delete)
     (try
       (let [body (->clj (read-json-body body))]
         (if-let [error (s/check schema body)]
           [false {:error {:error "Entity body failed schema check" :details (pr-str error) :body body}}]
           {:body body}))
       (catch Exception e [false {:error {:error "Entity body did not contain valid JSON"}}])))))

(defn handle-unprocessable-entity [{error :error}]
  (encode (update-in error [:details] ->js)))

;; Welcome - this is used for testing

(def welcome (str "OpenSensors.IO API version 1.0 " version))

(defn welcome-resource []
  {:available-media-types #{"text/plain" "text/html" "application/json" "application/edn"}
   :handle-ok (fn [{{mt :media-type} :representation}]
                (case mt
                  "text/plain" welcome
                  "text/html" (html [:h1 welcome])
                  ("application/json" "application/edn") {:message welcome :current-date (java.util.Date.)}
                  ))})

;;;;; ----- USERS ----

(def ^:const alphanumeric "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")

(defn generate-user-password
  [length]
  (loop [acc []]
    (if (= (count acc) length) (apply str acc)
        (recur (conj acc (rand-nth alphanumeric))))))

(defn users-resource [db]
  {:allowed-methods #{:get}
   :available-media-types #{"text/html" "application/json"}

   ;; Only allow local access
   :allowed?
   (fn [{{:keys [remote-addr request-method]} :request}]
     (= remote-addr "127.0.0.1"))

   :handle-ok
   (fn [{{mt :media-type} :representation {routes :modular.bidi/routes :as req} :request}]
     (case mt
       "text/html"
       (do
         (html [:ul (for [[k user] (get-users db)]
                      [:li [:a {:href (bidi/path-for routes :user :user (:user user))} (:user user)]])]))
       "application/json"
       (for [user (get-users db)] {:user user :href (bidi/path-for routes :user :user (:user user))})
       ))})

(def new-user-schema
  {(s/optional-key :name) s/Str
   :password s/Str
   :email s/Str
   })

(defn user-resource [db]
  {:available-media-types #{"application/json" "text/html"}
   :allowed-methods #{:put :get}

   ;; We only allow local access
   :allowed?
   (fn [{{:keys [remote-addr request-method]} :request}]
     (or (= request-method :get)
         (= remote-addr "127.0.0.1")))

   :known-content-type? #{"application/json"}
   :processable? (create-schema-check new-user-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :exists? (fn [{{{user :user} :route-params} :request}]
              {::user (get-user db user)})

   :handle-ok (fn [{user ::user {media-type :media-type} :representation req :request}]
                (case media-type
                  "application/json" user
                  "text/html" (html
                               [:dl
                                (for [[k v] user]
                                  (list [:dt k]
                                        [:dd v])
                                  )
                                ]))
                )

   :put! (fn [{{:keys [name email password]} :body {{user :user} :route-params} :request}]
           (when (get-user db user)
             (delete-user! db user))

           (let [u (create-user! db name user email password)
                 ;;_ (set-api-key uesrs user)
                 ;;api-key (get-api-key user)
                 ]
             ;; We create the api-key, in order to return. This is
             ;; really just to help with the tests. Is this appropriate?
             {:response-body {:api-key "12345"}}
             )
           )
   :handle-created (fn [{body :response-body}] body)
   })

;; DEVICES

(def device-attributes-schema
  {(s/optional-key :name) s/Str
   (s/optional-key :description) s/Str
   })

(defn generate-device-password
  []
  (let [valid-chars (map char (concat (range 48 58)   ; 0-9
                                      (range 66 91)   ; A-Z
                                      (range 97 123)) ;a-z
                         )
        random-char (fn [] (nth valid-chars (rand (count valid-chars))))]
    (apply str (take 8 (repeatedly random-char)))))

(defn devices-resource [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post}
   :handle-ok (fn [{{{user :user} :route-params :as req} :request}]
                (encode {:user user
                         :devices (->>
                                   (devices-by-owner db user)
                                   (map #(select-keys % [:client-id :description :name]))
                                   (map #(reduce-kv (fn [acc k v] (assoc acc (->camelCaseString k) v)) {} %)))}))

      ;; Liberator introduced processable? in 0.9.0 - See
   ;; http://stackoverflow.com/questions/4781187/http-400-bad-request-for-logical-error-not-malformed-request-syntax
   :processable? (create-schema-check device-attributes-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :post! (fn [{body :body {{user :user client-id :client-id} :route-params} :request}]
            {:device
             (let [p (generate-device-password)]
               (when (get-device db client-id)
                 (delete-device! db client-id))
               (-> (create-device! db user p body)
                   (assoc :password p)))})

   :handle-created (fn [{device :device}] (->js device))


})

(defn extract-api-key [req]
  (when-let [auth (get (:headers req) "authorization")]
    (second (re-matches #"api-key\s([0-9a-f-]+)" auth))))

(defn device-resource [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :put :delete}
   :known-content-type? #{"application/json"}

   #_:authorized? #_(fn [{{{user :user} :route-params headers :headers :as req} :request}]
                      (= (extract-api-key req) (get-api-key user)))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :exists? (fn [{{{user :user client-id :client-id} :route-params} :request}]
              (when (and (get-user db user)
                         (get-device db client-id))
                {:user user
                 :client-id client-id}))

   :processable? (create-schema-check device-attributes-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :put! (fn [{client-id :client-id body :body}] (patch-device! db client-id body))
   :delete! (fn [{client-id :client-id}] (delete-device! db client-id))

   :handle-ok (fn [{client-id :client-id}] (get-device db client-id))
   :handle-created (fn [_] {:message "Patched"})

   })

(defn reset-device-password-resource [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:post}
   :post! (fn [{{{:keys [client-id]} :route-params} :request}]
            (let [p (generate-device-password)]
              (set-device-password! db client-id p)
              {:password p}))
   :handle-created (fn [{password :password}] {:password password})
})

(def topic-attributes-schema
  {(s/required-key :name) s/Str
   (s/optional-key :unit) s/Str
   (s/optional-key :description) s/Str})

(defn topics-resource [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post}
   :handle-ok (fn [{{{user :user} :route-params} :request}]
                (encode {:user user
                         :topics (->>
                                  (topics-by-owner db user)
                                  (map #(select-keys % [:owner :description :name :unit :topic-id]))
                                  (map #(reduce-kv (fn [acc k v] (assoc acc (->camelCaseString k) v)) {} %))
                                  )}))
   :processable? (create-schema-check topic-attributes-schema)
   :handle-unprocessable-entity handle-unprocessable-entity
   :post! (fn [{body :body {{user :user} :route-params} :request}]
            {:topic
             (let [name (:name body)
                   topic-id (str "users/" user "/" name)]
               (when (get-topic db topic-id)
                 (delete-topic! db topic-id))
               (create-topic! db {:name name
                                  :owner user
                                  :unit (:unit body)
                                  :description (:description body)
                                  :topic-id topic-id}))})

   :handle-created (fn [{topic :topic}] (->js topic))
   })

(defn topic-resource [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :put :delete}
   :known-content-type? #{"application/json"}
   :exists? (fn [{{{user :user topic-name :topic-name} :route-params} :request}]
              (let [topic-id (str "users/" user "/" topic-name)]
                (when (and (get-user db user)
                           (get-topic db topic-id))
                  {:user user
                   :topic-id topic-id})))

   :processable? (create-schema-check device-attributes-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :put! (fn [{topic-id :topic-id body :body}] (patch-topic! db topic-id body))
   :delete! (fn [{topic-id :topic-id}] (delete-topic! db topic-id))

   :handle-ok (fn [{topic-id :topic-id}] (get-topic db topic-id))
   :handle-created (fn [_] {:message "Patched"})

})


;; WebService

(defn make-handlers [db auth user-auth]
  {::welcome (resource (welcome-resource))
   ::users (resource (users-resource db))
   ::user (resource (user-resource db))
   ::devices (-> (resource (devices-resource db))
                 (restrict-handler user-auth :user))
   ::device (resource (device-resource db))
   ::reset-device-password (resource (reset-device-password-resource db))
   ::topics (resource (topics-resource db))
   ::topic (resource (topic-resource db))
   })

(defn make-routes
  "This function returns the bidi route structure for the API. It should
  be indented beautifully to read like a site-map."
  []
  [""
   {"" ::welcome
    "/" (->Redirect 307 ::welcome)
    "/users" (->Redirect 307 ::users)
    "/users/" ::users
    ["/users/" :user] {"" ::user
                       "/devices" (->Redirect 307 ::devices)
                       "/devices/" ::devices
                       ["/devices/" :client-id] ::device
                       ["/devices/" :client-id "/reset-password"] ::reset-device-password
                       "/topics" (->Redirect 307 ::topics)
                       "/topics/" ::topics
                       ["/topics/" :topic-name] ::topic} }])

(defrecord Api [uri-context]
  component/Lifecycle
  (start [this]
    ;; Handlers and routes need to be associated to this at component
    ;; start so that they can be referenced by api tests.
    (assoc this
      :handlers (make-handlers (:database this) (:authorizer this) (:user-authorizer this))
      :routes (make-routes)))
  (stop [this] this)

  WebService
  (ring-handler-map [this] (:handlers this))
  (routes [this] (:routes this))
  (uri-context [this] uri-context))

(defn new-api [& {:as opts}]
  (component/using
   (->> opts
        (merge {:uri-context ""}) ; specify defaults
        (s/validate {(s/optional-key :uri-context) s/Str})
        map->Api)
   [:database :user-authorizer :authorizer]))

(defrecord UserBasedAuthorizer []
  Authorizer
  (validate [this req] nil)

  (satisfies-requirement? [this request user]
    (= (-> request :route-params :user) (:cylon/user request))))

(defn new-user-based-authorizer [& {:as opts}]
  (->> opts
       map->UserBasedAuthorizer))
