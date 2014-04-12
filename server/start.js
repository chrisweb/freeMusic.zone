
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


if (app.get('env') === 'development') {

    desktopRouter.use(express.static(__dirname + '/client/desktop_development'));
    
} else {

    desktopRouter.use(express.static(__dirname + '/client/desktop_build'));

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

app.listen(serverPort);

utilities.log('SERVER running on port: ' + serverPort + ', environment is: ' + process.env.NODE_ENV, 'green');