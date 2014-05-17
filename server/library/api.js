'use strict';

// utilities module
var utilities = require('./shared/utilities');

// jamendo vendor module
var Jamendo = require('jamendo');

var apiStart = function(configuration, app, apiRouter) {

	apiRouter.use(function(request, response, next) {
    
        utilities.log('/api, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);
    
        next();
    
    });
    
    apiRouter.get('/search', function(request, response, next) {
		
        utilities.log('/api/search hit');
        
        //utilities.log(request);
        
        var jamendo = new Jamendo({
            client_id : configuration.jamendoApi.clientId,
            protocol  : 'http',
            version   : 'v3.0',
            debug     : false,
            rejectUnauthorized: false
        });
        
        utilities.log(request.query.q);

        jamendo.tracks({ namesearch: request.query.q }, function(error, data) {
            
            //utilities.log(error);
            utilities.log(data);
            
            if (data.headers.error_message !== '') {
                    
                response.status(500);
                response.json({ error: data.headers.error_message });
                
            } else if (data.headers.warnings !== '') {
                    
                response.status(500);
                response.json({ error: data.headers.warnings });
                
            } else if (error) {
                    
                response.status(500);
                response.json({ error: error });
                
            } else {
                
                response.status(200);
                response.json(data);
                
            }
            
        });
        
	});
    
    app.use('/api', apiRouter);

};

module.exports.apiStart = apiStart;