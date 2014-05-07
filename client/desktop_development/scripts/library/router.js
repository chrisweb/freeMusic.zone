/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * base router
 * 
 * @param {type} Backbone
 * @returns {_L15.Anonym$2}
 */
define([
    'backbone'
], function (Backbone) {
    
    'use strict';
    
    var router;
    
    var initialize = function initializeFunction() {
        
        var Router = Backbone.Router.extend({

            initialize: function() {
                
                

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
