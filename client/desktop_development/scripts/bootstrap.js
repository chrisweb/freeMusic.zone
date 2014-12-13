/**
 * 
 * application bootstrap
 * 
 * @param {type} SplashScreenPlugin
 * @param {type} RouterPlugin
 * @param {type} UserPlugin
 * @param {type} EventsManager
 * 
 * @returns {_L19.Anonym$6}
 */
define([
    'library.plugin.splashScreen',
    'library.plugin.router',
    'library.plugin.user',
    'library.eventsManager'
    
], function (
    SplashScreenPlugin,
    RouterPlugin,
    UserPlugin,
    EventsManager
) {

    'use strict';
    
    var run = function runFunction() {
        
        // first initialize the splashScreen plugin
        SplashScreenPlugin.initialize();
        
        // then we initialize the router plugin
        // the router plugin will intialize the router
        // the pre route will check if the user is logged and redirect him to
        // the appopriate page
        RouterPlugin.initialize(function(error) {
            
            if (error) {
                
                // TODO: tell user he needs a browser that supports html5 history
                
                console.log(error);
                
            }
            
        });
        
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