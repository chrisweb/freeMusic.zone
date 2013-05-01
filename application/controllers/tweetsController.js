
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

tweetsController.prototype.index = function(request, response) {

    console.log('tweets controller index action got executed');
    
    console.log(request);
    
    //this.tweetsModel.getPopular({ 'offset': 0, 'limit': 100 });
    
    response.render('tweets/index', { tweets: undefined, helloworld: 'Hello World' });
    
};

module.exports = tweetsController;

/*
index = function(app) {
    
    console.log('tweets controller index action got executed');
    
    
    
}

exports.index = index;
*/