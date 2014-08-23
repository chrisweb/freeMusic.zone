define([
    'chrisweb.utilities',
    'configuration',
    'ribs.eventsManager',
    'backbone',
    'SoundManager',
    'library.tracksCache'
], function(utilities, configurationModule, eventsManager, Backbone, SoundManager, tracksCacheManager) {

    'use strict';
    
    var initialize = function initializeOuathLibraryFunction() {
        
        // the oauth page that is in the iframe will trigger the "connected"
        // event from within the iframe on successfull oauth connection, we
        // listen for that event and trigger an app event to inform the app
        // that the oauth process has come to an end
        window.connected = function() {

            utilities.log('oauth connected');

            eventsManager.trigger('oauth:connected');

        };
        
    };

    return {
        initialize: initialize
    };

});