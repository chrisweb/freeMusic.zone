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

        fetchUserData: function fetchUserDataFunction() {
            
            this.model.fetch();
            
        },
        getAttribute: function getAttributeFunction(attributeName) {

            var attributeValue = this.model.get(attributeName);
            
            return attributeValue;

        },
        setAttribute: function setAttributeFunction(attributeName, attributeValue) {

            this.model.set(attributeName, attributeValue);

        },
        isLogged: function isLoggedFunction(callback) {
            
            // if the user model does not yet exist
            
            // first check if the user has session cookie, if he doesn't he
            // is not logged in for sure and we don't need to ask the server
            
            // if he has a cookie, ask the server is his session is still active
            
            // fetch the user data from server
            
            
            //var isLogged = this.model.get('isLogged');
            
            var error = false;
            
            var isLogged = false;
            
            callback(error, isLogged);
            
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