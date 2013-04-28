
/**
 * 
 * tweets controller cobstructor
 * 
 * @param {type} app
 * @returns {tweetsController}
 */
<<<<<<< HEAD
var tweetsController = function(app) {
    
    var tweetsModelModule = require('../models/tweetsModel');
    
    this.tweetsModel = new tweetsModelModule(app);
    
};

tweetsController.prototype.index = function() {
    
    this.tweetsModel.getPopular({ 'offset': 0, 'limit': 100 });
    
};

module.exports = tweetsController;
=======
var initialize = function(app) {
    
    app.get('/', function(req, res) {
    
        var tweetsModel = require(__dirname + '/../models/tweetsModel').constructor(app);

        res.render('index', { helloworld: 'Hello World' });

    });
    
};

exports.initialize = initialize;
>>>>>>> 6ba9ccd1e7f5ab9c1db66a5f57fb454f81003d34
