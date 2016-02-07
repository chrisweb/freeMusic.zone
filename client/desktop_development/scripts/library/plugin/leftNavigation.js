/**
 * 
 * left navigation plugin
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
     * initialize the left navigation plugin
     */
    var initialize = function initializeFunction() {
        
        utilities.log('[LEFT NAVIGATION PLUGIN] initializing ...', 'fontColor:blue');
        
        // add the header navigation to the header element of the layout
        require(['views/components/left/navigation'], function(LeftNavigationView) {
            
            var leftNavigationView = new LeftNavigationView();
            
            Ribs.Container.clear('#left');
            
            Ribs.Container.add('#left', leftNavigationView);
            
            Ribs.Container.dispatch('#left');
            
            var $body = $('body');
            
            $body.addClass('withNavigation');
            
            $body.find('#pageContainer').addClass('navigationEffect');
            
            var $core = $body.find('#core');
            
            $core.addClass('autoflow');

        });
        
    };

    return {
        initialize: initialize
    };
    
});