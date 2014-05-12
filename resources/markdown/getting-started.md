# Getting Started with opensensors.IO

opensensors uses [MQTT](http://mqtt.org/) and assumes that devices
have been configured to send MQTT messages. Currently we support qos0 message persistence.
Please remember that public topics are viewable by anyone.

## Connecting devices to opensensors

### Create the device

To register new devices go to click [here](/devices) and register a
new device.

Each device will be given a unique device id. Once the device has been
registered you will get a password flash, please note this down and keep
it in a safe place.

Each device will be given a unique client id and this field is required for
each connection. At any given time, there can only be one instance of a connection per client id.

### Sending messages

To connect and send a message to opensensors you will require your username,
device password and client id. opensensors assumes and assigns a topic
id using a pattern users/'user-id'/'topic' for each person

If you have any queries or feature requests do not hesitate to send an
email on support@opensensors.IO
