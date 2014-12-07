/**
 * 
 * application bootstrap
 * 
 * @param {type} SplashScreenPlugin
 * @param {type} RouterPlugin
 * @param {type} EventsManager
 * 
 * @returns {_L19.Anonym$6}
 */
define([
    'library.plugin.splashScreen',
    'library.plugin.router',
    'library.eventsManager'
    
], function (
    SplashScreenPlugin,
    RouterPlugin,
    EventsManager
) {

    'use strict';
    
    var run = function runFunction() {

        // first initialize the splashScreen plugin
        SplashScreenPlugin.initialize();

        // then we initialize the router
        RouterPlugin.initialize();

        // on dom load
        $(function() {
            
            console.log('dom finished loading...');
            
            EventsManager.trigger(EventsManager.constants.DOM_LOADED);
            
        });
        
        /*// on user connected with oauth, as soon as the user is connected
        // using his jamendo account we can remove the login page and open
        // the welcome page
        EventsManager.on(EventsManager.constants.OAUTH_ISLOGGED, function bootstrapOauthConnected() {

            // initialize the audio player
            initializePlayer();
            
            // initialize the tracks manager
            initializeTracksCacheManager();
            
            // initialize the top navigation
            initializeHeaderNavigation();
            
            // initialize the left navigation but keep it hidden until the
            // user requests it
            initializeLeftNavigation();
            
            
            
        });*/
        
    };
    
    return {
        applicationStart: run
    };

});