'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);

var port = 35000;

// static files
app.use('/javascripts', express.static('javascripts'));
app.use('/vendor', express.static('node_modules'));
app.use('/textures', express.static('textures'));

// deliver get_user_media_prototype.html file
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/webgl_visualizer_prototype.html');
});

server.listen(port, function() {
    console.log('server listening on: 127.0.0.1:%s', port);
});