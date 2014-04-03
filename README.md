# azondi

A tool to process high volumes of Internet of Things data. Azondi
receives messages from the individual devices and serves them to the
browser via a websocket on port 8083.

## Messaging Broker 
Azondi has it's own built in scalable [MQTT](http://mqtt.org/) broker which
relies on
[Netty](https://github.com/OpenSensorsIO/azondi/blob/master/src/clojure/azondi/transports/mqtt.clj). Currently
the mqtt broker supports only QOS 0 level of services.

## Dispatcher

The Reactor based non-blocking dispatcher is used for event driven programming based on the Reactor Pattern. This dispatcher acts as a kind of sorting office between devices and their listeners. It receives all messages and ‘delivers’ messages to interested listeners.

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
