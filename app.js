//Require de los modulos
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Configuracion
app.set('view engine','jade');
app.set('port', process.env.PORT || 3000);

//Rutas
app.get('/fw/:name', function(req, res){
	res.render('fw');
});

app.get('/fm', function(req, res){
	res.render('fm');
});

app.get('/chat', function(req, res){
	res.render('chat');
});

//Manejo de eventos en los clientes
io.on('connection', function(socket){
	socket.on('send loc', function(data){
		io.emit('print loc', data)
	})
  	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
  });
});

//Puerto para servir
http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});