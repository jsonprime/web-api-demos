var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function (socket) {
  console.log('Someone connected.');
  socket.broadcast.emit('new connection', {
    connections: io.engine.clientsCount
  });

  socket.on('message', function (channel, data) {
    console.log('Message received:', data);
    io.sockets.emit('new message', data);
  });

  socket.on('disconnect', function(){
    console.log('Someone disconnected.');
    socket.broadcast.emit('lost connection', {
      connections: io.engine.clientsCount
    });
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Listening on Port 3000');
});
