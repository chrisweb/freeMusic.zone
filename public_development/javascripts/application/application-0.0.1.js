
define('application', ['configuration', 'utilities', 'routes'], function(configurationModule, utilities, routes) {

    'use strict';
    
    var configuration = configurationModule.get();
    
    var launchApplication = function() {
        
        Backbone.history.start({
            pushState: true,
            root: '/'
        });

    };

    /**
     * 
     */
    return {
        launch: launchApplication
    };
    
});