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

// get the environment variable
var environment = process.env.NODE_ENV;

// include filesystem module
var fs = require('fs');

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
var logFile = fs.createWriteStream(__dirname + '/logs/application.log', {flags: 'w'});

// public folder
switch (environment) {
    case 'production':
        var publicDirectory = __dirname + '/public';
        break;
    case 'staging':
        var publicDirectory = __dirname + '/public_staging';
        break;
    case 'development':
        var publicDirectory = __dirname + '/public_development';
        break;
}

// application configuration
app.configure(function() {
    app.use(express.compress()); // include compress before initializing static
    app.engine('.html', require('ejs').__express);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'topsecret'}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(publicDirectory));
    app.use(express.logger());
});

app.configure('development', function() {
    //app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    app.enable('verbose errors');
    app.use(express.logger({stream: logFile}));
});

app.configure('production', function() {
    app.disable('verbose errors');
});

// mongodb
app.mongoose = require('mongoose');

app.mongoose.connect('mongodb://' + configuration.mongodb.host + '/' + configuration.mongodb.database.name, function(error) {
    
    if (typeof(error) !== 'undefined') {
        
        console.log('mongodb connection failed, host: ' + configuration.mongodb.host + ', database: ' + configuration.mongodb.database.name + ', error: ' + error);
        
    }
    
});

// load all models
var tweetsModelModule = require('./models/tweetsModel');

var tweetsModel = new tweetsModelModule(app);

var controllers = {};

// load all controllers (synchronously)
if (configuration.application.useModules) {

    fs.readdirSync(__dirname + '/modules').forEach(function(moduleDirectoryName) {
        
        fs.readdirSync(__dirname + '/' + moduleDirectoryName).forEach(function(controllerFileName) {
            
            //name without .js at the end
            controllerName = controllerFileName.substr(0, controllerFileName.length-3);

            controllers[controllerName] = require(__dirname + '/modules/' + moduleDirectoryName + '/' + controllerFileName);
            
        });

    });

} else {

    fs.readdirSync(__dirname + '/controllers').forEach(function(controllerFileName) {
        
        //name without .js at the end
        controllerName = controllerFileName.substr(0, controllerFileName.length-3);

        controllers[controllerName] = require(__dirname + '/controllers/' + controllerFileName);

    });

}

// execute routes plugin
var routesModule = require('../library/plugins/router-0.0.1');

routesModule.mapRoutes(app, configuration, controllers);

// start server
app.listen(process.env.PORT || configuration.server.port, function() {
    
    console.log('server started on port: ' + configuration.server.port + ', environment: ' + environment);
    
});


