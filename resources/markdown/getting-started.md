
opensensors uses [MQTT](http://mqtt.org/) and assumes that devices
have been configured to send MQTT messages. We support qos0 quality of service.

# Open Data
Please remember that public topics are viewable by anyone. Public topics are published with an open data licence.

# Topics

Topics are the way that your messages are routed and grouped. Think of
it as the twitter hashtag equivalent but for things. Those interested can 'listen' to messages sent to your topics. The way you group
your topics is entirely up to you but we recommend you group devices
publishing similar messages together for the sake of clarity, i.e. a group of temperature sensors would
all publish to the `/users/foo/temperature` topic.

opensensors allows you free reign in managing your topics, you can
create and publish to any number of public topics under the
`/users/<your-id>/*` hierarchy.


# Register Devices

To register new devices go to click [here](/devices) and register a
new device.

Each device will be given a unique 'client' id. Once the device has been
registered you will get a password flash, please note this down and keep
it in a safe place.

Each device will be given a unique client id and this field is required for
each connection. At any given time, there can only be one instance of a connection per client id.

# Send messages

To connect and send a message to opensensors you will require your username,
device password and client id. opensensors assumes and assigns a topic using a pattern `/users/<user-id>/<topic>` for each user.

If you have any queries or feature requests do not hesitate to send an
email on [support@opensensors.IO](mailto:support@opensensors.IO)
