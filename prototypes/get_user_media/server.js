'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

var port = 35000;

// static files
app.use('/javascripts', express.static('javascripts'));

// deliver get_user_media_prototype.html file
app.get('/', function (request, response) {
	response.sendFile(__dirname + '/get_user_media_prototype.html');
});


//app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post('/saveimage', function (request, response) {
	console.log(request.body);
	response.json({ saved: 1 });
});

server.listen(port, function() {
    console.log('server listening on: 127.0.0.1:%s', port);
});