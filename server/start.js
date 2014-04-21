
// utilities module
var utilities = require('./library/shared/utilities');

// api module
var apiModule = require('./library/api');

// application configuration
var configurationModule = require('./configuration/configuration');

// ejs vendor module
var ejs = require('ejs');

// expressjs vendor module
// http://expressjs.com/4x/api.html
var express = require('express');

// body-parser (express middleware)
// used to get the data from a POST request
var bodyParser = require('body-parser');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {
    
    utilities.log('PROCESS ENV NOT FOUND, setting it by default to PRODUCTION', 'red');

    process.env.NODE_ENV = 'production';

}

var configuration = configurationModule.get(process.env.NODE_ENV);

// instantiate expressjs
var app = express({ env: process.env.NODE_ENV });

// template engine setup
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views');

// by default views will be html
app.set('view engine', 'html');

// start api
var apiRouter = express.Router();

apiModule.apiStart(configuration, app, apiRouter);

// desktop router
var desktopRouter = express.Router();

if (app.get('env') === 'development') {

    desktopRouter.use('/client/desktop_development', express.static(__dirname + '/../client/desktop_development'));
    desktopRouter.use('/client/desktop_build', express.static(__dirname + '/../client/desktop_build'));
    desktopRouter.use('/bower_components', express.static(__dirname + '/../bower_components'));
    desktopRouter.use('/server/library/shared', express.static(__dirname + '/library/shared'));
    
} else {

    desktopRouter.use(express.static(__dirname + '/../client/desktop_build'));

}

// add the body parser middleware
app.use(bodyParser());

// TODO: as of express all middleware (body-parser, errorhandler,
// cookie-session, ...) has own repository and is not bundled with either
// connect or express
// https://github.com/expressjs
// http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0

/*
  app.use(express.errorHandler({

    dumpExceptions: true,

    showStack: true

  }));

  app.use(express.cookieParser());

  app.use(express.session({ secret: configuration.application.session.secret }));
 */

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

app.set('port', process.env.PORT || configuration.server.port);

app.listen(app.get('port'));

utilities.log('SERVER running on port: ' + app.get('port') + ', environment is: ' + app.get('env'), 'green');




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