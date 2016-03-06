'use strict';

// utilities module
var utilities = require('chrisweb-utilities');

// user library
var redisLibrary = require('./redis');

// underscore vendor module
var _ = require('underscore');

// socket.io and it's redis adapter
// https://github.com/socketio/socket.io
var SocketIO = require('socket.io');
var SocketIORedisAdapter = require('socket.io-redis');

// collaborative playlist model
var CollaborativePlaylistModel = require('../models/collaborativePlaylist');

module.exports.start = function initialize(configuration, server, expressSession) {
    
    var redisClients = [];

    var redisClientSocketIOPublisherOptions = {};
    
    // SOCKET.IO
    // TODO: put this into seperate function
    redisLibrary.getClient(redisClientSocketIOPublisherOptions, function getClientCallback(error, redisClientSocketIOPublisher) {
        
        if (!error) {
            
            redisClients.push(redisClientSocketIOPublisher);
            
            if (!configuration.redis.hasOwnProperty('databases') 
            || !configuration.redis.databases.hasOwnProperty('session') 
            || configuration.redis.databases.session === '') {
                
                throw 'the redis configuration for socket.io is missing, check out /server/configuration/configuration.js';
        
            }
            
            redisLibrary.selectDatabase(configuration.redis.databases.socketio, redisClientSocketIOPublisher, function selectDatabaseCallback(error) {
                
                if (!error) {
                    
                    // setup socket.io and its redis adapter
                    var socketIO = new SocketIO(server);
                    
                    var pub = redisClientSocketIOPublisher;
                    
                    var redisClientSocketIOSubscriberOptions = {
                        return_buffers: true
                    };
                    
                    redisLibrary.getClient(redisClientSocketIOSubscriberOptions, function getClientCallback(error, redisClientSocketIOSubscriber) {
                        
                        if (!error) {
                            
                            redisClients.push(redisClientSocketIOSubscriber);
                            
                            if (!configuration.redis.hasOwnProperty('databases') 
                            || !configuration.redis.databases.hasOwnProperty('session') 
                            || configuration.redis.databases.session === '') {
                                
                                throw 'the redis configuration for socket.io is missing, check out /server/configuration/configuration.js';
        
                            }
                            
                            redisLibrary.selectDatabase(configuration.redis.databases.socketio, redisClientSocketIOSubscriber, function selectDatabaseCallback(error) {
                                
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
                                    
                                    // client tells us that a new user has connected
                                    socketIONamespace.on('connection', function (socketIOSocket) {
                                        
                                        utilities.log('socket.io: user joined ' + socketIONamespaceName + ' namespace', 'fontColor:yellow');
                                        
                                        // add the some user data to his socket, for easy access later
                                        socketIOSocket.userName = socketIOSocket.client.request.session.user.nickname;
                                        socketIOSocket.userId = socketIOSocket.client.request.session.user.id;
                                        
                                        // client tells us that a user has disconnected
                                        socketIOSocket.on('disconnect', function () {
                                            
                                            utilities.log('socket.io: user left ' + socketIONamespaceName + ' namespace', 'fontColor:yellow');
                                                    
                                        });
                                        
                                        // client tells us that a user joined a collaborative playlist
                                        socketIOSocket.on('joinCollaborativePlaylist', function (attributes) {
                                            
                                            utilities.log('socket.io: user joined ' + attributes.collaborativePlaylistId + ' collaborativePlaylist room', 'fontColor:yellow');
                                            
                                            var roomId = attributes.collaborativePlaylistId;
                                            
                                            // if user is already in a room first leave it
                                            if (socketIOSocket.roomId !== undefined) {
                                                socketIOSocket.leave(roomId);
                                            }
                                            
                                            // join the new room
                                            socketIOSocket.join(roomId);
                                            
                                            // add the room id to the socket object
                                            socketIOSocket.roomId = roomId;
                                                    
                                        });
                                        
                                        // NOTE TO SELF:
                                        // it's important to understand the difference between
                                        // socket.in('room').emit -> which sends a message to everyone EXCEPT the sender
                                        // and
                                        // io.sockets.in('room').emit -> which sends a message to everyone INCLUDING the sender
                                        
                                        // client tells us that a new message get published in the chat of a collaborative playlist (room)
                                        socketIOSocket.on('messageCollaborativePlaylist', function (attributes) {
                                            
                                            utilities.log('socket.io: collaborativePlaylist message ' + attributes.message + ', in room: ' + socketIOSocket.roomId, 'fontColor:yellow');
                                            
                                            // send a message to all the users in a room except the client that created the message
                                            socketIOSocket.in(socketIOSocket.roomId).emit('messageCollaborativePlaylist', {
                                                message: socketIOSocket.userName + ': ' + attributes.message
                                            });

                                        });
                                        
                                        // client tells us that a new track got added to a collaborative playlist (room)
                                        socketIOSocket.on('trackCollaborativePlaylist', function (attributes) {
                                            
                                            var currentRoomId = socketIOSocket.roomId;
                                            var currentUserId = socketIOSocket.userId;
                                            var trackId = attributes.collaborativePlaylistTrack.id;
                                            
                                            utilities.log('socket.io: collaborativePlaylist -> add track, trackId: ' + trackId + ', in room: ' + currentRoomId, 'fontColor:yellow');

                                            // set the user and room id
                                            attributes.collaborativePlaylistTrack.room_id = currentRoomId;
                                            attributes.collaborativePlaylistTrack.user_id = currentUserId;

                                            // add the track to tracksList of the collaborative playlist room model and then update it in mongodb
                                            var collaborativePlaylistModel = new CollaborativePlaylistModel();
                                            
                                            var field = 'tracks';
                                            var value = {
                                                author_id: currentUserId,
                                                track_id: trackId
                                            };

                                            collaborativePlaylistModel.appendById(currentRoomId, field, value, function appendByIdCallback(error, document) {
                                            
                                                if (!error) {

                                                    utilities.log(document);

                                                } else {

                                                    // error while updated collaborative playlist mongo model with new track
                                                    utilities.log('error while updated collaborative playlist mongo model with new track, error: ' + error, 'fontColor:red');

                                                }
                                            
                                            });
                                            
                                            // send a message to all the users in a room except the client that created the message
                                            // dont wait for the mongodb update (unsafe save)
                                            socketIONamespace.in(socketIOSocket.roomId).emit('trackCollaborativePlaylist', {
                                                collaborativePlaylistTrack: attributes.collaborativePlaylistTrack,
                                                authorId: currentUserId
                                            });

                                        });

                                    });

                                } else {
                                    
                                    // error in redis select database for socket.io subscriber
                                    utilities.log(error, 'fontColor:red');

                                }

                            });

                        } else {
                            
                            // error in redis get client for socket.io subscriber
                            utilities.log(error, 'fontColor:red');

                        }

                    });

                } else {
                    
                    // error in redis select database for socket.io publisher
                    utilities.log(error, 'fontColor:red');

                }

            });

        } else {
            
            // error in redis get client for socket.io publisher
            utilities.log(error, 'fontColor:red');

        }

    });

    return redisClients;
    
};