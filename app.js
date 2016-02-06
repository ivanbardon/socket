// Author: Ivan Bardon
// Febrero 2016
// App para Node.js usando Express
// La aplicación pretende que puedas realizar streaming de tu geoposición
// y que otras persona puedan seguirte en un mapa


//Require de los modulos
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

//Configuración
app.set('view engine','jade');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get('/fw', function(req, res){
	console.log(req.url);
	res.render('fw');
});

app.get('/fm', function(req, res){
	res.render('fm');
});

app.post('/fm', function(req, res){
	console.log(req.body)
});

app.get('/chat', function(req, res){
	res.render('chat');
});

//Manejo de eventos para los clientes
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