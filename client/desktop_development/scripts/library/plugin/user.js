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
    'chrisweb-utilities',
    'library.user'

], function (
    utilities,
    UserLibrary
) {
    
    'use strict';
    
    /**
     * initialize the user plugin
     */
    var initialize = function initializeFunction(callback) {
        
        utilities.log('[USER PLUGIN] initializing ...', 'fontColor:blue');

        // check if the user is logged in
        UserLibrary.isLoggedIn(callback);
        
    };

    return {
        initialize: initialize
    };
    
});