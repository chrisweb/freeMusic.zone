'use strict';

// utilities module
var utilities = require('./shared/utilities');

// load the jamendo api wrapper module
var Jamendo = require('jamendo');

// library event (eventsManager)
var eventsManager = require('./event');

// user model
var UserModel = require('../models/user');

module.exports.start = function initialize(configuration) {
    
    eventsManager.on('userOauth', function(userOauthData, request) {
        
        utilities.log('[USER] on userOauth');
        utilities.log('userOauthData: ', userOauthData);
        
        // get user personal info using token
        var jamendo = new Jamendo({
            client_id : configuration.jamendoApi.clientId,
            protocol  : configuration.jamendoApi.protocol,
            version   : configuration.jamendoApi.version,
            debug     : false,
            rejectUnauthorized: false
        });

        jamendo.users({ access_token: userOauthData.token }, function(error, userDataAPI) {
            
            //utilities.log('user data from API: ', data);
            
            if (userDataAPI.headers.error_message !== '') {
                    
                utilities.log('getting user data using the jamendo API failed: ', data.headers.error_message, 'fontColor:red');
                
            } else if (userDataAPI.headers.warnings !== '') {
                    
                utilities.log('getting user data using the jamendo API failed: ', data.headers.warnings, 'fontColor:red');
                
            } else if (error) {
                
                utilities.log('getting user data using the jamendo API failed: ', error, 'fontColor:red');
                
            } else {
                
                // check if user exists in database
                var userModel = new UserModel();
                
                var userData = userModel.getOne(userDataAPI.id, function getOneUserCallback(error, userDataDB) {
                    
                    if (!error) {
                        
                        if (userDataDB === null) {
                            
                            // user does not yet exist, save data in db
                            userModel.saveOne();
                            
                        }
                        
                        // put user data into session
                        request.session.user = {
                            
                        };
                        
                    }
                    
                });
                
                
                
            }
            
        });
        
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