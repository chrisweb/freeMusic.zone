
'use strict';

/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'desktop/client/desktop_development/scripts',
    paths: {
        jquery: '../../../bower_components/jquery/dist/jquery',
        backbone: '../../../bower_components/backbone/backbone',
        underscore: '../../../bower_components/underscore/underscore',
        utilities: '../../../server/library/shared/utilities',
        configuration: 'configuration/configuration',
        ApplicationRouter: 'library/router',
        templates: 'templates/templates'
    }
});

require([
    'jquery',
    'backbone',
    'applicationRouter',
    'utilities'
], function ($, Backbone, applicationRouter, utilities) {
    
    /**
     * initialize the application on dom ready
     */
    $(function() {

        applicationRouter.on('route:renderHomepage', function() {

            utilities.log('[MAIN] homepage', 'blue');

            require(['controllers/homepage'], function(HomepageController) {
                
                utilities.log('[MAIN] homepage controller got loaded', 'blue');
                
                HomepageController.index();
                
            });

        });
        
        applicationRouter.on('route:render404', function() {

            utilities.log('[MAIN] 404', 'blue');

            

        });
        
        Backbone.history.start({
            pushState: true
        });
        
    });
    
    
    
});
