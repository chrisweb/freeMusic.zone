/**
 * 
 * application bootstrap
 * 
 * @param {type} RouterPlugin
 * 
 * @returns {_L19.Anonym$6}
 */
define([
    'library.plugin.router'
    
], function (
    RouterPlugin
) {

    'use strict';
    
    // TODO: all of these initializers could be put into "plugins"
    
    var initializeApplication = function initializeApplicationFunction() {
        
        utilities.log('[BOOTSTRAP] initializeApplication', 'fontColor:blue');
        
        // modernizr
        // video tag support
        if (modernizr.video) {
            
            utilities.log('video tag support success', 'fontColor:green', 'backgroundColor:yellow');
            
        }
        
    };
    
    var initializePlayer = function initializePlayerFunction() {
        
        utilities.log('[BOOTSTRAP] initializePlayer', 'fontColor:blue');

        Player.start();
        
    };
    
    var initializeTracksCacheManager = function initializeTracksCacheManagerFunction() {
        
        utilities.log('[BOOTSTRAP] initializeTracksCacheManager', 'fontColor:blue');

        TracksCacheManager.start();
        
    };
    
    var initializeHeaderNavigation = function initializeHeaderNavigationFunction() {
        
        utilities.log('[BOOTSTRAP] initializeHeaderNavigation', 'fontColor:blue');
        
        HeaderNavigation.start();
        
    };
    
    var initializeLeftNavigation = function initializeLeftNavigationFunction() {
        
        utilities.log('[BOOTSTRAP] initializeLeftNavigation', 'fontColor:blue');
        
        LeftNavigation.start();
        
    };
    
    var run = function runFunction() {

        // first we initialize the router
        RouterPlugin.initialize();

        // on dom load
        $(function() {
            
            console.log('dom finished loading...');
            
            
            
            
            
            
            
            
            
            /*// initialize user before router as pre-route event triggers
            // a check to verify if user is logged in
            UserPlugin.initialize(function initializeUserCallback(error, isLoggedIn) {
                
                if (isLoggedIn && !error) {
                    
                    
                    
                } else {
                    
                    var router = Router.getRrouter();
            
                    // navigate to the welcome page
                    router.navigate('desktop/homepage/welcome', {trigger: true});
                    
                }
                
            });

            initializeRouter();
            
            initializeApplication();

            eventsManager.trigger('application:loaded');*/
            
        });
        
        /*// on user connected with oauth, as soon as the user is connected
        // using his jamendo account we can remove the login page and open
        // the welcome page
        eventsManager.on('oauth:isLogged', function bootstrapOauthConnected() {

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