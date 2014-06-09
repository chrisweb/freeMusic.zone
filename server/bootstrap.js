/**
 * 
 * Playlist Guru
 * 
 * Copyright 2014 weber chris and other contributors
 * Released under the MIT license
 * 
 * https://chris.lu
 * 
 */

'use strict';

// utilities module
var utilities = require('./library/shared/utilities');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {

    //process.env.NODE_ENV = 'production';
    process.env.NODE_ENV = 'development';
    
    utilities.log('PROCESS ENV NOT FOUND, setting it by default to "' + process.env.NODE_ENV.toUpperCase() + '"', 'fontColor:red');

}

// api module
var apiModule = require('./library/api');

// oauth module
var oauthModule = require('./library/oauth');

// redis module
var redisModule = require('./library/redis');

// mongo module
var mongoModule = require('./library/mongo');

// user module
var userModule = require('./library/user');

// application configuration
var configurationModule = require('./configuration/configuration');

// ejs vendor module
var ejs = require('ejs');

// expressjs vendor module
// http://expressjs.com/4x/api.html
var express = require('express');

// errorhandler (express middleware)
// https://github.com/expressjs/errorhandler
var errorhandler = require('errorhandler');

// cookieParser (express middleware)
// https://github.com/expressjs/cookie-parser
var cookieParser = require('cookie-parser');

// express-session (express middleware)
// https://github.com/expressjs/session
var session = require('express-session');

// body-parser (express middleware)
// used to get the data from a POST request
// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');

// https://github.com/visionmedia/connect-redis
var connectRedis = require('connect-redis');

var configuration = configurationModule.get(process.env.NODE_ENV);

// initialize the user module
userModule.start(configuration);

// mongodb connection
var mongoClient = mongoModule.getClient(function mongooseConnectCallback(error) {
    
    if (error) {
        
        utilities.log('[MONGODB]' + error, 'fontColor:red');
        
    } else {
        
        utilities.log('[MONGODB] connected', 'fontColor:green');
        
    }
    
});

// instantiate expressjs
var app = express({ env: process.env.NODE_ENV });

// template engine setup
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views');

// by default views will be html
app.set('view engine', 'html');

// ERROR HANDLER
if (process.env.NODE_ENV === 'development') {

    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));
    
}

// add the body parser middleware
app.use(bodyParser());

// TODO: error route 50x
// TODO: not found route 404

// SESSION
var RedisStore = connectRedis(session);

redisModule.getClient(function getClientCallback(error, client) {
    
    if (!error) {
        
        redisModule.selectDatabase(configuration.redis.databases.session, client, function selectDatabaseCallback(error) {
            
            if (!error) {
                
                var redisOptions = { client: client };
        
                var redisStore = new RedisStore(redisOptions);

                app.use(cookieParser()); // required before session.
                app.use(session({
                    secret: configuration.application.session.secret,
                    proxy: false, // set to true for SSL outside of node
                    cookie: {
                        path: '/',
                        httpOnly: true, // the browser will not expose cookie data
                        secure: false, // if https
                        // if null the cookie becomes a browser-session cookie,
                        // so whenhen the user closes the browser the cookie (and session) will be removed
                        maxAge: null
                    },
                    store: redisStore

                }));
                
                // start api
                var apiRouter = express.Router();

                apiModule.start(configuration, app, apiRouter);
                
                addErrorRoutes(apiRouter);

                var oauthRouter = express.Router();

                oauthModule.start(configuration, app, oauthRouter);
                
                addErrorRoutes(oauthRouter);

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

                // always invoked
                desktopRouter.use(function(request, response, next) {

                    utilities.log('/desktop, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);

                    response.render('desktop');

                });
                
                addErrorRoutes(desktopRouter);

                app.use('/desktop', desktopRouter);

                app.use('/', function(request, response) {

                    utilities.log('/ redirect, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);

                    response.redirect(301, '/desktop');

                });

                // START SERVER
                app.set('port', process.env.PORT || configuration.server.port);

                app.listen(app.get('port'));

                utilities.log('SERVER running on port: ' + app.get('port') + ', environment is: ' + app.get('env'), 'fontColor:green');

            } else {
                
                utilities.log(error, 'fontColor:red');
                
            }
            
        });
        
    } else {
        
        utilities.log(error, 'fontColor:red');
        
    }
    
});

var addErrorRoutes = function addErrorRoutesFunction(router) {
    
    // 5xx error route
    router.use(function(error, request, response, next) {

        utilities.log('server error: ' + JSON.stringify(error), 'fontColor:red');

        if (error.status === 404) {
            
            return next();
            
        }

        utilities.log('5xx middleware catch by: ' + request.url, 'fontColor:yellow');

        // error page
        response.status(parseInt(error.status));

        if (request.accepts('html')) {

            if (typeof(error.stack) !== 'undefined') {
                
                response.render('5xx', { environment: process.env.NODE_ENV, stack: error.stack.replace(/\n/g, '<br>'), message: error.message });
                
            } else {
                
                response.render('5xx', { environment: process.env.NODE_ENV, stack: '', message: error.message });
                
            }

        } else if (request.accepts('json')) {

            if (typeof(error.stack) !== 'undefined') {
                
                response.send({ code: error.status, stack: error.stack, message: error.message });
                
            } else {
                
                response.send({ code: error.status, stack: '', message: error.message });
                
            }

        }

    });

    // 404 error route
    router.use(function(request, response) {

        response.status(404);

        utilities.log('404 middleware catch by: ' + request.url, 'fontColor:red');

        if (request.accepts('html')) {

            response.render('404', { environment: process.env.NODE_ENV, url: request.originalUrl, message: '404 page not found' });

        } else if (request.accepts('json')) {

            response.send({ code: '404', url: request.originalUrl, message: '404 page not found' });

        }

    });
    
};