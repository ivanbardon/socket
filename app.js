var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine','jade');

app.get('/fw/:name', function(req, res){
	res.render('fw');
});

app.get('/fm', function(req, res){
	res.render('fm');
});

app.get('/chat', function(req, res){
	res.render('chat');
});

io.on('connection', function(socket){
	socket.on('send loc', function(data){
		io.emit('print loc', data)
	})
  	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on port: 3000');
});
