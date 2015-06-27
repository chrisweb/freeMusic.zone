/**
 * 
 * header navigation
 * 
 * @param {type} utilities
 * @param {type} Ribs
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb-utilities',
    'ribsjs'
    
], function (
    utilities,
    Ribs
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
        require([
            'views/components/header/navigation',
            'views/components/player/navbarUI'
        ], function(HeaderNavigationView, PlayerNavigationbarUIView) {
            
            // header navigation
            var headerNavigationView = new HeaderNavigationView();
            
            Ribs.container.clear('#header');
            
            Ribs.container.add('#header', headerNavigationView);
            
            Ribs.container.dispatch('#header');
            
            // header navigation player
            var playerNavigationbarUIView = new PlayerNavigationbarUIView();
            
            Ribs.container.clear('#player');
            
            Ribs.container.add('#player', playerNavigationbarUIView);
            
            Ribs.container.dispatch('#player');

        });
        
    };

    return {
        initialize: initialize
    };
    
});