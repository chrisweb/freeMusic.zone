
/**
 * 
 * homepage controller constructor
 * 
 * @param {type} app
 * @returns {homepageController}
 */
var homepageController = function(app) {

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
homepageController.prototype.index = function(request, response) {

    // set the content-type header information
    response.contentType('application/json');

    // TODO: get mongodb json
    var jsonObject = {};

    // stringify the json object
    var jsonString = JSON.stringify(jsonObject);

    // send json string to browser
    response.send(jsonString);
    
};

module.exports = homepageController;