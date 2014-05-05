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
   [azondi.db :refer (get-users get-user delete-user! create-user! devices-by-owner get-device delete-device! create-device!)]
   [hiccup.core :refer (html)]
   ))

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

(defn ->clj
  "Convert JSON keys into Clojure keywords. This is because we receive
  JSON but want to process it as Clojure."
  [m]
  (reduce-kv (fn [acc k v] (assoc acc (->kebab-case-keyword k) v)) {} m))

(defn ->js
  "Convert Clojure keywords into JSON keys. This is because we respond
  with JSON."
  [m]
  (reduce-kv (fn [acc k v] (assoc acc (->camelCaseString k) v)) {} m))

(defn create-schema-check [schema]
  (fn [{{body :body method :request-method} :request}]
    (or
     (= method :get)
     (try
       (let [body (->clj (read-json-body body))]
         (if-let [error (s/check schema body)]
           [false {:error {:error "Entity body failed schema check" :details error}}]
           {:body body}))
       (catch Exception e [false {:error {:error "Entity body did not contain valid JSON"}}])))))

(defn handle-unprocessable-entity [{error :error}]
  (encode (update-in error [:details] ->js)))



(defn make-welcome-resource []
  {:available-media-types #{"text/plain"}
   :handle-ok "OpenSensors.IO API version 1.0 (beta)\n"})

;;;;; ----- USERS ----

(def ^:const alphanumeric "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")

(defn generate-user-password
  [length]
  (loop [acc []]
    (if (= (count acc) length) (apply str acc)
        (recur (conj acc (rand-nth alphanumeric))))))

(defn generate-device-password
  []
  (let [valid-chars (map char (concat (range 48 58)   ; 0-9
                                      (range 66 91)   ; A-Z
                                      (range 97 123)) ;a-z
                         )
        random-char (fn [] (nth valid-chars (rand (count valid-chars))))]
    (apply str (take 8 (repeatedly random-char)))))

;;----

(defn make-users-resource [db]
  {:allowed-methods #{:get}
   :available-media-types #{"text/html" "application/json"}
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
  {:user s/Str
   (s/optional-key :name) s/Str
   :email s/Str
   })

(defn make-user-resource [db]
  {:available-media-types #{"application/json" "text/html"}
   :allowed-methods #{:put :get}
   :known-content-type? #{"application/json"}
   :processable? (create-schema-check new-user-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :exists? (fn [{{{user :user} :route-params} :request}]
              {::user (get-user db user)})

   :handle-ok (fn [{user ::user {media-type :media-type} :representation}]
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

           (let [pw (generate-user-password 8)
                 u (create-user! db name user email pw)
                 ;;_ (set-api-key uesrs user)
                 ;;api-key (get-api-key user)
                 ]
             ;; We create the api-key, in order to return. This is
             ;; really just to help with the tests. Is this appropriate?
             {:response-body {:api-key "12345"
                              :password pw}}
             )
           )
   :handle-created (fn [{body :response-body}] body)
   })

(def new-device-schema
  {(s/optional-key :description) s/Str})

(defn make-devices-resource [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post}
   :handle-ok (fn [{{{user :user} :route-params} :request}]
                (encode {:user user
                         :devices (->>
                                   (devices-by-owner db user)
                                   (map #(select-keys % [:client-id :description :name]))
                                   (map #(reduce-kv (fn [acc k v] (assoc acc (->camelCaseString k) v)) {} %)))}))

      ;; Liberator introduced processable? in 0.9.0 - See
   ;; http://stackoverflow.com/questions/4781187/http-400-bad-request-for-logical-error-not-malformed-request-syntax
   :processable? (create-schema-check new-device-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :post! (fn [{body :body {{user :user client-id :client-id} :route-params} :request}]
            {:device
             (let [p (generate-device-password)]
               (when (get-device db client-id)
                 (delete-device! db client-id))
               (-> (create-device! db user p)
                   (assoc :password p)))})

   :handle-created (fn [{device :device}] (->js device))


})

(def new-device-schema
  {(s/optional-key :name) s/Str
   (s/optional-key :description) s/Str
   })

(defn extract-api-key [req]
  (when-let [auth (get (:headers req) "authorization")]
    (second (re-matches #"api-key\s([0-9a-f-]+)" auth))))

(defn make-device-resource [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :put}
   :known-content-type? #{"application/json"}

   #_:authorized? #_(fn [{{{user :user} :route-params headers :headers :as req} :request}]
                  (= (extract-api-key req) (get-api-key user)))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :exists? (fn [{{{user :user client-id :client-id} :route-params} :request}]
              (when (and (get-user db user)
                         (get-device db client-id))
                {:user user
                 :client-id client-id}))

   :processable? (create-schema-check new-device-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :put! (fn [_] nil)

   :handle-created (fn [_] {:message "Created"})

   })

(defn make-topics-resource [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post}})

(defn make-topic-resource [db])

(defn make-handlers [db]
  {:welcome (resource (make-welcome-resource))
   :users (resource (make-users-resource db))
   :user (resource (make-user-resource db))
   :devices (resource (make-devices-resource db))
   :device (resource (make-device-resource db))
   :topics (resource (make-topics-resource db))
   :topic (resource (make-topic-resource db))
   })

(defn make-routes
  "This function returns the bidi route structure for the API. It should
  be indented beautifully to read like a site-map."
  []
  [""
   {"" :welcome
    "/" (->Redirect 307 :welcome)
    "/users" (->Redirect 307 :users)
    "/users/" :users
    ["/users/" :user] {"" :user
                       "/devices" (->Redirect 307 :devices)
                       "/devices/" :devices
                       ["/devices/" :client-id] :device
                       "/topics" (->Redirect 307 :topics)
                       "/topics/" :topics
                       ["/topics/" :topic-uuid] :topic}}])

(defrecord Api [uri-context]
  component/Lifecycle
  (start [this]
    (assoc this
      :handlers (make-handlers (:database this))
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
   [:database]))
