var app = require('express')();
var http= require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(8080,function(){
console.log('listening at port : 8080');
});

io.sockets.on('connection', function (socket, username) {

  socket.on('add_user', function(username){
    console.log(username + ' is now connected');
    socket.username = username; //store username
    socket.broadcast.emit('add_user', username);
  });
  
   socket.on('chat_msg', function(msg){
    console.log(socket.username + ' --> ' + msg);
    socket.broadcast.emit('chat_msg', {username: socket.username, msg: msg});
  });
  
  socket.on('disconnect', function(){
    console.log(socket.username + ' has left chatroom');
    socket.broadcast.emit('user_left', {username: socket.username});
  });
 
});

