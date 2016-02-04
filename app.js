// Febrero 2016
// App para Node.js usando Express
// La aplicación pretende que puedas realizar streaming de tu geoposición
// y que otras persona puedan seguirte en un mapa


//Require de los modulos
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Configuracion
app.set('view engine','jade');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

//Rutas
app.get('/fw', function(req, res){
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
    console.log(socket.id)
});

//Puerto para servir
http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});