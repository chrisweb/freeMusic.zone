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
    
    /**
     * 
     * public initialize router
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    var initialize = function initializeFunction(callback) {

        utilities.log('[ROUTER PLUGIN] initializeRouter', 'fontColor:blue');
        
        modernizrTestsLoader([
            'test/history'
        ], function() {

            Modernizr.runTest(['history'], function(error, testResult) {

                if (!error) {

                    if (testResult) {
                        
                        // always do the history start after initializing the
                        // router or the first route event wont get triggered
                        Backbone.history.start({
                            pushState: true
                        });
                        
                        // initialize the router
                        RouterLibrary.initialize();
                        
                        if (callback !== undefined) {
                            
                            callback(false);
                            
                        }
                        
                    } else {
                        
                        if (callback !== undefined) {
                            
                            callback('history is not supported');
                            
                        }
                        
                    }
                    
                }
                
            });
            
        });
        
    };
    
    return {
        initialize: initialize
    };
    
});