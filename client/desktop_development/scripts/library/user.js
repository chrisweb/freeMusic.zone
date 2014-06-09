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
    'library.utilities',
    'library.eventsManager',
    'models.user',
    'moment'
], function (utilities, eventsManager, UserModel, moment) {
    
    'use strict';
    
    var instance = null;

    var UserSingleton = function UserSingletonFunction() {
        
        if (instance !== null) {
            throw new Error('singleton has already been instantiated, use getInstance()');
        }
        
        this.userModel = new UserModel();
        
    };
    
    UserSingleton.prototype = {

        getAttribute: function getAttributeFunction(attributeName) {

            var attributeValue = this.userModel.get(attributeName);
            
            return attributeValue;

        },
        setAttribute: function setAttributeFunction(attributeName, attributeValue) {

            this.userModel.get(attributeName, attributeValue);

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