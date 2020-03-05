/*
** NAME
**   tcp-client.js - An example TCP client.
**
** USAGE
**   node tcp-client.js [options] <port>
**
** OPTIONS
**   -i <num iterations>
**     Specify the number messages sent to the TCP server.
**
**   -l
**     Enable detailed logging.
**
**   -s <message size - characters>
**     Specify the size of the message sent to the TCP server.
**
** DESCRIPTION
**   An example TCP client with a basic performance test capability.
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

// This client runs a simple performance test passing a specified number of
// messages of a specified size to a TCP server.  The client waits for a
// response after each message.  Set default values.  These can be
// overwritten with command line parameters
let gNumIterations = 10;
let gMessageSize = 100;

// Parse the command line parameters.
for (let p=2; p<process.argv.length; p++) {
  switch (process.argv[p]) {
    case '-i':
      gNumIterations = parseInt(process.argv[++p]);
      break;
    case '-l':
      gLogging = true;
      break;
    case '-s':
      gMessageSize = parseInt(process.argv[++p]);
      break;
    default:
      gPort = parseInt(process.argv[p]);
  }
}

if (gPort) {
  let gStartTime;
  let gCount=0;

  const gClient = new Net.Socket();

  // Open a connection to a TCP server using the specified port.
  console.log('Opening connection. Port:', gPort);

  gClient.connect(gPort, 'localhost', function() {
    console.log('Connected.');
    console.log(
        'Sending:', gNumIterations, 'messages with a size of:', gMessageSize);
    gStartTime = Date.now();
  });

  // Process data recieved from the server.
  gClient.on('data', function(data) {
    str = data.toString();
    if (gLogging) {
      log('Data Recieved: First 50 Char:', '"' +
      str.slice(0, 50) + '", Length:', str.length);
    }
    // After the specified number of messages, close the connection.
    if (gCount >= gNumIterations) {
      gClient.destroy();
      console.log('Run time:', (Date.now() - gStartTime) + 'ms');
    } else { // Else send another message.
      gClient.write(String(gCount++).padEnd(gMessageSize, 'x'));
    }
  });

  // Process a closed connection.
  gClient.on('close', function() {
    console.log('Connection closed');
  });

  // Process an error on the connection.
  gClient.on('error', function(err) {
    console.log('Error:', err.message);
  });


  gClient.write(String(gCount++).padEnd(gMessageSize, 'x'));
} else {
  console.log(
      'Usage: node tcp-client.js [-l (logging)]',
      '[-i <num_iterations] [-s <message_size>] <port>');
}
