# HTTP Request Example

Run a HTTP request against http-webserver-example: web-server.

File: http-request.js
```javascript
// Include request.
const request = require('request');

// Make a request.
request('http://localhost:7000', function(error, response, body) {
  console.log('ERROR: ' + error);
  console.log('RESPONSE: ' + response);
  console.log('BODY: ' + body);
});
```

#### Output

File: http-request.out
```
> nodejs web-server.js &
[1] 8286

> nodejs http-request.js 
ERROR: null
RESPONSE: [object Object]
BODY: <b>URL:</b> /<br><b>Query Value:</b> undefined<br>

> fg
nodejs web-server.js
^C

>

```
