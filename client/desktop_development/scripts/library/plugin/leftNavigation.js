/**
 * 
 * left navigation
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
     * initialize the left navigation
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        utilities.log('[LEFT NAVIGATION] initializing ...', 'fontColor:blue');
        
        // add the header navigation to the header element of the layout
        require(['views/components/left/navigation'], function(LeftNavigationView) {
            
            var leftNavigationView = new LeftNavigationView();
            
            container.clear('#left');
            
            container.add('#left', leftNavigationView);
            
            container.dispatch('#left');
            
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