'use strict';

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// load the jamendo api wrapper module
var Jamendo = require('jamendo');

// library event (eventsManager)
var eventsManager = require('./event');

// user model
var UserModel = require('../models/user');

// momentjs vendor module
var moment = require('moment');

module.exports.start = function initialize(configuration) {
    
    eventsManager.on('userOauth', function(parameters) {
        
        utilities.log('[USER] on userOauth');
        
        //utilities.log('parameters: ', parameters.userOauthData);
        
        var userOauthData = parameters.userOauthData;
        var request = parameters.request;
        var response = parameters.response;
        var next = parameters.next;
        var errorMessage = false;
        
        // get user personal info using token
        var jamendo = new Jamendo({
            client_id : configuration.jamendoApi.clientId,
            protocol  : configuration.jamendoApi.protocol,
            version   : configuration.jamendoApi.version,
            debug     : false,
            rejectUnauthorized: false
        });

        // get the user data (the id is needed to check if user exists in db)
        jamendo.users({ access_token: userOauthData.token }, function(error, userDataAPI) {
            
            //utilities.log('user data from API: ', data);
            
            if (userDataAPI.headers.error_message !== '') {
                
                errorMessage = 'getting user data using the jamendo API failed';
                    
                utilities.log(errorMessage + ': ', data.headers.error_message, 'fontColor:red');
                
            } else if (userDataAPI.headers.warnings !== '') {
                
                errorMessage = 'getting user data using the jamendo API failed';
                
                utilities.log(errorMessage + ': ', data.headers.warnings, 'fontColor:red');
                
            } else if (error) {
                
                errorMessage = 'getting user data using the jamendo API failed';
                
                utilities.log(errorMessage + ': ', error, 'fontColor:red');
                
            } else {
                
                // check if user exists in database
                var userModel = new UserModel();
                
                var userResult = userDataAPI.results[0];
                
                var query = { 
                    id: userResult.id
                };
                
                userModel.exists(query, function getOneUserCallback(error, userExists) {
                    
                    if (!error) {
                        
                        if (!userExists) {
                            
                            //utilities.log('userOauthData: ', userOauthData);
                            //utilities.log('userDataAPI: ', userDataAPI);
                            
                            var userData = {
                                nickname: userResult.dispname,
                                createdAt: new Date(userResult.creationdate),
                                language: userResult.lang,
                                avatar: userResult.image,
                                id: parseInt(userResult.id),
                                oauth: userOauthData
                            };
                            
                            // user does not yet exist, save data in db
                            userModel.saveOne(userData, function saveUserCallback(error, model) {
                                
                                if (!error) {
                                    
                                    model.isLogged = true;

                                    // put user data into session
                                    request.session.user = model;
                                    
                                    // send a response back to the client
                                    response.render('oauth', { message: 'oauth connect success' });
                                    
                                } else {
                                    
                                    errorMessage = 'error while saving the user';
                                    
                                    utilities.log(errorMessage + ': ', error, 'fontColor:red');
                                    
                                }
                                
                            });
                            
                        } else {
                            
                            //utilities.log('userDataDB: ', userDataDB);
                            
                            var userId = parseInt(userResult.id);
                            
                            var userDataToUpdate = {
                                nickname: userResult.dispname,
                                language: userResult.lang,
                                avatar: userResult.image,
                                oauth: userOauthData
                            };
                            
                            // update user data in db
                            userModel.updateOne(userId, userDataToUpdate, function updateUserCallback(error, model) {
                                
                                if (!error) {
                                    
                                    model.isLogged = true;

                                    // put user data into session
                                    request.session.user = model;
                                    
                                    // send a response back to the client
                                    response.render('oauth', { message: 'oauth connect success' });
                                    
                                } else {
                                    
                                    errorMessage = 'error while updating the user';
                                    
                                    utilities.log(errorMessage + ': ', error, 'fontColor:red');
                                    
                                }
                                
                            });
                            
                        }
                        
                    } else {
                        
                        errorMessage = 'error checking if the user exists';
                        
                        utilities.log(errorMessage + ': ', error, 'fontColor:red');
                        
                    }
                    
                });
                
            }
            
            if (errorMessage) {
                
                next(errorMessage, request, response, next);
                
            }
            
        });
        
    });
    
};

module.exports.getOauthToken = function getOauthTokenFunction(userSessionData, configuration, getOauthTokenCallback) {
    
    var dateInTenMinutes = moment().add(10, 'minutes');
    var expiryDate = userSessionData.oauth.expiryDate;
    
    // do we need to refresh the token
    if (dateInTenMinutes.diff(expiryDate, 'seconds') < 0) {
        
        utilities.log('[USER LIBRARY] update oauth token, it will expire soon', 'fontColor:green');
        
        var refreshToken = userSessionData.oauth.refreshToken;
        
        oauthLibrary.updateOauthToken(refreshToken, configuration, function(error, oauthData) {
            
            if (!error) {
                
                userSessionData.oauth = oauthData;
                
                getOauthTokenCallback(false, oauthData.token);
                
            } else {
                
                getOauthTokenCallback(error);
                
            }
            
        });
        
    } else {
        
        var token = userSessionData.oauth.token;
        
        getOauthTokenCallback(false, token);
        
    }
    
};