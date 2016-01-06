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
   socketReq.on('data',function(buffer){
    // this is the the request
    //it is an array of strings
    //(buffer.toString().split('\n'));

    var status = buffer.toString().split('\n')[0];
    var splitStatus = buffer.toString().split('\n')[0].split(' ');
    var uri = splitStatus[1];
    var date = new Date();
    console.log(uri);

    var notFound = function(){
        socketReq.write('HTTP/1.1 404 Not Found'+'\n');
        socketReq.write('Server: kanakaHacks'+'\n');
        socketReq.write('Date: '+ date+'\n');
        socketReq.write('Content-Type : text/html; charset=uft-8'+'\n');
        socketReq.write('Connection: keep-alive'+'\n\n');
        socketReq.write(' ');
      fs.readFile('./../html/404.html', function (err, data) {
        if(err) throw err;
        socketReq.write(data);
        //return socketReq.end();
      });
    };

    if(uri=== '/css/styles.css'|| uri==='/css'){
      fs.readFile('./..'+uri, function (err, data) {
      if (err) {
        notFound();
      }
      else{
      //1. status
      socketReq.write('HTTP/1.1 200 OK'+'\n');
      // //2. headings
      //   //Content-Type: html/js/json
      socketReq.write('Server: kanakaHacks'+'\n');
      socketReq.write('Date: '+ date+'\n');
      socketReq.write('Content-Type : text/html; charset=uft-8'+'\n');
      socketReq.write('Connection: keep-alive'+'\n\n');
      socketReq.write(' ');

        socketReq.write(data);
        //return socketReq.end();
      }
    });
    }

    else{
      if(uri==='/'){
        uri='/index.html';
      }

      fs.readFile('./../html'+uri, function (err, data) {
        if (err) {
          notFound();
        }
        else{
        //1. status
        socketReq.write('HTTP/1.1 200 OK'+'\n');
        // //2. headings
        //   //Content-Type: html/js/json
        socketReq.write('Server: kanakaHacks'+'\n');
        socketReq.write('Date: '+ date+'\n');
        socketReq.write('Content-Type : text/html; charset=uft-8'+'\n');
        socketReq.write('Connection: keep-alive'+'\n\n');
        socketReq.write(' ');

          socketReq.write(data);
          //return socketReq.end();
        }
      });
    }

  });
}


server.listen({port:8080}, function(){
  address = server.address();
  console.log("opened server on %j", address);
});

