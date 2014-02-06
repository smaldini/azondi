## Development

### Alongside other components

First, clone Jig.

    git clone https://github.com/juxt/jig.git

Now create a ```~/.jig/config.clj``` file and add the following content :-

    #=(eval
       (-> (clojure.core/read-string (slurp "../azondi/config.clj"))))

Change the location of the ```../azondi/config.clj``` file which is resolved relative to the Jig repo directory.

Check the paths in Jig's ```project.clj``` and ```config/config.clj```, and modify them according to your local environment. Then use ```lein repl``` (or ```M-x nrepl-jack-in``` if you're using Emacs) and develop according to [Stuart Sierra's workflow reloaded pattern](http://thinkrelevance.com/blog/2013/06/04/clojure-workflow-reloaded). See Jig's [README.md](https://github.com/juxt/jig) for more information.

    (go)
    (reset)
    (reset)
    (reset)
    (reset)
    (reset)
    (reset)

(Don't be too concerned about having to edit Jig's ```project.clj``` file. I have a version of Jig in the pipeline that allows external project references in the config, it's just not ready for service yet).

### Just azondi

Symlink or create a config.{edn,clj} in `resources/`, where jig will find it as it's on the classpath. Then `lein repl` or otherwise start a REPL from the azondi directory.

Ready-to-symlink configs are in `configs/`.

## Configuration

The components involved are laid out in Jig's ```config/config.clj``` file.

Here's a (probably out-of-date) example.

    :server
    {:jig/component jig.web.server/Component
     :io.pedestal.service.http/port 8000
     :io.pedestal.service.http/type :jetty
     }

    :opensensors/web
    {:jig/component jig.web.app/Component
     :jig/dependencies [:server]
     :jig/scheme :http
     :jig/hostname "localhost"
     :jig.web/server :server
     }

    :opensensors/mosquitto-bridge
    {:jig/component opensensors.mqtt/MqttBridge
     }

    :opensensors/service
    {:jig/component opensensors.core/WebServices
     :jig/dependencies [:opensensors/web :opensensors/mosquitto-bridge]
     :jig.web/app-name :opensensors/web
     :channel [:opensensors/mosquitto-bridge :channel]
     :static-path "../adl/mqtt.opensensors.io/public"
     }

    :opensensors/scheduled-thread-pool
    {:jig/component opensensors.core/ScheduledThreadPool
     }

    :opensensors/dummy-event-generator
    {:jig/component opensensors.core/DummyEventGenerator
     :jig/dependencies [:opensensors/service :opensensors/scheduled-thread-pool]
     }

Each component has a lifecycle consisting of ```init```, ```start``` and ```stop``` phases. The order that components are started in is determined by Jig, see ```:jig/dependencies``` in the config.

The first 2 components are provided by Jig, and they help get a website up and running using Pedestal routes. That much comes for free. The remaining components are provided by this project and are described here.

### mqtt-server

This started the Netty mqtt server on port 1883

### opensensors.core/WebServices

This sets up the web routes, allows browsers to subscribe to server-sent
events and bridges the MQTT channel (described above) to these SSE subscribers. Too much
really. I expect this will decomplected in due course.

Note that this component has a dependency on the MqttBridge component so
that it gets initialized *after*, so the core.async channel it needs is
already available in the system map.

### opensensors.core/ScheduledThreadPool

This is an example of the sort of thing you want to put in your
[system map](http://thinkrelevance.com/blog/2013/06/04/clojure-workflow-reloaded),
but just a Jig componentized version.

### opensensors.core/DummyEventGenerator

Places dummy events on the core.async channel, just to create some test noise (I wrote this prior to the MqttBridge, so it allowed me to connect things up for test purposes). I've left it in for example purposes. It's also handy because there is sometimes quite long gaps in receiving events from test.mosquitto.org

### :opensensors/database
Assumes that a datastax Cassandra DB is running locally with a
predefined keyspace "opensensors".  For remote databases change your
the hosts.
