'use strict';

// utilities module
var utilities = require('./shared/utilities');

// load the jamendo api wrapper module
var Jamendo = require('jamendo');

// library event (eventsManager)
var eventsManager = require('./event');

module.exports.start = function initialize() {
    
    eventsManager.on('userOauth', function(userOauthData) {
        
        utilities.log('   on userOauth');
        utilities.log(userOauthData);
        
    });
    
};




/*

// get user infos through jamendo api (username / id)
            that.jamendo.users({
                access_token: result.access_token
            },
            function(error, data) {

                utilities.log('oauth result data object: ');
                utilities.log(data);

                if (!error) {

                    var user = { 
                        nickname: data.results[0].name,
                        id: data.results[0].id,
                        createdAt: data.results[0].creationdate,
                        language: data.results[0].lang,
                        avatar: data.results[0].image
                    };

                    user.oauth = result;

                    if (typeof appRequest.session !== 'undefined') {

                        // put user object in session
                        appRequest.session.user = user;

                        // check if the user exists, if so update it
                        // else save the user in the mongodb database
                        appModels.user.saveOne(user);

                        appResponse.render('oauth', { message: 'oauth connect success' });

                    } else {

                        error = { status: 500, stack: '', message: 'undefined session' };

                        utilities.log('undefined session, redis may be down: ' + error);

                        appNext(error, appRequest, appResponse, appNext);

                    }

                } else {

                    error = { status: oauthResponse.statusCode, stack: '', message: result.error };

                    utilities.log('oauth request failed, status: ' + error);

                    appNext(error, appRequest, appResponse, appNext);

                }

            });

 */