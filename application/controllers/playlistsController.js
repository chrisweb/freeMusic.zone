
/**
 * 
 * playlists controller constructor
 * 
 * @param {type} app
 * @returns {playlistsController}
 */
var playlistsController = function(app) {

    this.app = app;
    
};

/**
 * 
 * 
 * 
 * @param {type} request
 * @param {type} response
 * @returns {undefined}
 */
playlistsController.prototype.list = function(request, response) {

    // set the content-type header information
    response.contentType('application/json');

    // TODO: get mongodb json
    var jsonObject = { result: [{ title: 'paylist1', imageUrl: '//www.jam_prototype.com/image1.png' }, { title: 'paylist2', imageUrl: '//www.jam_prototype.com/image2.png' }] };

    // stringify the json object
    var jsonString = JSON.stringify(jsonObject);

    // send json string to browser
    response.send(jsonString);
    
};

playlistsController.prototype.detail = function(request, response) {

    // set the content-type header information
    response.contentType('application/json');

    // TODO: get mongodb json
    var jsonObject = { title: 'paylist1', imageUrl: '//www.jam_prototype.com/image1.png', listenings: 500 };

    // stringify the json object
    var jsonString = JSON.stringify(jsonObject);

    // send json string to browser
    response.send(jsonString);
    
};

module.exports = playlistsController;