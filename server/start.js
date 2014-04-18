
// utilities module
var utilities = require('../server/library/shared/utilities');

var ejs = require('ejs');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {
    
    utilities.log('PROCESS ENV NOT FOUND, setting it by default to PRODUCTION', 'red');

    process.env.NODE_ENV = 'production';

}

var express = require('express');

var app = express({ env: process.env.NODE_ENV });

// template engine setup
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views');
// by default views will be html
app.set('view engine', 'html');

var serverPort = 35000;

// desktop router
var desktopRouter = express.Router();

utilities.log('__dirname: ' + __dirname);
utilities.log('app.get(\'env\'): ' + app.get('env'));

if (app.get('env') === 'development') {

    desktopRouter.use('/client/desktop_development', express.static(__dirname + '/../client/desktop_development'));
    desktopRouter.use('/client/desktop_build', express.static(__dirname + '/../client/desktop_build'));
    desktopRouter.use('/bower_components', express.static(__dirname + '/../bower_components'));
    desktopRouter.use('/server/library/shared', express.static(__dirname + '/library/shared'));
    
} else {

    desktopRouter.use(express.static(__dirname + '/../client/desktop_build'));

}

// always invoked
desktopRouter.use(function(request, response, next) {
    
    utilities.log('/desktop, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);
    
    response.render('desktop');
    
});

app.use('/desktop', desktopRouter);

app.use('/', function(request, response) {
    
    utilities.log('/ redirect, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);
    
    response.redirect(301, '/desktop');
    
});

// TODO: error route 50x
// TODO: not found route 404

app.listen(serverPort);

utilities.log('SERVER running on port: ' + serverPort + ', environment is: ' + process.env.NODE_ENV, 'green');













/*
var mongoose = require('mongoose');
var fs = require('fs');
var configuration = require('./config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});
*/