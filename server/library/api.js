'use strict';

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

var TweetsChartsDay = require('../models/tweetsChartsDay');

var _ = require('underscore');

// jamendo vendor module
var Jamendo = require('jamendo');

module.exports.start = function initialize(configuration, app, apiRouter) {

	apiRouter.use(function(request, response, next) {
    
        utilities.log('/api, method: ' + request.method + ', url:' + request.url + ', path:' + request.path);
    
        next();
    
    });
    
    apiRouter.get('/search', function(request, response, next) {
		
        utilities.log('[API] /api/search hit');
        
        //utilities.log(request);
        
        var jamendo = new Jamendo({
            client_id : configuration.jamendoApi.clientId,
            protocol  : configuration.jamendoApi.protocol,
            version   : configuration.jamendoApi.version,
            debug     : false,
            rejectUnauthorized: false
        });
        
        //utilities.log(request.query.q);

        jamendo.tracks({ namesearch: request.query.q, include: ['musicinfo', 'lyrics'], audioformat: 'ogg' }, function(error, data) {
            
            //utilities.log(error);
            //utilities.log(data);
            
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
                
                var newData = {};
                
                newData.results = [];
                
                _.each(data.results, function(value) {
                    
                    // string to integer for ids
                    value.album_id = parseInt(value.album_id);
                    value.id = parseInt(value.id);
                    value.artist_id = parseInt(value.artist_id);
                    
                    newData.results.push(value);
                    
                });
                
                response.status(200);
                response.json(newData);
                
            }
            
        });
        
	});
    
    apiRouter.get('/user', function(request, response, next) {
        
        //utilities.log('[API] session user: ', request.session.user);
        
        var userSessionData = request.session.user;
        
        if (userSessionData === undefined) {
            
            var defaultUserData = {
                isLogged: false,
                lastFetchDate: Date.now()
            };
        
            response.status(200);
            response.json(defaultUserData);
            
        } else {
            
            userSessionData.lastFetchDate = Date.now();
            userSessionData.isLogged = true;
            
            response.status(200);
            response.json(userSessionData);
            
        }
        
    });
    
    apiRouter.get('/tweet/charts/day', function(request, response, next) {
        
        utilities.log('[API] fetching tweet charts day');
        
        var tweetsChartsDay = new TweetsChartsDay();
        
        var options = {
            limit: 0
        }
        
        tweetsChartsDay.findMultiple(options, function(error, results) {
            
            utilities.log(error);
            utilities.log(results);
            
            if (!error) {
                
                response.status(200);
                response.json(results);
                
            } else {
                
                response.status(500);
                response.json({ error: error });
                
            }
            
        });
        
    });
    
    app.use('/api', apiRouter);

};