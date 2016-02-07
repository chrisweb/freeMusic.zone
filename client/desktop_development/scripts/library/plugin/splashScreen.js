/**
 * 
 * splashScreen plugin
 * 
 * @param {type} EventsLibrary
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'chrisweb-utilities',
    'library.events',
    
    'velocity'
], function (
    utilities,
    EventsLibrary
) {
    
    'use strict';
    
    /**
     * public initialize splash screen plugin
     */
    var initialize = function initializeFunction() {
        
        utilities.log('[SPLASH SCREEN PLUGIN] initializing ...', 'fontColor:blue');

        EventsLibrary.once(EventsLibrary.constants.ROUTER_POSTROUTE, function() {
            
            var $body = $('body');

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

        var $splashScreen = $body.find('#splashScreen');
        
        $splashScreen.remove();
        
        EventsLibrary.trigger(EventsLibrary.constants.SPLASHSCREEN_OFF);
        
    };
    
    return {
        initialize: initialize
    };
    
});