var express = require("express");
var app = express();
var path = require("path");

app.use('/javascripts', express.static('javascripts'));

app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname + '/prototype-recognition.html'));

});

app.listen(35000);

console.log('running on port 35000');