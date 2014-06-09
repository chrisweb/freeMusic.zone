/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * router
 * 
 * @param {type} utilities
 * @param {type} Backbone
 * @param {type} Routes
 * @returns {_L16.Anonym$2}
 */
define([
    'library.utilities',
    'backbone',
    'routes'
], function (utilities, Backbone, Routes) {
    
    'use strict';
    
    var router;
    
    var initialize = function initializeFunction() {
        
        var Router = Backbone.Router.extend({

            initialize: function() {
                
                utilities.log('[ROUTER] initializing...', 'fontColor:green');

            },
            routes: Routes

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
