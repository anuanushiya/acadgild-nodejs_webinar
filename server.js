var http = require('http');
var fs = require('fs');

var server = http.createServer();

/**
 * Listen to Server's request event determine what to do
 * @param  {object} request     NodeJS Request Object
 * @param  {object} response    NodeJS Response Object
 */
server.on('request', function (request, response){

  // Depending upon the route load appropriate resources
  if (request.url === '/') {
    fs.readFile('index.html', function (err, data) {
      response.writeHead(200, { 'Content-Type' : 'text/html' });
      response.end(data);
    });
  } else {
    response.writeHead(404, { 'Content-Type' : 'text/plain' });
    response.end('404 - Page Not Found');
  }

  // Log the URL and Status Code for Debugging
  console.log(request.url, response.statusCode);

});

server.listen(3000);

console.log('Server started on Port 3000...');
