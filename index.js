var express = require('express');
var app = express();
var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDAMQP_MQTT_URL || 'mqtt://postman.cloudmqtt.com:15687');
var url = "mqtt://" + mqtt_url.host;

//username: auth[0] + ":" + auth[0] if you are on a shared instance
var options = {
  port: mqtt_url.port,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'lrkrpkec',
  password: 'NvR1JbzmQYNZ',
};

// Create a client connection
var client = mqtt.connect(url, options);

client.on('connect', function() { // When connected
  console.log('connected')

  // subscribe to a topic
//   client.subscribe('esp/test', function() {
//     // when a message arrives, do something with it
//     client.on('message', function(topic, message, packet) {
//       console.log("Received '" + message + "' on '" + topic + "'");
//     });
//   });

  // publish a message to a topic
//   client.publish('esp/test', 'my message', function() {
//     console.log("Message is published");
//     client.end(); // Close the connection when published
//   });
});

app.get('/', function (req, res) {
    res.send('Hello World!');

    client.publish('esp/test', req.query.action, function() {
        console.log("Message is published");
        // client.end(); // Close the connection when published
    });
});
  
app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});