/*
** NAME
**   tcp-client-multi-conn.js - An example TCP client connecting to
**                              multiple servers.
**
** USAGE
**   node tcp-client-multi-conn.js [options] <port>
**
** DESCRIPTION
**   An example TCP client connecting to multiple servers and waiting on and
**   combining multiple responses.
**
** AUTHOR
**   mjnurse.uk 2020
*/

/* eslint-disable require-jsdoc */
const Net = require('net');

let gMessagesSent = 0;
const gClients = [];
let gDataReturned = [];

function waitMs(n) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve('Done');
    }, n);
  });
}

// Parse the command line parameters.
const gPorts = process.argv[2].split(',');
for (let i=0; i<gPorts.length; i++) {
  gPorts[i] = parseInt(gPorts[i]);
}

if (!gPorts) {
  console.log(
      'Usage: node tcp-client.js <ports-comma-separated-no-spaces>');
  process.exit();
}

// Whole process wrapped in an async function to allow asynchronous calls
// to a wait function.
async function main() {
  for (let conn=0; conn<gPorts.length; conn++) {
    gClients[conn] = new Net.Socket();

    // Open a connection to a TCP server using the specified port.
    console.log('Client Opening connection:', conn, 'Port:', gPorts[conn]);

    gClients[conn].connect(gPorts[conn], 'localhost', function() {
      console.log('Client Connected, Connection:', conn, 'Port:', gPorts[conn]);
    });

    // Process data received from the server.
    gClients[conn].on('data', function(data) {
      str = data.toString();
      gDataReturned[conn] = str;
      console.log('Client Connection', conn, 'Data Received:', '"' + str + '"');
    });

    // Process a closed connection.
    gClients[conn].on('close', function() {
      console.log('Client Connection:', conn, 'closed');
    });

    // Process an error on the connection.
    gClients[conn].on('error', function(err) {
      console.log('Client Connection', conn, 'Error:', err.message);
    });
  }

  gMessagesSent = 0;
  gDataReturned = [];

  for (let conn=0; conn<gPorts.length; conn++) {
    gMessagesSent += 1;
    gClients[conn].write('Client Message sent to connection '+conn);
  }

  for (let i=1; i<1000; i++) {
    console.log('Check:', i, 'Client Num Responses:', gDataReturned.length,
        'of', gMessagesSent);
    await waitMs(10);
    if (gDataReturned.length >= gMessagesSent) {
      break;
    }
  }
  console.log('Client All servers have responded');
  process.exit();
}

main();
