(ns azondi.api.api-test
  (:require
   [clojure.test :refer :all]
   [com.stuartsierra.component :as component]
   [modular.http-kit :refer (new-webserver)]
   [modular.ring :refer (new-web-request-handler-head)]
   [modular.bidi :refer (new-router)]
   [azondi.webapp :refer (new-webapp)]
   [azondi.api :refer (new-api)]
   [cylon.impl.login-form :refer (new-login-form)]
   ))

(defn new-api-system []
  (component/system-using

   {:webserver (new-webserver :port 8099)
    :webhead (new-web-request-handler-head)
    :webrouter (new-router)
    :webapp (new-webapp)
    :api (new-api :uri-context "/api/1.0")}

   {:webserver {:request-handler :webhead}
    :webhead {:request-handler :webrouter, :authenticator-middleware :authenticator}
    :webrouter [:webapp :api]}))

(def ^:dynamic *system* nil)

(defmacro with-system [system & body]
  `(let [s# ~system]
     (try
       (component/start s#)
       (binding [*system* s#] ~@body)
       (finally
         (component/stop s#)))))

(defn system-fixture [f]
  (with-system (new-api-system)
    (f)))

(use-fixtures :once system-fixture)

(deftest server
  (testing "webserver"
    (println "System is " (type *system*))
    (is (= (+ 2 2) 4))))
