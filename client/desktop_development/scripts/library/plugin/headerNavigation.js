/**
 * 
 * header navigation plugin
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
     * initialize the header navigation plugin
     */
    var initialize = function initializeFunction() {
        
        utilities.log('[HEADER NAVIGATION PLUGIN] initializing ...', 'fontColor:blue');
        
        // add the header navigation to the header element of the layout
        require([
            'views/components/header/navigation',
            'views/components/player/navbarUI'
        ], function(HeaderNavigationView, PlayerNavigationbarUIView) {
            
            // header navigation
            var headerNavigationView = new HeaderNavigationView();
            
            Ribs.Container.clear('#header');
            
            Ribs.Container.add('#header', headerNavigationView);
            
            Ribs.Container.dispatch('#header');
            
            // header navigation player
            var playerNavigationbarUIView = new PlayerNavigationbarUIView();
            
            Ribs.Container.clear('#player');
            
            Ribs.Container.add('#player', playerNavigationbarUIView);
            
            Ribs.Container.dispatch('#player');

        });
        
    };

    return {
        initialize: initialize
    };
    
});