/**
 * 
 * user plugin
 * 
 * @param {type} utilities
 * @param {type} UserLibrary
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'library.user'
], function (utilities, UserLibrary) {
    
    'use strict';
    
    var initialize = function initializeFunction(callback) {
        
        // check if the user is logged in
        UserLibrary.isLoggedIn(callback);
        
    };

    return {
        initialize: initialize
    };
    
});