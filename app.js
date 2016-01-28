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
app.set('port', process.env.PORT || 3000);

http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});