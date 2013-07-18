
// Module: https://github.com/learnboost/socket.io/
// Documentation: http://socket.io/#how-to-use

exports.initialize = function(application) {

    var socket = require('socket.io')
            , io = socket.listen(application)
            , utilities = require('./utilities-0.0.3')
            , applicationConfigurationModule = require('./configuration/application-0.2.5')
            , redisStore = require('socket.io/lib/stores/redis')
            , mongoDB = require('./mongodb-0.0.1')
            , redisDB = require('./redis-0.0.1')
            , topPlaylists = require('./top_playlists-0.0.1')
            , jamendoApiModule = require('./jamendo_api-0.0.1');

    var applicationConfiguration = applicationConfigurationModule.getApplicationConfiguration();
    
    var socketIOOptions = {
        'transports': ['websocket'],
        'browser client minification': true,
        'browser client etag': true,
        'browser client gzip': true
    };
    
    io.set(socketIOOptions);
    
    utilities.log('[SOCKET_IO] redisDB pubClient', 'info');
    
    redisDB.getClient(false, function(error, pubClient) {
        
        if (error) {
            
            utilities.log('socket io initialize get redis pubClient failed: ' + error);
            
        }
        
        utilities.log('[SOCKET_IO] redisDB subClient', 'info');
        
        redisDB.getClient(false, function(error, subClient) {
            
            if (error) {
            
                utilities.log('socket io initialize get redis subClient failed: ' + error);
            
            }
            
            utilities.log('[SOCKET_IO] redisDB redisClient', 'info');
            
            redisDB.getClient(false, function(error, redisClient) {
                
                if (error) {

                    utilities.log('socket io initialize get redisClient failed: ' + error);

                }
            
                var redis = redisDB.getModule();
            
                io.set('store',
                    new redisStore({
                        redis: redis,
                        redisPub: pubClient,
                        redisSub: subClient,
                        redisClient: redisClient
                    })
                );

            });
            
        });
        
    });

    /**
     * 
     * @param {type} param1
     * @param {type} param2
     */
    io.sockets.on('connection', function(socket) {

        // use the socket id as user id
        var userId = socket.id;

        utilities.log('[SOCKET_IO] server opened new websocket connection for client with id: ' + userId, 'info');
        
        socket.on('loginRequest', function() {

            utilities.log('[SOCKET_IO] loginRequest', 'info');
            
            var path = 'https://api.jamendo.com/v3.0/oauth/authorize';
            var method = 'GET';
            var parameters = {};
            var callbackFunction = '';
            
            jamendoApiModule.makeJamendoApiRequest(path, method, parameters, callbackFunction);
            
            response.error = false;
            response.userId = userId;
            
            socket.emit('loginResponse', response);
            
        });

        /**
         * if client needs a refresh of the top playlists world data
         */
        socket.on('requestTopPlaylists', function(data) {

            utilities.log('[SOCKET_IO] requestTopPlaylists', 'info');

            // TODO: right now whole world coordinates get send alltogether, we
            // could improve this by sending only the coordinates of the world
            // that is visible by the client, this would decrease the response
            // size but increase the requests frequency

            topPlaylists.getTopPlaylists(function(error, topPlaylists) {
                
                if (error) {
                    
                    utilities.log(error);
                    
                    socket.emit('responseTopPlaylists', '');
                    
                }
                
                socket.emit('responseTopPlaylists', topPlaylists);
                
            });

        });

        /**
         * 
         */
        socket.on('joinJamendoWorldLobby', function(data) {

            utilities.log('[SOCKET_IO] user with id "' + userId + '" and username "' + data.username + '" has entered the lobby');

            // save username to socket.io session storage
            socket.set('username', data.username);

            // join the lobby room
            socket.join('lobby');

        });

        /**
         * 
         */
        socket.on('joinRoom', function(data) {
            
            utilities.log('[SOCKET_IO] joinRoom, data.newRoomId: ' + data.newRoomId, 'info');

            // join the room
            socket.join(data.newRoomId);

            // get access log db index from configuration
            var collectionName = applicationConfiguration.mongoDB.playlistAccessLog.collections;

            // inform the users in the room that new user has joined
            io.sockets.in(data.newRoomId).emit('userJoined', data.user);

            mongoDB.getCollection(null, null, null, collectionName, true, function(error, mongoDBCollection, mongoDBClient) {

                if (error) {

                    utilities.log('[SOCKET_IO]  joinRoom getCollection failed: ' + error);

                } else {
                    
                    var songsQueueQuery = { playlistId: data.newRoomId };
                    var songsQueueFields = {};
                    
                    mongoDB.mongoDBSingleRead(mongoDBCollection, songsQueueQuery, songsQueueFields, function(error, songsQueue) {
                        
                        if (error) {

                            utilities.log('[SOCKET_IO]  joinRoom mongoDBRead: ' + error);

                        }
                        
                        socket.emit('setSongsQueue', songsQueue);
                        
                    });
                    
                    // add a hit in the access log
                    var accessLogEntry = {
                        
                        username: socket.get('username'),
                        playlistId: data.newRoomId,
                        timestamp: new Date().getTime()
                        
                    }
                    
                    mongoDB.mongoDBWrite(mongoDBCollection, accessLogEntry, safeOption, function(error) {
                        
                        if (error) {

                            utilities.log('[SOCKET_IO]  joinRoom access log update failed: ' + error);

                        }
                        
                    });
                    
                }
                
            });
            
        });
            
        socket.on('leaveRoom', function(data) {

            utilities.log('[SOCKET_IO] leaveRoom, data.previousRoomId: ' + data.previousRoomId, 'info');

            // disconnect user from room and inform users of that room that
            // user has left
            if (typeof(data.previousRoomId) !== 'undefined') {
                
                socket.leave(data.previousRoomId);
                
                io.sockets.in(data.previousRoomId).emit('userLeft', data.user);
                
            }

        });
        
        socket.on('getRoomUserCount', function(roomId) {
            
            utilities.log('[SOCKET_IO] getRoomUserCount, roomId: ' + roomId, 'info');
            
            var clients = io.sockets.clients(roomId);
            
            io.sockets.in(roomId).emit('setRoomUserCount', clients.length);
            
        });
        
        socket.on('recommendSong', function(data) {
            
            utilities.log('[SOCKET_IO] recommendSong', 'info');
            
        });
        
        socket.on('starPlaylist', function(data) {
            
            utilities.log('[SOCKET_IO] starPlaylist', 'info');
            
        });

        /**
         * 
         */
        socket.on('broadCastMessage', function(data) {

            utilities.log('[SOCKET_IO] broadCastMessage', 'info');

            // https://github.com/LearnBoost/socket.io/wiki/Rooms
            io.sockets.in(data.roomId).emit('broadCastMessage', {message: data.message, author: data.author});

        });

        /**
         * 
         */
        socket.on('disconnect', function() {

            utilities.log('[SOCKET_IO] disconnect', 'info');

        });

    });

};

exports.sendToPlaylistsToClient = function(topPlaylistsObject) {

    utilities.log('[SOCKET_IO] sendToPlaylistsToClient', 'info');

    // send world coordinates to user that requested them
    io.sockets.socket(userId).emit('topPlaylistsObject', topPlaylistsObject);

};

