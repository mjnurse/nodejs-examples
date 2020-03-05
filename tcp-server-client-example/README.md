# TCP Server and Client Examples

## Single Server, Single Client Test

File: test-client-server
```bash
#!/bin/bash
help_text=""
help_line="TCP Single Client, Single Server test"

echo TEST: Start a server on port 9000
echo ---------------------------------
node tcp-server -l 9000 &
sleep 2
echo

echo TEST: Start a client to connect to server
echo -----------------------------------------
node tcp-client -l -i 5 -s 10 9000
echo
sleep 2

echo TEST: Shutdown server
echo ---------------------
nc -N localhost 9000 <<< shutdown > /dev/null
```

File: test-client-server.out
```bash
> test-client-server

TEST: Start a server on port 9000
---------------------------------
Server, Port: 9000 Listening: { address: '::', family: 'IPv6', port: 9000 }

TEST: Start a client to connect to server
-----------------------------------------
Client Opening connection. Port: 9000
Client Connected.
Client Sending: 5 messages with a size of: 10
Server, Port: 9000 New client connection: ::ffff:127.0.0.1 53529
Server, Port: 9000 Data Received: "0xxxxxxxxx"
Client Client Data Received: First 50 Char: "Thanks for: 0xxxxxxxxx", Length: 22
Server, Port: 9000 Data Received: "1xxxxxxxxx"
Client Client Data Received: First 50 Char: "Thanks for: 1xxxxxxxxx", Length: 22
Server, Port: 9000 Data Received: "2xxxxxxxxx"
Client Client Data Received: First 50 Char: "Thanks for: 2xxxxxxxxx", Length: 22
Server, Port: 9000 Data Received: "3xxxxxxxxx"
Client Client Data Received: First 50 Char: "Thanks for: 3xxxxxxxxx", Length: 22
Server, Port: 9000 Data Received: "4xxxxxxxxx"
Client Client Data Received: First 50 Char: "Thanks for: 4xxxxxxxxx", Length: 22
Client Run time: 11ms
Client Connection closed
Server, Port: 9000 Client closed connection ::ffff:127.0.0.1 53529

TEST: Shutdown server
---------------------
Server, Port: 9000 New client connection: ::ffff:127.0.0.1 53530
Server, Port: 9000 Data Received: "shutdown"
Server, Port: 9000 Shutting down when all connections close
Server, Port: 9000 Client closed connection ::ffff:127.0.0.1 53530
```

## Multiple Servers, Single Client Test

File: test-client-multi-server
```bash
#!/bin/bash
help_text=""
help_line="TCP Single Client, Multi Server test"

echo TEST: Start 3 servers on ports 9000,9001,9002
echo ---------------------------------------------
node tcp-server -l 9000 &
node tcp-server -l 9001 &
node tcp-server -l 9002 &
sleep 2
echo

echo TEST: Start a client to connect to servers
echo ------------------------------------------
node tcp-client-multi-conn 9000,9001,9002
echo
sleep 2

echo TEST: Shutdown servers
echo ----------------------
nc -N localhost 9000 <<< shutdown > /dev/null
nc -N localhost 9001 <<< shutdown > /dev/null
nc -N localhost 9002 <<< shutdown > /dev/null
```

File: test-client-multi-server.out
```bash
> test-client-multi-server

TEST: Start 3 servers on ports 9000,9001,9002
---------------------------------------------
Server, Port: 9001 Listening: { address: '::', family: 'IPv6', port: 9001 }
Server, Port: 9002 Listening: { address: '::', family: 'IPv6', port: 9002 }
Server, Port: 9000 Listening: { address: '::', family: 'IPv6', port: 9000 }

TEST: Start a client to connect to servers
------------------------------------------
Client Opening connection: 0 Port: 9000
Client Opening connection: 1 Port: 9001
Client Opening connection: 2 Port: 9002
Check: 1 Client Num Responses: 0 of 3
Client Connected, Connection: 0 Port: 9000
Server, Port: 9001 New client connection: ::ffff:127.0.0.1 54779
Client Connected, Connection: 1 Port: 9001
Server, Port: 9002 New client connection: ::ffff:127.0.0.1 54780
Server, Port: 9000 New client connection: ::ffff:127.0.0.1 54778
Check: 2 Client Num Responses: 0 of 3
Client Connected, Connection: 2 Port: 9002
Server, Port: 9001 Data Received: "Client Message sent to connection 1"
Server, Port: 9000 Data Received: "Client Message sent to connection 0"
Client Connection 1 Data Received: "Thanks for: Client Message sent to connection 1"
Server, Port: 9002 Data Received: "Client Message sent to connection 2"
Client Connection 0 Data Received: "Thanks for: Client Message sent to connection 0"
Client Connection 2 Data Received: "Thanks for: Client Message sent to connection 2"
Client All servers have responded
Server, Port: 9000 Client closed connection ::ffff:127.0.0.1 54778
Server, Port: 9001 Client closed connection ::ffff:127.0.0.1 54779
Server, Port: 9002 Client closed connection ::ffff:127.0.0.1 54780

TEST: Shutdown servers
----------------------
Server, Port: 9000 New client connection: ::ffff:127.0.0.1 54781
Server, Port: 9000 Data Received: "shutdown"
Server, Port: 9000 Shutting down when all connections close
Server, Port: 9000 Client closed connection ::ffff:127.0.0.1 54781
Server, Port: 9001 New client connection: ::ffff:127.0.0.1 54782
Server, Port: 9001 Data Received: "shutdown"
Server, Port: 9001 Shutting down when all connections close
Server, Port: 9001 Client closed connection ::ffff:127.0.0.1 54782
Server, Port: 9002 New client connection: ::ffff:127.0.0.1 54783
Server, Port: 9002 Data Received: "shutdown"
Server, Port: 9002 Shutting down when all connections close
Server, Port: 9002 Client closed connection ::ffff:127.0.0.1 54783
```
