var http = require('http');

var server = http.createServer();

server.on('request', function (request, response){
  response.writeHead(200, { 'Content-Type' : 'text/plain' });
  response.end('Hello World');
});

server.listen(3000);

console.log('Server started on Port 3000...');
