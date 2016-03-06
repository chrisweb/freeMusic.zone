'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 35000;

// static files
app.use('/javascript', express.static('javascript'));
app.use('/cascadingStyleSheets', express.static('cascadingStyleSheets'));

// deliver index.html file
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

server.listen(port, function() {
    console.log('server listening on: 127.0.0.1:%s', port);
});