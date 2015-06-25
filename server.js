var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function (request, response){
  if (request.url === '/') {
    fs.readFile('index.html', function (err, data) {
      response.writeHead(200, { 'Content-Type' : 'text/html' });
      response.end(data);
    });
  } else {
    response.writeHead(404, { 'Content-Type' : 'text/plain' });
    response.end('404 - Page Not Found');
  }
});

server.listen(3000);

console.log('Server started on Port 3000...');
