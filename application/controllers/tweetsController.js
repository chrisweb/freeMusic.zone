/**
 * 
 * tweets controller
 * 
 * @param {type} mongoose
 * @returns {undefined}
 */
var indexAction = function(request, response) {
    
    var tweetsModel = require('./models/tweetsModel').get();
    
    res.render('index', { helloworld: 'Hello World' });
    
};

exports.index = indexAction;
