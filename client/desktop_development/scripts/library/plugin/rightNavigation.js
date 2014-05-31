/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * right navigation
 * 
 * @param {type} utilities
 * @param {type} Backbone
 * @param {type} container
 * @returns {_L16.Anonym$2}
 */
define([
    'utilities',
    'backbone',
    'container'
], function (utilities, Backbone, container) {
    
    'use strict';
    
    var initialize = function initializeFunction() {
        
        // add the header navigation to the header element of the layout
        require(['views/components/rightNavigation'], function(RightNavigationView) {
            
            var rightNavigationView = new RightNavigationView();
            
            container.add('right_aside', rightNavigationView);

        });
        
    };

    return {
        start: initialize
    };
    
});