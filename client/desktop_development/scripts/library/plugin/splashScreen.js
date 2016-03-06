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

            var $progressContainer = $body.find('.progressContainer');
            
            $progressContainer.removeClass('hidden');
            
            // listen for video buffering progress events
            EventsLibrary.on(EventsLibrary.WELCOME_VIDEO_PLAYER_PROGRESS, onVideoBufferingProgress.bind($progressContainer));
            
        });
        
    };
    
    var onVideoBufferingProgress = function onVideoBufferingProgressFunction(attributes) {

        var progress = attributes.percentageBuffered;
        
        var $progressContainer = this;
        
        var $progress = $progressContainer.find('progress');
        
        $progress.val(progress);
        
        $progress.text(progress + '%');

        if (progress === 100) {
            
            setTimeout(function aLittleBitLater() {
            
                $progressContainer.addClass('hidden');
                hideSplashScreen();

            }, 500);
            
        }

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

        // clear progress listener
        EventsLibrary.off(EventsLibrary.WELCOME_VIDEO_PLAYER_PROGRESS, onVideoBufferingProgress);
        
    };
    
    return {
        initialize: initialize
    };
    
});