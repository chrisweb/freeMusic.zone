/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * router plugin
 * 
 * @param {type} utilities
 * @param {type} Backbone
 * @param {type} RouterLibrary
 * @param {type} modernizrTestsLoader
 * @param {type} Modernizr
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'backbone',
    'library.router',
    'modernizrTestsLoader',
    'Modernizr'
    
], function (utilities, Backbone, RouterLibrary, modernizrTestsLoader, Modernizr) {
    
    'use strict';
    
    var initialize = function initializeFunction(callback) {

        utilities.log('[ROUTER PLUGIN] initializeRouter', 'fontColor:blue');
        
        modernizrTestsLoader([
            'test/history'
        ], function() {

            Modernizr.runTest(['history'], function(error, testResult) {

                if (!error) {

                    if (testResult) {
            
                        var router = RouterLibrary.getInstance();
                        
                        // always do the history start after initializing the
                        // router or the first route event wont get triggered
                        Backbone.history.start({
                            pushState: true
                        });

                        if (callback !== undefined) {

                            callback(false, router);
                            
                        }
                        
                    } else {
                        
                        // TODO: tell user he needs a browser that supports html5 history
                        
                        console.log('history is not supported');
                        
                    }
                    
                }
                
            });
            
        });
        
    };
    
    return {
        initialize: initialize
    };
    
});