
// logging tool
winston = require('winston');

var logfilePath = 'logs/error.log';

//console.log(logfilePath);

winston.add(winston.transports.File, {
    filename: __dirname + '/logs/error.log',
    handleExceptions: true
});

// load the configuration module
var serverConfigurationModule = require('./configuration-0.0.2');

// read the configuration object
var serverConfiguration = serverConfigurationModule.getServerConfiguration();

// initialize the users queue
// containing all the users using the server right now
var usersQueue = [];

// require the modules needed by the application
var application = require('http').createServer(handler)
        , io = require('socket.io').listen(application)
        , filesystem = require('fs');

// start the applicaton server
application.listen(serverConfiguration.server.port);

/**
 * 
 * @param {type} request
 * @param {type} response
 * @returns {undefined}
 */
function handler(request, response) {

    // filter url for security reasons
    var fileUrl = request.url;
    fileUrl = fileUrl.replace('/..\//', '');
    fileUrl = fileUrl.replace('/.\//', '');
    fileUrl = fileUrl.replace('/\//', '');

    var filePath = __dirname + '/../client/development' + fileUrl;

    if (filePath === __dirname + '/../client/development/') {
        filePath = __dirname + '/../client/development/index.html';
    }

    console.log('a file got requested, path: ' + filePath);
    winston.log('a file got requested, path: ' + filePath);

    filesystem.exists(filePath, function(exists) {

        if (exists) {

            filesystem.readFile(filePath, function(error, content) {

                if (error) {

                    response.writeHead(500);
                    response.end();

                } else {

                    var mimetype = require('mime').lookup(filePath);

                    response.writeHead(200, {'Content-Type': mimetype, 'X-Server': 'JamendoWorldServer 0.0.7'});
                    response.end(content, 'utf-8');

                }

            });

        } else {

            response.writeHead(404);
            response.end();

        }

    });

}

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
io.sockets.on('connection', function(socket) {

    // use the socket id as user id
    var userId = socket.id;

    console.log('  ***  server opened new websocket connection for client with id: ' + userId);

    // add new user to the queue
    usersQueue[userId] = {};
    usersQueue[userId]['status'] = 'joined_server'; // status
    usersQueue[userId]['socket'] = socket; // user socket

    /**
     * 
     */
    socket.on('retrieveWorldByCoordinates', function(data) {
        
        
        
    });
        
    /**
     * 
     */
    socket.on('joinJamendoWorldLobby', function(data) {

        console.log('  ***  user with id "' + userId + '" and username "' + data.username + '" has entered the lobby');

        usersQueue[userId]['username'] = data.username; // username choosen by user

        // save username to socket.io session storage
        socket.set('username', data.username);
        
        // join the lobby room
        socket.join('lobby');

    });
    
    /**
     * 
     */
    socket.on('switchRoom', function(data) {

        // join the newly created game room
        socket.join(gameRoomHash);

        io.sockets.in(gameRoomHash).emit('joinedGenreRoom');


    });

    /**
     * 
     */
    socket.on('broadCastMessage', function(data) {

        // https://github.com/LearnBoost/socket.io/wiki/Rooms
        io.sockets.in(data.roomId).emit('broadCastMessage', { message: data.message, author: data.author });

    });

    /**
     * 
     */
    socket.on('disconnect', function() {

        // find the array index of the user that is leaving
        var indexOfUser = usersQueue.indexOf(userId);

        // using splice instead of delete
        // delete the user that is leaving from queue
        usersQueue.splice(indexOfUser);

    });

});
