/*
** NAME
**   tcp-server.js - An example TCP server.
**
** USAGE
**   node tcp-server.js <port to listen on>
**
** DESCRIPTION
**   An example TCP server.
**
**   Hint: You can connect to and interact with this server on linux using the
**         netcat (nc) utility. eg: 'nc localhost 9000'
**
** AUTHOR
**   mjnurse.uk 2020
*/

const Net = require('net');

let gLogging = false;
// The port number for the TCP server is passed as a command line parameter.
let gPort;

// eslint-disable-next-line require-jsdoc
function log(a='', b='', c='', d='', e='', f='', g='', h='', i='', j='') {
  gLogging && console.log(a, b, c, d, e, f, g, h, i, j);
}

// Parse the command line parameters.
for (let p=2; p<process.argv.length; p++) {
  switch (process.argv[p]) {
    case '-l':
      gLogging = true;
      break;
    default:
      gPort = parseInt(process.argv[p]);
  }
}

const gServer = Net.createServer();

// Process a new server connection.
gServer.on('connection', function(conn) {
  console.log('Server, Port:', gPort, 'New client connection:',
      conn.remoteAddress, conn.remotePort);

  // Process data received over the connection.
  conn.on('data', function(data) {
    const str = data.toString();
    log('Server, Port:', gPort, 'Data Received:',
        '"' + str + '"');

    // If the message 'shutdown' is passed over the connection instruct the
    // server to shutdown once all connections are closed.
    if (str.slice(0, 8) == 'shutdown') {
      console.log('Server, Port:', gPort,
          'Shutting down when all connections close');
      gServer.close();
    }
    // Respond and return the data passed in.  This is really only useful
    // to test performance passing large messages back and forth.
    conn.write('Thanks for: ' + data);
  });

  // Process a closed connection.
  conn.on('close', function() { // what about on 'end'?
    console.log('Server, Port:', gPort, 'Client closed connection',
        conn.remoteAddress, conn.remotePort);
  });

  // Process an error on the connection.
  conn.on('error', function(err) {
    console.log('Server, Port:', gPort,
        'Error:', conn.remoteAddress, conn.remotePort, err.message);
  });
});

// Use the first command line parameter as the port number.
if (gPort) {
  gServer.listen(gPort, function() {
    console.log('Server, Port:', gPort, 'Listening:', gServer.address());
  });
} else {
  console.log('Usage: node tcp-client.js [-l (logging)] <port>');
}
