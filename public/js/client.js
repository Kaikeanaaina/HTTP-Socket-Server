var net = require('net');
var date = new Date();

var PORT = 8080;
var HOST = 'localhost';

var client=net.connect({port: PORT, host: HOST}, function() {
  console.log('Connected');
  client.write('Hello, server! Love, Client.');

  client.write(
    'GET '+ '/'+' HTTP/1.1'+'\n'+
  // //2. headings
  //   //Content-Type: html/js/json
    'Host: localhost'+'\n' +
    'Connection: Keep-Alive'+'\n' +
    'Accept: text/html, application/json'+'\n' +
    'User-Agent: Kainoa Keanaaina'+'\n' +
  //client.write('Content-Length:###');
    'Date: '+ date +
    '\n\n'

  );
});


client.on('data', function(data) {
  readableData = data.toString();
  console.log(readableData);

  //client.end();   don't want this because it will closed  client side of the socket
});


client.on('end', function() {
  console.log('Connection closed');
});


// 'localhost':'127.0.0.1',, 'address':'::', 'family':'IPv6'