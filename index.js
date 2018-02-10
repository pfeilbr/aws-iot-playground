var awsIot = require('aws-iot-device-sdk');
var dotenv = require('dotenv')
dotenv.config()

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts 
// to connect with a client identifier which is already in use, the existing 
// connection will be terminated.
//
var device = awsIot.device({
   keyPath: process.env.KEY_PATH,
  certPath: process.env.CERT_PATH,
    caPath: process.env.CA_PATH,
  clientId: process.env.CLIENT_ID,
      host: process.env.HOST
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function() {
    console.log('connect');
    device.publish('myTopic', JSON.stringify({ test_data: 1}));
    device.publish('messages', JSON.stringify({ "msg": "lorem ipsum"}));
  });

  device
  .on('close', function() {
     console.log('close');
  });
device
  .on('reconnect', function() {
     console.log('reconnect');
  });
device
  .on('offline', function() {
     console.log('offline');
  });
device
  .on('error', function(error) {
     console.log('error', error);
  });
device
  .on('message', function(topic, payload) {
     console.log('message', topic, payload.toString());
  });