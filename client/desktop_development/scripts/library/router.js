define([
    'backbone',
    'utilities'
], function (Backbone, utilities) {
    
    'use strict';
    
    var applicationRouter;
    
    var initialize = function initializeFunction() {
        
        var ApplicationRouter = Backbone.Router.extend({

            initialize: function() {

                utilities.log('[ROUTER] routing...', 'blue');

            },
            routes: {
                /* TODO: put route definitions in seperate routes-configuration file */
                'desktop': 'renderHomepage',
                '*other': 'render404'
            }

        });
        
        return ApplicationRouter;
        
    };
    
    var getRrouter = function instantiateFuntion() {
        
        if (applicationRouter === undefined) {
            
            var ApplicationRouter = initialize();
            
            applicationRouter = new ApplicationRouter();
            
        }
        
        return applicationRouter;
        
    };

    return {
        applicationRouter: getRrouter
    };
    
});
