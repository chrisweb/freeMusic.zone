/*global require*/
'use strict';

require.config({
    baseUrl: '/desktop',
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
    },
    paths: {
        jquery: 'vendor/jquery/dist/jquery',
        backbone: 'vendor/backbone/backbone',
        underscore: 'vendor/underscore/underscore',
        utilities: 'library/shared/utilities',
        ApplicationRouter: 'scripts/routes/router'
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

            require(['application/views/connect/index-0.0.1'], function(ConnectViewModule) {
                
                
                
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
