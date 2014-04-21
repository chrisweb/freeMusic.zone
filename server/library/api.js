'use strict';

// utilities module
var utilities = require('./shared/utilities');

var apiStart = function(configuration, app, apiRouter) {

	apiRouter.use(function(request, response, next) {
    
        utilities.log('/api, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);
    
        next();
    
    });
    
    apiRouter.get('/search', function(request, response, next) {
		
        utilities.log('/api/search hit');
        
        response.status(200);
        response.json({ hello: 'world' });
        
	});
    
    app.use('/api', apiRouter);

};

module.exports.apiStart = apiStart;