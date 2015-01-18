/**
 * 
 * splashScreen plugin
 * 
 * @param {type} EventsManager
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'library.eventsManager',
    
    'velocity'
], function (EventsManager) {
    
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
        
        EventsManager.trigger(EventsManager.constants.SPLASHSCREEN_OFF);
        
    };
    
    return {
        initialize: initialize
    };
    
});