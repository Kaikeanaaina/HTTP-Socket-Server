//this allows us to use the module
var net = require('net');
//this allows us to use the module
var querystring = require('querystring');

//ask Net module for new Server also setting what happens when client connects
var server = net.createServer(whenSomeoneConnects);

function whenSomeoneConnects(socketReq){
  console.log('SOMEONE CONNECTED TO MY SERVER');




   socketReq.on('data',function(buffer){
    socketReq.write(buffer);
    socketReq.write('aloooooooha');
        console.log(buffer);
        console.log('=============================');
        console.log(buffer.toString().split('\n'));
    // socketReq.write('hello, its me youre looking for');
    //   socketReq.write('\n\n');
    // socketReq.write('HTTP Headers : Standard');
    //   socketReq.write('\n\n');
    // socketReq.write('src="./index.html"');
    socketReq.end();

  });






}


server.listen({port:8080}, function(){
  address = server.address();
  console.log("opened server on %j", address);
});

