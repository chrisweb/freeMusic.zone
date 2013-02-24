/**
 * 
 * @param {type} $
 * @param {type} configuration
 * @param {type} socket
 * @returns {_L4.Anonym$0}
 */
define(['socket.io', 'utilities'], function(socket, utilities) {

    /**
     * 
     * @returns {undefined}
     */
    var openSocketIOConnection = function() {

        // connect to server
        socket = io.connect('http://127.0.0.1:35000/');

        utilities.log('trying to open a socket.io connection: ' + typeof(socket));

        socket.on('connection', function(socket) {

            utilities.log('websocket connection to server');
            
            initializeSocketIOListeners();

        });

    };
    
    /**
     * 
     * @param {type} coordinatesX
     * @param {type} coordinatesY
     * @returns {_L8.retrieveWorldByCoordinates}
     */
    var retrieveWorldByCoordinates = function(coordinatesX, coordinatesY) {
        
        action = {
            'name': 'retrieveWorldByCoordinates',
            'data': {
                'X': coordinatesX,
                'Y': coordinatesY
            }
        };
        
        sendActionToServer(action);
        
    };
    
    /**
     * 
     * @param {type} username
     * @returns {_L8.joinJamendoWorldLobby}
     */
    var joinJamendoWorldLobby = function(username) {
        
        action = {
            'name': 'joinJamendoWorldLobby',
            'data': {
                'username': username
            }
        };
        
        sendActionToServer(action);
        
    };
    
    /**
     * 
     * @param {type} action
     * @returns {undefined}
     */
    var sendActionToServer = function(action) {

        socket.emit(action.name, action.data);

    };

    /**
     * 
     * @returns {undefined}
     */
    var initializeSocketIOListeners = function() {

        socket.on('incomingAction', function(action) {

            switch (action.name) {
 
                case 'welcomeMessage':

                    welcomeMessage(action.data);

                break;

                case '':

                    welcomeMessage(action.data);

                break;

                default:

                    utilities.log('unknown incoming action: ' + action.name);

                }

        });
        
    };

    /**
     * 
     */
    return {
        
        'initialize': openSocketIOConnection,
        'retrieveWorldByCoordinates': retrieveWorldByCoordinates,
        'joinJamendoWorldLobby': joinJamendoWorldLobby

    };

});