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
 * @param {type} container
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'ribs.container'
    
], function (
    utilities,
    container
) {
    
    'use strict';
    
    /**
     * 
     * initialize the header navigation
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        utilities.log('[HEADER NAVIGATION] initializing ...', 'fontColor:blue');
        
        // add the header navigation to the header element of the layout
        require(['views/components/headerNavigation'], function(HeaderNavigationView) {
            
            var headerNavigationView = new HeaderNavigationView();
            
            container.add('#header', headerNavigationView);
            
            container.dispatch('#header');

        });
        
    };

    return {
        initialize: initialize
    };
    
});