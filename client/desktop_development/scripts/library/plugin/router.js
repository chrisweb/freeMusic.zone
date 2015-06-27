/**
 * 
 * router plugin
 * 
 * @param {type} $
 * @param {type} utilities
 * @param {type} Backbone
 * @param {type} RouterLibrary
 * @param {type} modernizrTestsLoader
 * @param {type} Modernizr
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'jquery',
    'chrisweb-utilities',
    'backbone',
    'library.router',
    'modernizrTestsLoader',
    'Modernizr'
    
], function ($, utilities, Backbone, RouterLibrary, modernizrTestsLoader, Modernizr) {
    
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
        
        // initialize the router and get an instance of the router library
        var routerLibrary = RouterLibrary();
        
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
                        
                        // listen for clicks on a link element
                        addLinkClickListeners(routerLibrary);

                        if (callback !== undefined) {
                            
                            callback(false);
                            
                        }
                        
                    } else {
                        
                        if (callback !== undefined) {
                            
                            callback('history is not supported', { feature: 'history api' });
                            
                        }
                        
                    }
                    
                }
                
            });
            
        });
        
    };
    
    /**
     * 
     * listen for clicks on links
     * 
     * @param {type} routerLibrary
     * 
     */
    var addLinkClickListeners = function addLinkClickListenersFunction(routerLibrary) {
        
        // get an instance of the router library
        var routerLibrary = RouterLibrary();
        
        // select the body element and cache it so it can be reused
        var $body = $('body');
        
        // every time there is a click on a link element, take the url and
        // use the backbone router navigate function
        $body.on('click', 'a:not(.external)', function(event) {
            
            event.preventDefault();
            
            var url = $(this).attr('href');
            
            routerLibrary.navigate(url, { trigger: true });
            
        });
        
    };
    
    return {
        initialize: initialize
    };
    
});