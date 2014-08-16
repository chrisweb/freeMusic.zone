/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * left navigation
 * 
 * @param {type} utilities
 * @param {type} Backbone
 * @param {type} container
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'backbone',
    'ribs.container'
], function (utilities, Backbone, container) {
    
    'use strict';
    
    var initialize = function initializeFunction() {
        
        // add the header navigation to the header element of the layout
        require(['views/components/leftNavigation'], function(LeftNavigationView) {
            
            var leftNavigationView = new LeftNavigationView();
            
            container.add('#left_aside', leftNavigationView);
            
            container.dispatch();

        });
        
    };

    return {
        start: initialize
    };
    
});