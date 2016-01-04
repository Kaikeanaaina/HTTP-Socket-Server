//this allows us to use the module
var net = require('net');
//this allows us to use the module
var querystring = require('querystring');

//ask Net module for new Server also setting what happens when client connects
var server = net.createServer(whenSomeoneConnects);

//file system
var fs = require('fs');

function whenSomeoneConnects(socketReq){
  console.log('SOMEONE CONNECTED TO MY SERVER');
  //console.log(socketReq);




   socketReq.on('data',function(buffer){

    // this is the the request
    //it is an array of strings
    //(buffer.toString().split('\n'));

    //console.log(buffer.toString().split('\n')[0].split(' '));

    var firstHeader = buffer.toString().split('\n')[0];
    console.log(firstHeader);

    var splitFirstHeader = buffer.toString().split('\n')[0].split(' ');
    console.log(splitFirstHeader);

    if(splitFirstHeader[0] === 'GET'){
      if(splitFirstHeader[1]=== '/'){

        //1. status
        socketReq.write('200'+'\n');

        //2. headings
          //Content-Type: html/js/json
        socketReq.write('Content-Type : html'+'\n');

          //Content-Length: ------
        socketReq.write('Content-Length : 50'+'\n\n');

        //3.body
        socketReq.write('');
      }

      else if(splitFirstHeader[1]=== '/index.html'){
        socketReq.write('hawaii');
      }


    }

    // if(){

    // }


    // socketReq.write(buffer);
    // socketReq.write('aloooooooha');
    //     console.log(buffer);
    //     console.log('=============================');
    //     console.log(buffer.toString().split('\n'));
    // // socketReq.write('hello, its me youre looking for');
    // //   socketReq.write('\n\n');
    // // socketReq.write('HTTP Headers : Standard');
    // //   socketReq.write('\n\n');
    // // socketReq.write('src="./index.html"');
    socketReq.end();

  });






}


server.listen({port:8080}, function(){
  address = server.address();
  console.log("opened server on %j", address);
});

