
/**
 * 
 * tweets controller cobstructor
 * 
 * @param {type} app
 * @returns {tweetsController}
 */
var tweetsController = function(app) {

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
tweetsController.prototype.index = function(request, response) {

    console.log('tweets controller index action got executed');
    
    //console.log(request);
    
    //this.tweetsModel.getPopular({ 'offset': 0, 'limit': 100 });
    
    response.render('tweets/index', { tweets: undefined, helloworld: 'Hello World' });
    
};

/**
 * 
 * 
 * 
 * @param {type} request
 * @param {type} response
 * @returns {undefined}
 */
tweetsController.prototype.tweetsJson = function(request, response) {

    // set the content-type header information
    response.contentType('application/json');

    // TODO: get mongodb json
    var jsonObject = {};

    // stringify the json object
    var jsonString = JSON.stringify(jsonObject);

    // send json string to browser
    response.send(jsonString);

};

module.exports = tweetsController;