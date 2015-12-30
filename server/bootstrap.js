/**
 * 
 * Server Bootstrap
 * 
 * Copyright 2014 weber chris and other contributors
 * Released under the MIT license
 * 
 * https://chris.lu
 * 
 */

'use strict';

// winston vendor module
var winston = require('winston');

winston.add(winston.transports.File, {
    filename: __dirname + '/../logs/error.log',
    json: false,
    maxFiles: 20,
    maxsize: 20971520 // 20MB
});

winston.remove(winston.transports.Console);

// utilities module
var utilities = require('../bower_components/chrisweb-utilities/utilities');

// NODE_ENV can be "development", "staging" or "production"
if (typeof(process.env.NODE_ENV) === 'undefined') {

    //process.env.NODE_ENV = 'production';
    process.env.NODE_ENV = 'development';
    
    utilities.log('NODE_ENV NOT FOUND, setting it by default to "' + process.env.NODE_ENV.toUpperCase() + '"', 'fontColor:red', 'backgroundColor:white');

}

// in development mode log everything in log file by default
if (process.env.NODE_ENV === 'development') {
    
    utilities.logSpecial = true;
    
}

try {

    // application configuration module
    var configurationModule = require('./configuration/configuration');
    
} catch(exception) {
    
    throw 'You have not set up the configuration file, please read the documentation/development_setup document';
    
}

// api module
var apiModule = require('./library/api');

// underscore module
var _ = require('underscore');

// oauth module
var oauthModule = require('./library/oauth');

// redis module
var redisModule = require('./library/redis');

// mongo module
var mongoModule = require('./library/mongo');

// user module
var userModule = require('./library/user');

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

// socket.io and it's redis adapter
// https://github.com/socketio/socket.io
var SocketIO = require('socket.io');
var SocketIORedisAdapter = require('socket.io-redis');

// configuration
var configuration = configurationModule.get(process.env.NODE_ENV);

// express cors
var cors = require('cors');

// initialize the user module
userModule.start(configuration);

var mongoClient;

var mongodbOptions = {};

// mongodb connection
mongoModule.getClient(mongodbOptions, function mongooseConnectCallback(error, mongooseConnection) {
    
    if (error) {
        
        utilities.log('[MONGODB]' + error, 'fontColor:red');
        
    } else {
        
        utilities.log('[MONGODB] connected', 'fontColor:green');
        
        mongoClient = mongooseConnection;
        
    }
    
});

// instantiate expressjs
var app = express({ env: process.env.NODE_ENV });

// use cors
// TODO: do improved configuration for production, put options in configuration file
app.use(cors());

// template engine setup
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// ERROR HANDLER
if (process.env.NODE_ENV === 'development') {

    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));
    
}

// add the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// SESSION
var RedisStore = connectRedis(session);

var redisClients = [];

var redisClientSessionsOptions = {};

redisModule.getClient(redisClientSessionsOptions, function getClientCallback(error, redisClientSessions) {
    
    if (!error) {
        
        redisClients.push(redisClientSessions);
        
        if (!configuration.redis.hasOwnProperty('databases')
            || !configuration.redis.databases.hasOwnProperty('session')
            || configuration.redis.databases.session === '') {
        
            throw 'the redis configuration is missing, check out /server/configuration/configuration.js';
        
        }
        
        redisModule.selectDatabase(configuration.redis.databases.session, redisClientSessions, function selectDatabaseCallback(error) {
            
            if (!error) {
                
                var redisStoreOptions = { client: redisClientSessions };
        
                var redisStoreSessions = new RedisStore(redisStoreOptions);
                
                if (!configuration.hasOwnProperty('application')
                    || !configuration.application.hasOwnProperty('session')
                    || !configuration.application.session.hasOwnProperty('secret')
                    || configuration.application.session.secret === '') {

                    throw 'the application configuration for the sessions database is missing, check out /server/configuration/configuration.js';

                }
                
                // APP SETUP
                // TODO: put this into seperate function
                app.use(cookieParser()); // required before session.

                var expressSession = session({
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
                    store: redisStoreSessions,
                    saveUninitialized: true,
                    resave: true
                });

                app.use(expressSession);
                
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
                    desktopRouter.use('/node_modules/async', express.static(__dirname + '/../node_modules/async'));
                    desktopRouter.use('/node_modules/moment', express.static(__dirname + '/../node_modules/moment'));
                    desktopRouter.use('/server/library/shared', express.static(__dirname + '/library/shared'));
                    desktopRouter.use('/videos', express.static(__dirname + '/../videos'));
                    
                } else {
                    
                    desktopRouter.use('/client/desktop_build', express.static(__dirname + '/../client/desktop_build'));
                    desktopRouter.use('/server/library/shared', express.static(__dirname + '/library/shared'));
                    desktopRouter.use('/videos', express.static(__dirname + '/../videos'));
                    
                }
                
                // always invoked
                desktopRouter.use(function(request, response, next) {
                    
                    utilities.log('/desktop, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);
                    
                    var assetsPath = 'desktop_build';
                    
                    if (app.get('env') === 'development') {
                    
                        assetsPath = 'desktop_development';
                        
                    }
                    
                    response.render('desktop', {
                        splashScreenName: 'splashScreen',
                        splashScreenExtension: 'png',
                        splashScreenPath: '/desktop/client/' + assetsPath + '/images/splashScreen',
                        environment: app.get('env'),
                        assetsPath: assetsPath
                    });
                    
                });
                
                // route for aws health check
                app.use('/health-check.html', function(request, response) {
                    response.render('healthCheck');
                });
                
                // add error handling last
                addErrorRoutes(desktopRouter);
                
                app.use('/desktop', desktopRouter);
                
                // START SERVER
                // use the port set by pm2 or visual studio or use the default one from configuration
                app.set('port', process.env.PORT || configuration.server.port);

                var server = app.listen(app.get('port'));
                
                utilities.log('SERVER running on port: ' + app.get('port') + ', environment is: ' + app.get('env'), 'fontColor:green');
                
                var redisClientSocketIOPublisherOptions = {};

                // SOCKET.IO
                // TODO: put this into seperate function
                redisModule.getClient(redisClientSocketIOPublisherOptions, function getClientCallback(error, redisClientSocketIOPublisher) {
                    
                    if (!error) {
                        
                        redisClients.push(redisClientSocketIOPublisher);
                        
                        if (!configuration.redis.hasOwnProperty('databases') 
                        || !configuration.redis.databases.hasOwnProperty('session') 
                        || configuration.redis.databases.session === '') {
                            
                            throw 'the redis configuration for socket.io is missing, check out /server/configuration/configuration.js';
        
                        }
                        
                        redisModule.selectDatabase(configuration.redis.databases.socketio, redisClientSocketIOPublisher, function selectDatabaseCallback(error) {
                            
                            if (!error) {
                                
                                // setup socket.io and its redis adapter
                                var socketIO = new SocketIO(server);
                                
                                var pub = redisClientSocketIOPublisher;
                                
                                var redisClientSocketIOSubscriberOptions = {
                                    return_buffers: true
                                };

                                redisModule.getClient(redisClientSocketIOSubscriberOptions, function getClientCallback(error, redisClientSocketIOSubscriber) {
                                    
                                    if (!error) {
                                        
                                        redisClients.push(redisClientSocketIOSubscriber);
                                        
                                        if (!configuration.redis.hasOwnProperty('databases') 
                                        || !configuration.redis.databases.hasOwnProperty('session') 
                                        || configuration.redis.databases.session === '') {
                                            
                                            throw 'the redis configuration for socket.io is missing, check out /server/configuration/configuration.js';
        
                                        }
                                        
                                        redisModule.selectDatabase(configuration.redis.databases.socketio, redisClientSocketIOSubscriber, function selectDatabaseCallback(error) {
                                            
                                            if (!error) {
                                                
                                                var sub = redisClientSocketIOSubscriber;
                                                
                                                var socketIORedisAdapter = SocketIORedisAdapter({ pubClient: pub, subClient: sub });
                                                
                                                socketIORedisAdapter.pubClient.on('error', function (error) {
                                                    utilities.log(error, 'fontColor:red');
                                                });
                                                
                                                socketIORedisAdapter.subClient.on('error', function (error) {
                                                    utilities.log(error, 'fontColor:red');
                                                });
                                                
                                                socketIO.adapter(socketIORedisAdapter);
                                                
                                                // add the session to socket.io
                                                socketIO.use(function (socket, next) {
                                                    expressSession(socket.request, socket.request.res, next);
                                                });

                                                var socketIONamespaceName = 'collaborativePlaylists';
                                                
                                                var socketIONamespace = socketIO.of('/' + socketIONamespaceName);
                                                
                                                socketIONamespace.on('connection', function (socketIOSocket) {
                                                    
                                                    utilities.log('socket.io: user joined ' + socketIONamespaceName + ' namespace', 'fontColor:yellow');
                                                    
                                                    socketIOSocket.roomId = null;
                                                    socketIOSocket.username = socketIOSocket.client.request.session.user.nickname;

                                                    socketIOSocket.on('disconnect', function () {
                                                    
                                                        utilities.log('socket.io: user left ' + socketIONamespaceName + ' namespace', 'fontColor:yellow');
                                                    
                                                    });

                                                    socketIOSocket.on('joinCollaborativePlaylist', function (attributes) {
                                                        
                                                        utilities.log('socket.io: user joined ' + attributes.collaborativePlaylistId + ' collaborativePlaylist', 'fontColor:yellow');
                                                        
                                                        var roomId = attributes.collaborativePlaylistId;

                                                        // if user is already in a room first leave it
                                                        if (socketIOSocket.roomId !== null) {
                                                            socketIOSocket.leave(roomId);
                                                        }
                                                        
                                                        // join the new room
                                                        socketIOSocket.join(roomId);
                                                        
                                                        // add the room id to the socket object
                                                        socketIOSocket.roomId = roomId;
                                                    
                                                    });

                                                    socketIOSocket.on('messageCollaborativePlaylist', function (attributes) {

                                                        utilities.log('socket.io: collaborativePlaylist message ' + attributes.message, 'fontColor:yellow');
                                                        
                                                        // send a message to all the users in a room except the client that created the message
                                                        socketIOSocket.broadcast.in(socketIOSocket.roomId).emit('messageCollaborativePlaylist', {
                                                            message: socketIOSocket.username + ': ' + attributes.message
                                                        });

                                                    });

                                                });

                                            } else {
                                                
                                                utilities.log(error, 'fontColor:red');

                                            }

                                        });

                                    } else {
                                        
                                        utilities.log(error, 'fontColor:red');

                                    }

                                });

                            } else {
                                
                                utilities.log(error, 'fontColor:red');

                            }

                        });

                    } else {
                        
                        utilities.log(error, 'fontColor:red');

                    }

                });
                
            } else {
                
                utilities.log(error, 'fontColor:red');
                
            }
            
        });
        
    } else {
        
        utilities.log(error, 'fontColor:red');
        
    }
    
});

// close db connections on shutdown
process.on('SIGINT', function() {

    mongoModule.disconnect(mongoClient, function (error) {
        
        if (error) {
            
            utilities.log('mongodb disconnect: ' + error, 'fontColor:red');
            
        }
        
        _.each(redisClients, function(redisClient) {
            
            redisModule.disconnect(redisClient, function(error) {
                
                if (error) {
                    
                    utilities.log('redis disconnect: ' + error, 'fontColor:red');
                    
                }
                
            });
            
        });

        utilities.log('[BOOTSTRAP] process is shutting down...');

        process.exit(0);

    });

});

//
process.on('uncaughtException', function(error) {
    
    utilities.log(error.message, error.stack, 'fontColor:red');
    
    process.exit(1);
    
});

var addErrorRoutes = function addErrorRoutesFunction(router) {
    
    // 404 error route
    router.use(function(request, response, next) {

        response.status(404);

        utilities.log('404 middleware catch by: ' + request.url, 'fontColor:red');

        if (request.accepts('html')) {

            response.render('404', { environment: process.env.NODE_ENV, url: request.originalUrl, message: '404 page not found' });

        } else if (request.accepts('json')) {

            response.send({ code: '404', url: request.originalUrl, message: '404 page not found' });

        }

    });
    
    // 5xx error route
    router.use(function(error, request, response, next) {
        
        utilities.log('server error: ' + JSON.stringify(error), 'fontColor:red');
        
        utilities.log('5xx middleware catch by: ' + request.url, 'fontColor:yellow');
        
        // error page
        response.status(parseInt(error.status));
        
        if (request.accepts('application/json')) {

            if (typeof(error.stack) !== 'undefined') {
                
                response.send({ code: error.status, stack: error.stack, message: error.message });
                
            } else {
                
                response.send({ code: error.status, stack: '', message: error.message });
                
            }

        } else if (request.accepts('text/html')) {

            if (typeof(error.stack) !== 'undefined') {
                
                response.render('5xx', { environment: process.env.NODE_ENV, stack: error.stack.replace(/\n/g, '<br>'), message: error.message });
                
            } else {
                
                response.render('5xx', { environment: process.env.NODE_ENV, stack: '', message: error.message });
                
            }
            
        }

    });
    
};