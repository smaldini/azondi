(ns azondi.oauth.oauth-test
  (:require
   [azondi.oauth.clj-webdriver-test-util :refer (browser-up browser-down )]
   ;[pl.danieljanus.tagsoup :refer (parse-string)]
   [clj-webdriver.taxi :refer :all]
   [azondi.oauth.database-utils :refer (reset-test-users create-user-foo)]
   [clojure.test :refer :all])

  (:import [java.net URLDecoder URLEncoder]))



(def client-schema "http")
(def client-host "localhost:8010")



(defn parse-params [query]
  (->>
   (clojure.string/split query #"&")
   (map #(clojure.string/split % #"=") )
   (reduce (fn [c [k v]] (assoc c (keyword k) v)) {})))


(defn parse-url [url]
  (let [ [base-url query] (clojure.string/split url #"\?")]
       {:base-url base-url
        :query query}
   ))

(defn extract-values-login-url [login-url]
  (-> (parse-url login-url)
      :query
      parse-params
      :post_login_redirect
      (URLDecoder/decode  "UTF-8")
      parse-url
      :query
      parse-params))

(extract-values-login-url "http://localhost:8020/login?post_login_redirect=%2Flogin%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3D1001%26scope%3Duser%253Awrite-devices%2520superuser%253Aread-users%2520user%253Awrite-topics%2520superuser%253Acreate-topics%2520user%253Acreate-private-topics%2520user%26state%3Df5e078f3-1d72-4d39-8ee6-8ff3f912d28a" )

(defn go-to-home []
  (to (format "%s://%s" client-schema client-host)))

(defn go-to-login-page
  ([]
     (go-to-login-page false))
  ([logged]
     (to (format "%s://%s" client-schema client-host))
     (click "a[href*='/devices'")
     #_(if logged
       (is (= "Devices" (text "h2")))
       (is (= "Please sign in…" (text "h2")))))
  )

(defn login-page-submit-user-details [user-name password]
  (input-text (find-element *driver* {:css "input[name=user]"}) user-name)
  (submit (input-text (find-element *driver* {:css "input[name=password]"}) password))
  )
(defn substring? [sub st]
  (if (not= (.indexOf st sub) -1)
   true
   false))

#_(deftest sign-up

  (let [user-name "test_new_user"
        user-password "new-user_password"]
    (reset-test-users dev/system)
    (browser-up)

    (go-to-home)
    (input-text (find-element *driver* {:css "input[name=user-id]"}) user-name)
    (input-text (find-element *driver* {:css "input[name=password]"}) user-password)
    (input-text (find-element *driver* {:css "input[name=name]"}) "JARV")
    (submit  (input-text (find-element *driver* {:css "input[name=email]"}) "juanantonioruz@gmail.com" ))
    (is (substring? "thank you for signing up" (text "p#welcome_message")))
    (go-to-login-page)
    (login-page-submit-user-details "test_new_user" "new-user_password")
    (click "a[href*='/logout'")
      (browser-down)
      )


  )

(deftest new-login-ok
  (browser-up)
  (go-to-login-page)
  (login-page-submit-user-details "juan" "juan")
  (is (=   (current-url *driver*)  (format "%s://%s/%s" client-schema client-host "devices") ) )
  (is (= "Devices" (text "h2")))
  (click "a[href*='/logout'")
  (is (= (current-url *driver*)  (format "%s://%s/" client-schema client-host) ) )
  (browser-down)
)







#_(deftest login-fail
  (browser-up)
  (go-to-login-page)
  (let [login-url (current-url *driver*)
        {:keys [state scope client_id response_type] :as original-values}
        (extract-values-login-url login-url)]

    (login-page-submit-user-details "juan" "juan")

    (is (= "Please sign in…" (text "h2")))
    (is (= login-url (current-url *driver*)))
    (is (= original-values (extract-values-login-url (current-url *driver*))))
      ;; todo check error message
    )

  (browser-down)
  )

#_(deftest login-logout-with-existent-user
  (reset-test-users dev/system)
  (create-user-foo dev/system "test_juan" "krakow" "juanantonioruz@gmail.com" "mi-api-key")
  (browser-up)
;  (quit *driver*)
  (go-to-login-page)
  (login-page-submit-user-details "test_juan" "krakow")
  (is (=   (current-url *driver*)  (format "%s://%s/" client-schema client-host) ) )
  (browser-down)
  )
