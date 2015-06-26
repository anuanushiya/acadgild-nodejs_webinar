var http = require('http');
var fs = require('fs');

var mime = require('mime');

var server = http.createServer();
var io;

/**
 * Listen to Server's request event determine what to do
 * @param  {object} request     NodeJS Request Object
 * @param  {object} response    NodeJS Response Object
 */
server.on('request', function (request, response){
  var absPath = __dirname + '/public/';

  // Create an absolute path depending upon the request
  if (request.url === '/') { absPath += 'html/index.html'; }
  else if (request.url === '/host') { absPath += 'html/host.html'; }
  else { absPath += request.url; }

  // Check if the requested file exists or not. If it exists then load it
  // otherwise send a 404 message
  fs.exists(absPath, function (exists) {
    if (exists) {
      fs.readFile(absPath, function (err, data) {
        response.writeHead(200, {
          'Content-Type' : mime.lookup(absPath)
        });
        response.end(data);
      });
    } else {
      response.writeHead(404, { 'Content-Type' : 'text/plain' });
      response.end('404 - Page Not Found');
    }

    // Log the URL and Status Code for Debugging
    console.log(request.url, response.statusCode);
  });

});


io = require('socket.io')(server);

/**
 * Listen to the Websocket Server
 * @param  {object}         Socket object
 */
io.on('connection', function (socket) {
  // Custom event called 'message' is invoked from the client
  socket.on('join', function (data) {
    io.emit('log', data);
  });

  // Invoked when the socket is being disconnected
  socket.on('disconnect', function () {
    console.log('disconnected');
  });

});

server.listen(3000);

console.log('Server started on Port 3000...');
