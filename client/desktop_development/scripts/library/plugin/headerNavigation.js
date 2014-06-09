/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * header navigation
 * 
 * @param {type} utilities
 * @param {type} Backbone
 * @param {type} container
 * @returns {_L16.Anonym$2}
 */
define([
    'library.utilities',
    'backbone',
    'library.container'
], function (utilities, Backbone, container) {
    
    'use strict';
    
    var initialize = function initializeFunction() {
        
        // add the header navigation to the header element of the layout
        require(['views/components/headerNavigation'], function(HeaderNavigationView) {
            
            var headerNavigationView = new HeaderNavigationView();
            
            container.add('header', headerNavigationView);
            
            container.dispatch();

        });
        
    };

    return {
        start: initialize
    };
    
});