// Include request.
const request = require('request');

// Make a request.
request('http://localhost:7000', function(error, response, body) {
  console.log('ERROR: ' + error);
  console.log('RESPONSE: ' + response);
  console.log('BODY: ' + body);
});
