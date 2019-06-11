const path = require('path');
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

app.use("/assets", express.static(__dirname + '/assets'));
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/picker.html')
})

app.post('/rgb', function (req, res) {
    res.send('nice!')

    const color = req.body.color.replace('rgb(', '').replace(')', '').split(',');

    const r = color[0].trim();
    const g = color[1].trim();
    const b = color[2].trim();
    const params = { r, g, b }

    client.publish('esp/test', JSON.stringify(params), function() {
        console.log("Message is published");
        // client.end(); // Close the connection when published
    });
});
  
app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});