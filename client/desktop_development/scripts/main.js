
'use strict';

require.config({
    baseUrl: 'client/desktop_development/scripts',
    paths: {
        jquery: '../../../bower_components/jquery/dist/jquery',
        backbone: '../../../bower_components/backbone/backbone',
        underscore: '../../../bower_components/underscore/underscore',
        utilities: '../../../server/library/shared/utilities',
        ApplicationRouter: 'routes/router'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    }
});

require([
    'jquery',
    'backbone',
    'ApplicationRouter',
    'utilities'
], function ($, Backbone, ApplicationRouter, utilities) {
    
    /**
     * initialize the application
     */
    $(function() {
    
        var applicationRouter = new ApplicationRouter();

        applicationRouter.on('route:renderHomepage', function() {

            utilities.log('[MAIN] homepage', 'blue');

            require(['scripts/controllers/homepage'], function(HomepageController) {
                
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
