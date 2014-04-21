define([
    'backbone',
    'utilities'
], function (Backbone, utilities) {
    
    'use strict';

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
    
});
