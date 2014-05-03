define([
    'backbone',
    'utilities'
], function (Backbone, utilities) {
    
    'use strict';
    
    var router;
    
    var initialize = function initializeFunction() {
        
        var Router = Backbone.Router.extend({

            initialize: function() {

                utilities.log('[ROUTER] routing...', 'blue');

            },
            routes: {
                /* TODO: put route definitions in seperate routes-configuration file */
                'desktop': 'renderHomepage',
                '*other': 'render404'
            }

        });
        
        return Router;
        
    };
    
    var getRrouter = function instantiateFuntion() {

        if (router === undefined) {
            
            var Router = initialize();
            
            router = new Router();
            
        }
        
        return router;
        
    };

    return {
        start: getRrouter
    };
    
});
