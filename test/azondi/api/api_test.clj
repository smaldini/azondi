(ns azondi.api.api-test
  (:require
   [clojure.test :refer :all]
   [com.stuartsierra.component :as component]
   [modular.http-kit :refer (new-webserver)]
   [modular.ring :refer (new-web-request-handler-head)]
   [modular.bidi :refer (new-router routes uri-context)]
   [bidi.bidi :refer (path-for)]
   [azondi.webapp :refer (new-webapp)]
   [azondi.api :refer (new-api)]
   [cylon.impl.login-form :refer (new-login-form)]
   [azondi.http :refer (request)]
   [azondi.dev-db :refer (new-inmemory-datastore)]
   ))

(defn new-api-system []
  (component/system-using

   (component/system-map
    :webserver (new-webserver :port 8099)
    :webhead (new-web-request-handler-head)
    :webrouter (new-router)
    :database (new-inmemory-datastore)
    :api (new-api :uri-context "/api/1.0"))

   {:webserver {:request-handler :webhead}
    :webhead {:request-handler :webrouter,
              #_:authenticator-middleware #_:authenticator}
    :webrouter [:api]}))

(def ^:dynamic *system* nil)

(defmacro with-system [system & body]
  `(let [s# (component/start ~system)]
     (try
       (binding [*system* s#] ~@body)
       (finally
         (println "System stopping!")
         ;;(Thread/sleep 4000)
         (component/stop s#)))))

(defn system-fixture [f]
  (with-system (new-api-system)
    (f)))

(use-fixtures :once system-fixture)

(defn make-uri [target & args]
  (format "http://localhost:%d%s%s"
          (-> *system* :webserver :port)
          (uri-context (-> *system* :api))
          (apply path-for (routes (-> *system* :api)) target args)))

(deftest server
  (testing "control"
    (is (= (+ 2 2) 4)))

  (testing "welcome path"
    (is (= (make-uri :azondi.api/welcome)
           "http://localhost:8099/api/1.0")))

  (testing "user path"
    (is (= (make-uri :azondi.api/user :user "alice")
           "http://localhost:8099/api/1.0/users/alice")))

  (testing "create user"
    (request :put (make-uri :azondi.api/user :user "alice")
             :data {:password "lewis"
                    :name "Alice Cheung"
                    :email "alice@example.org"
                    })

    ))
