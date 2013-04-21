/**
 * 
 * tweets controller
 * 
 * @param {type} mongoose
 * @returns {undefined}
 */
var initialize = function(app) {
    
    app.get('/', function(req, res) {
    
        var tweetsModel = require(__dirname + '/../models/tweetsModel').constructor(app);

        res.render('index', { helloworld: 'Hello World' });

    });
    
};

exports.initialize = initialize;
