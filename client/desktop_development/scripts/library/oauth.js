/**
 * 
 * oauth
 * 
 * @param {type} utilities
 * @param {type} EventsManager
 * 
 * @returns {oauth_L9.oauthAnonym$1}
 */
define([
    'chrisweb.utilities',
    'library.EventsManager'
    
], function(utilities, EventsManager) {

    'use strict';
    
    var initialize = function initializeOuathLibraryFunction() {
        
        // the oauth page that is in the iframe will trigger the "connected"
        // event from within the iframe on successfull oauth connection, we
        // listen for that event and trigger an app event to inform the app
        // that the oauth process has come to an end
        window.connected = function() {

            utilities.log('oauth connected');

            EventsManager.trigger(EventsManager.constants.OAUTH_CONNECTED);

        };
        
    };

    return {
        initialize: initialize
    };

});