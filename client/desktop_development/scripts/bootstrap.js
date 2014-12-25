/**
 * 
 * application bootstrap
 * 
 * @param {type} utilities
 * @param {type} SplashScreenPlugin
 * @param {type} RouterPlugin
 * @param {type} UserPlugin
 * @param {type} EventsManager
 * @param {type} container
 * 
 * @returns {_L19.Anonym$6}
 */
define([
    'chrisweb.utilities',
    'library.plugin.splashScreen',
    'library.plugin.router',
    'library.plugin.user',
    'library.eventsManager',
    'ribs.container'
    
], function (
    utilities,
    SplashScreenPlugin,
    RouterPlugin,
    UserPlugin,
    EventsManager,
    container
) {

    'use strict';
    
    var run = function runFunction() {
        
        // first initialize the splashScreen plugin
        SplashScreenPlugin.initialize();
        
        // then we initialize the router plugin
        // the router plugin will intialize the router
        // the pre route will check if the user is logged and redirect him to
        // the appopriate page
        RouterPlugin.initialize(function(error, unsupported) {
            
            if (error) {
                
                // TODO: tell user he needs a browser that supports html5 history
                
                //utilities.log(error);
                
                require(['views/components/notsupported'], function(NotSupportedView) {
                    
                    var notSupportedView = new NotSupportedView({
                        variables: {
                            feature: unsupported.feature
                        }
                    });
                    
                    container.add('#core', notSupportedView);
                    
                    container.dispatch('#core');
                    
                });
                
            }
            
        });
        
        // on dom load
        $(function() {
            
            utilities.log('dom finished loading...');
            
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