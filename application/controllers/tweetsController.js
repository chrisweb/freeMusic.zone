
/**
 * 
 * tweets controller cobstructor
 * 
 * @param {type} app
 * @returns {tweetsController}
 */

/*
var tweetsController = function(app) {

    var tweetsModelModule = require('../models/tweetsModel');
    
    this.tweetsModel = new tweetsModelModule(app);
    
};

tweetsController.prototype.index = function() {
    
    this.tweetsModel.getPopular({ 'offset': 0, 'limit': 100 });
    
};

module.exports = tweetsController;
*/

index = function(app) {
    
    console.log('controller is ready');
    
}

exports.index = index;