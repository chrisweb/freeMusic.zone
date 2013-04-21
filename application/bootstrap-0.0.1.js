/**
 * jamtweets nodejs bootstap
 * 
 * MIT Licensed, see License.txt
 * 
 */

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {

    process.env.NODE_ENV = 'production';

}

// include filesystem module
var fs = require('fs');

// get the environment variable
var environment = process.env.NODE_ENV;

// load modules
var express = require('express');
var app = express();

// get configuration
var configurationModule = require('./configurations/configuration.js');
var configuration = configurationModule.get();

// share the utilities module with the client code
app.get('/javascripts/utilities.log', function(req, res){
    res.send('Hello World');
});

// logfile stream
var logFile = fs.createWriteStream('./logs/application.log', {flags: 'w'});

// application configuration
app.configure(function() {
    app.use(express.compress()); // include compress before initializing static
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'topsecret'}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger());
});

app.configure('development', function() {
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    app.enable('verbose errors');
    app.use(express.logger({stream: logFile}));
});

app.configure('production', function() {
    app.use(express.errorHandler());
    app.disable('verbose errors');
});

// mongodb
app.mongoose = require('mongoose');

app.mongoose.connect('mongodb://' + configuration.mongodb.host + '/' + configuration.mongodb.database.name, function(error) {
    
    if (typeof(error) !== 'undefined') {
        
        console.log('mongodb connection failed, host: ' + configuration.mongodb.host + ', database: ' + configuration.mongodb.database.name + ', error: ' + error);
        
    }
    
});

// load controllers
tweetsController = require('./controllers/tweetsController');

app.get('/', tweetsController.index(request, response));

// start server
app.listen(process.env.PORT || configuration.server.port, function() {
    
    console.log('server started on port: ' + configuration.server.port + ', environment: ' + environment);
    
});


