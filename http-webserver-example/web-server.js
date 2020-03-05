// Includes.
const http=require('http');
const url = require('url');

// Create a webserver.
const server=http.createServer((function(request, response) {
  // Parse the query string.
  const q = url.parse(request.url, true).query;
  // Write the return.
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<b>URL:</b> ' + request.url + '<br>');
  response.write('<b>Query Value:</b> ' + q.value + '<br>');
  response.end();
}));

// Start Server
server.listen(7000);
