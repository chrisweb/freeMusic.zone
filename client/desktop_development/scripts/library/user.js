/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * user plugin
 * 
 * @param {type} utilities
 * @param {type} eventsManager
 * @param {type} UserModel
 * @param {type} moment
 * @returns {_L17.Anonym$1}
 */
define([
    'chrisweb.utilities',
    'ribs.eventsManager',
    'models.User',
    'moment'
], function (utilities, eventsManager, UserModel, moment) {
    
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
        isLogged: function isLoggedFunction() {
            
            var isLogged = this.model.get('isLogged');
            
            return isLogged;
            
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