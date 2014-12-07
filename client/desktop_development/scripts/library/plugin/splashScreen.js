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
 * @param {type} velocityUI
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'library.eventsManager',
    'velocity',
    'velocity.ui'
    
], function (EventsManager, velocity, velocityUI) {
    
    'use strict';
    
    /**
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        EventsManager.on(EventsManager.constants.ROUTER_POSTROUTE, function() {
            
            var $body = $('body');
            var $hidden = $body.find('#hidden');
            var $progressLoading = $hidden.find('.progress-loading');
            
            $progressLoading.removeClass('hidden');
        
            var $progressBarLoading = $hidden.find('.progress-bar-loading');
            
            $progressBarLoading
                .velocity(
                    { 
                        width: '100%'
                    },
                    {
                        duration: 2000,
                        easing: 'easeInCubic',
                        complete: function() {
                            $progressLoading.addClass('hidden');
                            hideSplashScreen();
                        }
                    }
                );
            
        });
        
    };
    
    /**
     * 
     * @returns {undefined}
     */
    var hideSplashScreen = function hideSplashScreenFunction() {
        
        var $body = $('body');
        
        // remove the splashScreen
        if ($body.hasClass('splashScreen')) {

            $body.removeClass('splashScreen').removeClass('splashScreenImage');

        }
        
    };
    
    return {
        initialize: initialize
    };
    
});