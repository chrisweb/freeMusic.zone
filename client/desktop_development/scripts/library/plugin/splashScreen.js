/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * splashScreen plugin
 * 
 * @param {type} EventsManager
 * @param {type} velocity
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'library.eventsManager',
    'velocity'
    
], function (EventsManager, velocity) {
    
    'use strict';
    
    /**
     * 
     * public initialize splash screen
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        EventsManager.once(EventsManager.constants.ROUTER_POSTROUTE, function() {
            
            var $body = $('body');
            
            $body.addClass('noOverflow');
            
            var $progress = $body.find('.progress');
            
            $progress.removeClass('hidden');
        
            var $progressBarLoading = $progress.find('.progress-bar-loading');
            
            $progressBarLoading
                .velocity(
                    { 
                        width: '100%'
                    },
                    {
                        duration: 2000,
                        easing: 'easeInCubic',
                        complete: function() {
                            $progress.addClass('hidden');
                            hideSplashScreen();
                        }
                    }
                );
            
        });
        
    };
    
    /**
     * 
     * private hide splash screen
     * 
     * @returns {undefined}
     */
    var hideSplashScreen = function hideSplashScreenFunction() {
        
        var $body = $('body');
        
        $body.removeClass('noOverflow');
        
        var $splashScreen = $body.find('#splashScreen');
        
        $splashScreen.remove();
        
    };
    
    return {
        initialize: initialize
    };
    
});