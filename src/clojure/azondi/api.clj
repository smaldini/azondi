(ns azondi.api
  (:require
   ;; The reason to use bidi here is to create a proper RESTful API
   ;; where resources are linked together using hyperlinks. Without
   ;; bidi, construction of these hyperlinks becomes increasingly
   ;; cumbersome and brittle.
   [clojure.tools.logging :refer :all]
   [bidi.bidi :as bidi :refer (path-for ->Redirect)]
   [liberator.core :refer (resource)]
   [com.stuartsierra.component :as component]
   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [cheshire.core :refer (decode decode-stream encode)]
   [schema.core :as s]
   [camel-snake-kebab :refer (->kebab-case-keyword ->camelCaseString)]
   [azondi.db :refer (get-users get-user get-user-by-email delete-user! create-user! devices-by-owner get-device delete-device! create-device! patch-device! topics-by-owner get-topic delete-topic! create-topic! patch-topic! set-device-password! get-api-key delete-api-key create-api-key reset-user-password find-user-by-api-key create-subscription unsubscribe subscriptions-by-owner get-ws-session-token delete-ws-session-token create-ws-session-token find-ws-session-by-token)]
   [azondi.messages-db :refer (messages-by-owner messages-by-topic messages-by-topic-and-date messages-by-owner-and-date messages-by-device messages-by-device-and-date)]
   [azondi.emails :refer (beta-signup-email)]
   [hiccup.core :refer (html)]
   [clojure.walk :refer (postwalk)]
   liberator.representation
   [modular.bidi :refer (WebService)]
   [cylon.authentication :refer (Authenticator authenticate)]
   [cylon.authorization :refer (Authorizer authorized?)]
   [clj-time.core :as t :refer (now date-time) ]
   [clj-time.format :as tf]
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
                  ("application/json" "application/edn") {:message welcome :current-date (java.util.Date.)}))})

(defn query-string>map-kv [query-string]
  (if query-string
   (->> (clojure.string/split query-string #"&")
        (map #(clojure.string/split %  #"="))
        (mapcat (fn [[k v]] [(keyword k) v]))
        (apply array-map))
   {}))

(defn string-date>vector
  [str-date ]
  (let [res (into [] (map #(. Integer parseInt  %) (clojure.string/split str-date  #"-")))
        c (count res )]
    (assert (or (= c 3) (= c 4)) "date format incorrect")
    (let [[y m d h] res]
      (assert (and (> y 2000) (< y (inc (t/year (t/now))))) "the year number can't be prior to 2000")
      (assert (and (> m 0) (< m 13)) "the month number has to be within 1 and 12")
      (assert (and (> d 0) (< d 31)) "the day has to be within 1 and 31")
      (assert (or (nil? h) (and (>= h 0) (< h 24))) "the hour has to be within 0 and 23"))
    res))

(defn malformed-range-date? [start-date end-date]
  (let [start  (apply t/date-time  (string-date>vector start-date))
        end  (apply t/date-time  (string-date>vector end-date))]

    (if (or (t/before? start end) (= start end))
      [false { ::start-date start ::end-date end}]
      [true {::error (format "The start-date have to be prior to end-date. Dates provided, start-date: %s end-date: %s" start-date end-date)
             :representation {:media-type "application/json"}}])
    )
  )


(defn malformed-date-format? [str-date]
  (try
    (when-not (nil? str-date)
      (string-date>vector str-date)
      nil)
    (catch NumberFormatException e  [true { ::error  (format "The date value can contain only numbers, you provided: %s" str-date)}])
    (catch AssertionError  e  [true { ::error  (.getMessage e)}])
))

(defn check-dates [{{query-string :query-string :as req} :request}]
  (let [query-string-map (query-string>map-kv query-string)]
    (if (and (:start-date query-string-map)  (:end-date query-string-map))
      (let [date-condition-fn (fn [k] (= true (let [[a _] (malformed-date-format? (get query-string-map k))]
                                           a
                                           )))
        date-error-response-fn  (fn [k] [true {::error (format "%s value malfomed. %s. \n Accepted date format: YYYY-MM-DD or YYYY-MM-DD-HH.\n "
                                                              (name k)
                                                              (::error (second (malformed-date-format? (get query-string-map k)))))
                                              :representation {:media-type "application/json"}}])
        first-date-level-check (cond
                   (date-condition-fn :start-date) (date-error-response-fn :start-date)
                   (date-condition-fn :end-date) (date-error-response-fn :end-date)
                   :else nil)
        ]
    (if first-date-level-check
      first-date-level-check
      (malformed-range-date? (:start-date query-string-map) (:end-date query-string-map))))
      [false]
     ))

  )



(defn- malformed-messages-by-call? [k]
  (fn [{{query-string :query-string :as req} :request}]
    (let [query-string-map (query-string>map-kv query-string)]
      (if (nil? (get query-string-map k))
        [true {:representation {:media-type "application/json"}
               ::error (format "You need to provide a %s" (name k)) }]
        (check-dates {:request req})))))

(defn messages-by-owner-resource [messages-db authorizer]
  {:allowed-methods #{:get}
   :available-media-types #{"application/json"}
   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))
   :malformed? check-dates
   :handle-malformed (fn [ctx] {:status 400 :error (::error ctx)})
   :handle-ok (fn [{{{user :user} :route-params :as req} :request :as ctx} ]
                (let [query-string-map (query-string>map-kv (:query-string req))
                      res (if (and (:start-date query-string-map)  (:end-date query-string-map))
                            (messages-by-owner-and-date messages-db user
                                                        (::start-date ctx)
                                                        (::end-date ctx))
                            (messages-by-owner messages-db user))]
                  (encode {:messages res})))})



(defn messages-by-topic-resource [db messages-db authorizer]
  {:allowed-methods #{:get}
   :authorized?
   (fn [{{query-string :query-string {user :user :as rp} :route-params :as req} :request}]
     (when (authorized? authorizer req  rp)
       (let [topic-req (:topic (query-string>map-kv query-string))
             topic (get-topic db topic-req)
             pass? (or (nil? topic)
             (:public topic)
             (= (:owner topic) user))]
         (if pass?
           [true { ::topic topic ::topic-req topic-req}]
           [false]
           )
         )))
   :available-media-types #{"application/json"}
   :malformed? (malformed-messages-by-call? :topic)
   :handle-malformed (fn [ctx] {:status 400 :error (::error ctx)} )
   :exists? (fn [ctx]
               (println "topic " (::topic ctx))
               (if-let [topic (::topic ctx)]
                        [true ]
                        [false {:status 404 ::error (str "Topic not found: " (::topic-req ctx)) :representation {:media-type "application/json"}}]) )
   :handle-not-found (fn [ctx] {:status 404 :error (::error ctx)} )
   :handle-ok (fn [ctx]
                (let [topic-req (::topic-req ctx)
                      topic (::topic ctx)]

                  (encode {:messages (if (and (::start-date ctx) (::end-date ctx))
                                       (messages-by-topic-and-date messages-db
                                                                   topic-req
                                                                   (::start-date ctx)
                                                                   (::end-date ctx))
                                       (messages-by-topic messages-db topic-req))})))})


(defn messages-by-device-resource [db messages-db authorizer]
  {:allowed-methods #{:get}
   :authorized? (fn [{{query-string :query-string {user :user :as rp} :route-params :as req} :request}]
                  (when  (authorized? authorizer req  rp)
                    (when-let [device-id (:client (query-string>map-kv query-string))]
                      (let [device (get-device db device-id)
                            pass? (or (nil? device) (= (:user device) user))]
                        (if pass?
                          [true { ::device device ::device-req device-id}]
                          [false])


                        ))))
   :malformed? (malformed-messages-by-call? :client)
   :handle-malformed (fn [ctx] {:status 400 :error (::error ctx)} )
   :exists? (fn [ctx]
                  (if-let [device (::device ctx)]
                        [true ]
                        [false {:status 404 ::error (str "Client not found: " (::device-req ctx)) :representation {:media-type "application/json"}}]) )
      :handle-not-found (fn [ctx] {:status 404 :error (::error ctx)} )

   :available-media-types #{"application/json"}
   :handle-ok (fn [ctx]
                (let [device-req (::device-req ctx)
                      device (::device ctx )]
                  (encode {:messages (if (and (::start-date ctx) (::end-date ctx))
                                       (messages-by-device-and-date messages-db
                                                                    device-req
                                                                    (::start-date ctx)(::end-date ctx))
                                       (messages-by-device messages-db device-req))})

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
       (for [user (get-users db)] {:user user :href (bidi/path-for routes :user :user (:user user))})))})

(def new-user-schema
  {(s/optional-key :name) s/Str
   :password s/Str
   :email s/Str
   })

(defn user-resource [db authorizer]
  {:available-media-types #{"application/json" "text/html"}
   :allowed-methods #{:put :get}

   #_:authorized? #_(fn [{{{user :user :as rp} :route-params :as request} :request}]

                  (authorized? authorizer request rp))

   #_:handle-unauthorized #_(fn [_] (encode {:error "Unauthorized"}))

   :known-content-type? #{"application/json"}
   :processable? (create-schema-check new-user-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :exists? (fn [{{{user :user} :route-params} :request}]
              {::user (-> (get-user db user)
                          (dissoc :password)
                          (dissoc :email)
                          )})

   :handle-ok (fn [{user ::user {media-type :media-type} :representation req :request}]
                (case media-type
                  "application/json" user
                  "text/html" (html
                               [:dl
                                (for [[k v] user]
                                  (list [:dt k]
                                        [:dd v]))])))

   :put! (fn [{{:keys [name email password]} :body {{user :user} :route-params} :request}]
           (let [u (create-user! db name user email password)
                 _ (create-api-key db user)
                 ;;_ (set-api-key uesrs user)
                 ;;api-key (get-api-key user)
                 ]
             ;; We create the api-key, in order to return. This is
             ;; really just to help with the tests. Is this appropriate?
             {:response-body {:api-key (:api (get-api-key db user))
                              :user u}}))

   :handle-created (fn [{body :response-body}] body)})

(defn user-id-resource
  "New user signup, detects whether a user id exists"
  [db]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get}
   :exists? (fn [{{{user :user} :route-params} :request}]
              (when (get-user db user)
                {::userid user}))

   :handle-ok (fn [{userid ::userid}]
                {:userid userid} )
   })

(defn user-email-resource
  "Detects if an email is already registered in the system"
  [db]
  :available-media-types #{"application/json"}
   :allowed-methods #{:get}
   :exists? (fn [{{{email :email} :route-params} :request}]
              (when (get-user-by-email db email)
                {::email email}))

   :handle-ok (fn [{email ::email}]
                {::email email} ))

(defn reset-user-password-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:post}

   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :post! (fn [{{body :body {user :user} :route-params} :request}]
            (let [password (get-in (->clj (read-json-body body)) [:password])]
              (reset-user-password db user password)
              {:password password}))
   :handle-created (fn [{password :password}] {} )})

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


(defn devices-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post}

   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

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

   :post! (fn [{body :body {{user :user} :route-params} :request}]
            {:device
             (let [p (generate-device-password)]
               (-> (create-device! db user p)
                   (assoc :password p)))})

   :handle-created (fn [{device :device}] (->js device))})




(defn device-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :put :delete}
   ;;:allowed? same-user
   :known-content-type? #{"application/json"}

   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

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

   :handle-ok (fn [{client-id :client-id}]
                (let [res
                      (get-device db client-id)]
                  (infof "get-device returning %s" res)
                  res
                  ))
   :handle-created (fn [_] {:message "Patched"})})


(defn reset-device-password-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:post}

   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :post! (fn [{{{:keys [client-id]} :route-params} :request}]
            (let [p (generate-device-password)]
              (set-device-password! db (str client-id) p)
              {:password p}))
   :handle-created (fn [{password :password}] {:password password})})

(def topic-attributes-schema
  {(s/optional-key :public) s/Bool
   (s/optional-key :unit) s/Str
   (s/optional-key :description) s/Str})

(defn topics-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get}

   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :handle-ok (fn [{{{user :user} :route-params} :request}]
                (let [body
                      {:user user
                       :topics (->>
                                (topics-by-owner db user)
                                (map #(select-keys % [:owner :description :unit :topic :public]))
                                (map #(reduce-kv (fn [acc k v] (assoc acc (->camelCaseString k) v)) {} %)))}]
                  (encode body)))})

(defn topic-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :put :delete}

   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :known-content-type? #{"application/json"}
   :exists? (fn [{{{user :user topic-name :topic-name} :route-params} :request}]
              (infof "topic resource exists..?")
              (let [topic (str "/users/" user "/" topic-name)
                    existing (get-topic db topic)]
                [existing
                 {:existing existing
                  :topic topic}]))

   :processable? (create-schema-check topic-attributes-schema)
   :handle-unprocessable-entity handle-unprocessable-entity

   :put! (fn [{topic :topic
               existing :existing
               body :body
               {{user :user} :route-params} :request}]
           (infof "topic put! body is %s" body )
           (if-not existing
             (do
               (infof "Topic to put! is %s" (assoc body :topic topic :owner user))
               (create-subscription db user topic)
               (create-topic! db (assoc body :topic topic :owner user)))
             (patch-topic! db topic (assoc body :owner user))))

   :delete! (fn [{topic :topic}] (delete-topic! db topic))
   :handle-ok (fn [{topic :topic existing :existing}] existing)
   :handle-created (fn [_] {:message "Patched"})})


(def subscriptions-attributes-schema
  {(s/required-key :topic) s/Str})

(defn subscriptions-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post :delete}
   :known-content-type? #{"application/json"}
   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))
   :handle-ok (fn [{{{user :user} :route-params :as req} :request}]
                (encode {:user user
                         :subscriptions (->>
                                         (subscriptions-by-owner db user)
                                         (map #(select-keys % [:topic]))
                                         (map #(reduce-kv (fn [acc k v] (assoc acc (->camelCaseString k) v)) {} %)))}))
   :processable? (create-schema-check subscriptions-attributes-schema)

   :handle-unprocessable-entity handle-unprocessable-entity

   :post! (fn [{body :body {{user :user} :route-params} :request}]
            {:subscription
             (let [topic (get-in (->clj (read-json-body body)) [:topic])]
               (create-subscription db user topic))})

   :delete! (fn [{body :body {{user :user} :route-params} :request}]
              (let [topic (get-in (->clj (read-json-body body)) [:topic])]
                (unsubscribe db user topic)))

   :handle-created (fn [{body :response-body}] body)})

(defn api-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post}
   :known-content-type? #{"application/json"}

   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :exists? (fn [{{{user :user} :route-params} :request}]
              (let [api-key (-> (get-api-key db user)
                                (select-keys [:api]))]
                {:user user :api-key api-key}))
   :handle-ok (fn [{user :user api-key :api-key}]
                (assoc api-key :user user))
   :post! (fn [{body :body {{user :user} :route-params} :request}]
            {:api-key
             (if (get-api-key db user)
               (do
                 (delete-api-key db user)
                 (create-api-key db user))
               (create-api-key db user))})

   :handle-created (fn [{api-key :api-key}]
                     (->js api-key))})

(defn ws-resource [db authorizer]
  {:available-media-types #{"application/json"}
   :allowed-methods #{:get :post}
   :known-content-type? #{"application/json"}
   :authorized? (fn [{{{user :user :as rp} :route-params :as request} :request}]
                  (authorized? authorizer request rp))

   :handle-unauthorized (fn [_] (encode {:error "Unauthorized"}))

   :exists? (fn [{{{user :user} :route-params} :request}]
              (let [token (-> (get-ws-session-token db user)
                                (select-keys [:token]))]
                {:user user :token token}))
   :handle-ok (fn [{user :user token :token}]
                (assoc token :user user))
   :post! (fn [{{{user :user} :route-params} :request}]
            {:token
             (if (get-ws-session-token db user)
               (do
                 (delete-ws-session-token db user)
                 (create-ws-session-token db user))
               (create-ws-session-token db user))})

   :handle-created (fn [{token :token}]
                     token)})

(defn wrap-with-fn-validation [h]
  (fn [req]
    (s/with-fn-validation
      (h req))))

(defn apply-middleware-to-handlers [m middleware]
  (reduce-kv (fn [a k v] (assoc a k (middleware v))) {} m))


(defn handlers [db messages-db authorizer]
  (->
   {::welcome (resource (welcome-resource))
    ::users (resource (users-resource db))
    ::userid (resource (user-id-resource db))
    ::user-email (resource (user-email-resource db))
    ::user (resource (user-resource db authorizer))
    ::devices (resource (devices-resource db authorizer))
    ::device (resource (device-resource db authorizer))
    ::reset-password (resource (reset-device-password-resource db authorizer))
    ::topics (resource (topics-resource db authorizer))
    ::topic (resource (topic-resource db authorizer))
    ::subscriptions (resource (subscriptions-resource db authorizer))
    ::api-key (resource (api-resource db authorizer))
    ::reset-user-password (resource (reset-user-password-resource db authorizer))

    ::ws-token (resource (ws-resource db authorizer))
    ::messages-by-owner (resource (messages-by-owner-resource messages-db authorizer))
    ::messages-by-topic (resource (messages-by-topic-resource db messages-db authorizer))
    ::messages-by-device (resource (messages-by-device-resource db messages-db authorizer))}
   (apply-middleware-to-handlers wrap-with-fn-validation)))

(def routes
  ["" {"" ::welcome
       "/" (->Redirect 307 ::welcome)
       ["/topics/" :topic] ::topics
       ["/userids/" :user] ::userid
       "/user-email" ::user-email
       "/users" (->Redirect 307 "/users/")
       "/users/" ::users
       "/messages"  ::messages-all
       ["/users/" :user] {"" ::user
                          "/devices/" ::devices
                          "/devices" (->Redirect 307 ::devices)
                          ["/devices/" :client-id] ::device
                          ["/devices/" :client-id "/reset-password"] ::reset-password
                          "/topics/" ::topics
                          "/topics" (->Redirect 307 ::topics)
                          ["/topics/" :topic-name] ::topic
                          "/subscriptions/" ::subscriptions
                          "/subscriptions" (->Redirect 307 ::subscriptions)
                          "/api-key/" ::api-key
                          "/api-key" (->Redirect 307 ::api-key)
                          "/ws-token/" ::ws-token
                          "/ws-token" (->Redirect 307 ::ws-token)
                          "/reset-password" ::reset-user-password
                          "/messages-by-owner" ::messages-by-owner
                          "/messages-by-topic"  ::messages-by-topic
                          "/messages-by-device"  ::messages-by-device}}]
  )


(defrecord Api []
  WebService
  (request-handlers [this] (handlers (:database this) (:cassandra this) (:authorizer this)))
  (routes [_] routes)
  (uri-context [_] "/api/1.0"))

(defn new-api [& {:as opts}]
  (component/using (->Api) [:database :authorizer :cassandra]))

;; Authorization

(defrecord UserAuthorizer []
  Authorizer
  (authorized? [this request requirement]
    (infof "Authorizing %s against requirement %s"
           (dissoc request :modular.bidi/routes :modular.bidi/handlers)
           requirement
           )
    (infof "Authenticator is: %s" (:authenticator this))
    (= (:cylon/user (authenticate (:authenticator this) request))
       (:user requirement))))

(defn new-user-authorizer []
  (component/using (->UserAuthorizer) [:authenticator]))

;; Authentication

(defrecord ApiKeyAuthenticator []
  Authenticator
  (authenticate [this request]
    (when-let [header (get-in request [:headers "authorization"])]
      (when-let [api-key (second (re-matches #"\Qapi-key\E\s+(.*)" header))]
        (when-let [user (find-user-by-api-key (:database this) api-key)]
          {:cylon/user user
           :cylon/authentication-method :api-key})))))

(defn new-api-key-authenticator []
  (component/using (->ApiKeyAuthenticator) [:database]))
