/**
 * jamtweets nodejs bootstap
 * 
 * MIT Licensed, see License.txt
 * 
 */

// utilities module
var utilities = require('../library/shared/utilities-0.0.1');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {
    
    utilities.log('PROCESS ENV NOT FOUND, setting it by default to PRODUCTION', 'red');

    process.env.NODE_ENV = 'production';

}

// get the environment variable
var environment = process.env.NODE_ENV;

// include filesystem module
var fs = require('fs');

// ejs templates
var ejs = require('ejs');

// load modules
var express = require('express');
var app = express();

// get configuration
var configurationModule = require('./configurations/configuration.js');
var configuration = configurationModule.get();

// check if logs directory exists, if not create it
if (!fs.existsSync(__dirname + '/logs/')) {

    fs.mkdirSync(__dirname + '/logs/');

}

// logfile stream
var logFile = fs.createWriteStream(__dirname + '/logs/application.log', {flags: 'w'});

// public folder
switch (environment) {
    case 'production':
        var publicDirectory = __dirname + '/../public';
        break;
    case 'staging':
        var publicDirectory = __dirname + '/../public_staging';
        break;
    case 'development':
        var publicDirectory = __dirname + '/../public_development';
        break;
}

utilities.log('publicDirectory: ' + publicDirectory);

// application configuration
app.configure(function() {
    app.use(express.compress()); // include compress before initializing static
    // server static files before executing routes
    app.use(express.static(publicDirectory));
    app.engine('.html', ejs.__express);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('configuration', configuration);
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({secret: configuration.application.session.secret }));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.logger());
    app.set('environment', environment);
    app.set('utilities', utilities);
});

app.configure('development', function() {
    //app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
    app.enable('verbose errors');
    app.use(express.logger({stream: logFile}));
});

app.configure('production', function() {
    app.disable('verbose errors');
});

// app footer and header
var headerHtml = ejs.render(fs.readFileSync(__dirname + '/views/header.html', 'utf8'), { environment: app.get('environment') });
var footerHtml = ejs.render(fs.readFileSync(__dirname + '/views/footer.html', 'utf8'), { environment: app.get('environment') });

app.set('headerHtml', headerHtml);
app.set('footerHtml', footerHtml);

// mongodb
app.mongoose = require('mongoose');

app.mongoose.connect('mongodb://' + configuration.mongodb.host + '/' + configuration.mongodb.database.name, function(error) {
    
    if (typeof(error) !== 'undefined') {
        
        utilities.log('mongodb connection failed, host: ' + configuration.mongodb.host + ', database: ' + configuration.mongodb.database.name + ', error: ' + error, 'red');
        
    }
    
});

// load all models (synchronously)
var models = {};

fs.readdirSync(__dirname + '/models').forEach(function(modelFileName) {

    //name without .js at the end
    modelName = modelFileName.substr(0, modelFileName.length-3);

    models[modelName] = require(__dirname + '/models/' + modelFileName);

});

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
var routesModule = require('../library/plugins/routes-0.0.1');

routesModule.mapRoutes(app, configuration, controllers, models);

// start server
app.listen(process.env.PORT || configuration.server.port, function() {
    
    utilities.log('server started on port: ' + configuration.server.port + ', environment: ' + environment, 'green');
    
});


