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
 * @param {type} Backbone
 * @param {type} Routes
 * @returns {_L15.Anonym$2}
 */
define([
    'backbone',
    'routes'
], function (Backbone, Routes) {
    
    'use strict';
    
    var router;
    
    var initialize = function initializeFunction() {
        
        var Router = Backbone.Router.extend({

            initialize: function() {
                
                

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
