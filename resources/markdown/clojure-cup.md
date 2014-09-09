# Clojure Cup 2014

## (and hardware? software? clojure?)

Hello to all the entrants of Clojure Cup 2014!! We are really looking forward to seeing
all your cool entries.

opensensors.io enables all Clojure Cup 2014 contestants to create IoT
applications for free. 

## Overview

Essentially, Internet of Things (iot) products essentially are internet connected
physical devices either sending and/or receiving data via the
Internet. These products can vary from environmental sensors such
as temperature or air quality monitors to wearables, home
automation products and connected cars.

The architecture of IoT tends to follow a pub/sub model where devices
can publish or subscribe to data from the Internet. Further reading on
the architecture and IoT specific pub/sub model can be found[here](http://blog.opensensors.io/blog/2014/03/12/iot-in-the-city/)

As an example, using the command-line you can publish data to the Internet using[mosquitto](http://mosquitto.org/)

`mosquitto_pub -h opensensors.io -i 49 -t /users/yodit/temp -m '{"value": 100}' -u yodit -P <enter password>`

## Product Types

You can either connect a device to a web-service or connect a device
to another device (M2M).

### Connecting a Thing to a Web Service

You can connect a sensor to the internet and use it to create real-time
or historical graphs, using D3 or React. using D3 or React.  Find the api details[here](https://opensensors.io/api-docs)

### Connecting a Thing to another Thing

Alternatively, program a sensor or internet-connected device
to do something based on data from a sensor also known as (M2M).

For example, I could tell an internet connected LED light to come on
as a warning if the value of my temperature sensor goes over 100.  To do this, my warning light
device needs to subscribe to the data from my temperature (command-line example below):

`mosquitto_pub -h opensensors.io -i 50 -t /users/yodit/temp -P <enter password>`

## Further Information

- See our[getting started guide](https://opensensors.io/help)
- Get started with arduino and mqtt with our[library](https://github.com/OpenSensorsIO/opensensorsIO-arduino)
- Find inspiration and a treasure trove of sensors at[seeedstudio](http://www.seeedstudio.com/depot/)
- Search for different application ideas and get started with[Arduino](http://arduino.cc/)

If you have any problems getting started feel free to contact the support team at support@opensensors.io

Wishing everyone luck at Clojure Cup 2014!
