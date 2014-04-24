(ns azondi.api
  (:require
   ;; The reason to use bidi here is to create a proper RESTful API
   ;; where resources are linked together using hyperlinks. Without
   ;; bidi, construction of these hyperlinks becomes increasingly
   ;; cumbersome and brittle.
   [bidi.bidi :as bidi]
   [modular.bidi :refer (BidiRoutesProvider)]
   [liberator.core :refer (resource)]
   [com.stuartsierra.component :as component]

   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [cheshire.core :refer (decode decode-stream encode)]
   [schema.core :as s]
   [camel-snake-kebab :as csk :refer (->kebab-case-keyword ->camelCaseString)]
   [azondi.db :refer (get-user delete-user! create-user! devices-by-owner get-device delete-device! create-device!)]
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



(defn make-welcome-resource [handlers]
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

(def new-user-schema
  {:user s/Str
   (s/optional-key :name) s/Str
   :email s/Str
   })

(defn make-user-resource [handlers db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:put :get}
   :known-content-type? #{"application/json"}
   :processable? (create-schema-check new-user-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :exists? (fn [{{{user :user} :route-params} :request}]
              (get-user db user))

   :put! (fn [{{:keys [name email password]} :body {{user :user} :route-params} :request}]
           (when (get-user db user)
             (delete-user! db user))

           (let [pw (generate-user-password 8)
                 u (create-user! db name user email pw)
                 _ (println u)
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

(defn make-devices-resource [handlers db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post}
   :handle-ok (fn [{{{user :user} :route-params} :request}]
                (encode {:user user
                         :devices (->>
                                   (devices-by-owner db user)
                                   (map #(select-keys % [:device_id :client_id :description :name]))
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

               (let [device (create-device! db user p)]
                 (->>
                  {:client-id (:client_id device)
                   :user (:owner device)
                   :password p
                   :device-id (:device_id device)}
                  (reduce-kv (fn [acc k v] (assoc acc (->camelCaseString k) v)) {}))))})

   :handle-created (fn [{device :device}] device)


})

(def new-device-schema
  {(s/optional-key :description) s/Str})

(defn extract-api-key [req]
  (when-let [auth (get (:headers req) "authorization")]
    (second (re-matches #"api-key\s([0-9a-f-]+)" auth))))

(defn make-device-resource [handlers db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get}
   :known-content-type? #{"application/json"}

   #_:authorized? #_(fn [{{{user :user} :route-params headers :headers :as req} :request}]
                  (= (extract-api-key req) (get-api-key user)))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :exists? (fn [{{{user :user client-id :client-id} :route-params} :request}]
              (when (and (get-user db user)
                         (get-device db client-id))
                {:user user
                 :client-id client-id}))
   })

(defn make-handlers [db]
  (let [p (promise)]
    @(deliver p {:welcome (resource (make-welcome-resource p))
                 :user (resource (make-user-resource p db))
                 :devices (resource (make-devices-resource p db))
                 :device (resource (make-device-resource p db))

                 })))

(defn make-routes [handlers]
  [""
   {"" (:welcome handlers)
    ["/users/" :user]
    {"" (:user handlers)
     "/devices" (:devices handlers)
     "/devices/" (bidi/->Redirect 307 (:devices handlers))
     ["/devices/" :client-id] (:device handlers)}}])


(defrecord Api [context]
  component/Lifecycle
  (start [this]
    (let [handlers (make-handlers (:database this))]
      (assoc this
        :handlers handlers
        :routes (make-routes handlers))))
  (stop [this] this)

  BidiRoutesProvider
  (routes [this]
    (:routes this))
  (context [this] context))

(defn new-api [& {:as opts}]
  (component/using
   (->> opts
        (merge {:context ""}) ; specify defaults
        (s/validate {(s/optional-key :context) s/Str})
        map->Api)
   [:database]))
