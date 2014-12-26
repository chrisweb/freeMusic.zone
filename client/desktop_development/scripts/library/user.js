/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * user library
 * 
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} UserModel
 * @param {type} moment
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'chrisweb.utilities',
    'library.eventsManager',
    'models.User',
    'moment'
    
], function (utilities, EventsManager, UserModel, moment) {
    
    'use strict';
    
    var instance = null;

    var UserSingleton = function UserSingletonFunction() {
        
        if (instance !== null) {
            throw new Error('singleton has already been instantiated, use getInstance()');
        }
        
        this.model = new UserModel();
        
    };
    
    UserSingleton.prototype = {

        fetchUserData: function fetchUserDataFunction(callback) {

            this.model.fetch({
                success: function(model, response, options) {
                    
                    if (callback !== undefined) {
                    
                        callback(false, model);
                        
                    }
                    
                },
                error: function(model, response, options) {
                    
                    utilities.log(response);
                    
                    if (callback !== undefined) {
                    
                        callback(true);
                        
                    }
                    
                }
            });
            
        },
        getAttribute: function getAttributeFunction(attributeName) {

            var attributeValue = this.model.get(attributeName);
            
            return attributeValue;

        },
        setAttribute: function setAttributeFunction(attributeName, attributeValue) {

            this.model.set(attributeName, attributeValue);

        },
        isLogged: function isLoggedFunction(callback) {

            // fetch the user data from server if the user data is not already
            // in the model
            if (this.model.get('id') === null) {
                
                this.fetchUserData(function(error, model) {
                    
                    // check if the user is logged
                    callback(false, model.get('isLogged'));
                    
                });
                
            } else {
                
                callback(false, this.model.get('isLogged'));
                
            }
            
        }
        
    };
    
    var getInstance = function getInstanceFunction() {
        
        if (instance === null) {
            
            utilities.log('[USER] initialized...');
            
            instance = new UserSingleton();
            
        }
        
        return instance;
        
    };

    return getInstance();
    
});