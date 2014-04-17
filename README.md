# azondi

![An Azondi](resources/public/imgs/azondi1.jpg)

A stand alone and scalable service to process data from Internet of Things devices. Azondi receives messages from the
individual devices and routes messages to relevant subscribers.  It also
serves data to the browser via a websocket on port 8083.

The aim of Azondi is to provide an easy to use end to end service for connected
devices. More information on the architectural model can be found in
our [blog](http://blog.opensensors.io/blog/2014/03/12/iot-in-the-city/)

## Messaging Broker 
Azondi has it's own built in scalable [MQTT](http://mqtt.org/) broker which
relies on
[Netty](https://github.com/OpenSensorsIO/azondi/blob/master/src/clojure/azondi/transports/mqtt.clj). Currently
the mqtt broker supports only QOS 0 level of services.

## Dispatcher

The Reactor based non-blocking dispatcher is used for event driven programming based on the Reactor Pattern. This dispatcher acts as a kind of sorting office between devices and their listeners. It receives all messages and ‘delivers’ messages to interested listeners.

## Databases

Azondi uses [Cassandra](http://cassandra.apache.org/) to record
message payloads and [Postgres](http://www.postgresql.org/) to hand
user and device authentication.

## Usage
For convenience, it would be easiest to run azondi contained within a
Vagrant environment and there is a chef cookbook supplied for this. Instructions for this can be found [here](https://github.com/OpenSensorsIO/vagrant) 

## License

Copyright © 2014 opensensors.io

Azondi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Azondi is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
