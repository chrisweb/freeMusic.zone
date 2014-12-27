/**
 * 
 * application bootstrap
 * 
 * @param {type} utilities
 * @param {type} SplashScreenPlugin
 * @param {type} RouterPlugin
 * @param {type} UserPlugin
 * @param {type} LeftNavigationPlugin
 * @param {type} HeaderNavigationPlugin
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
    'library.plugin.leftNavigation',
    'library.plugin.headerNavigation',
    'library.eventsManager',
    'ribs.container'
    
], function (
    utilities,
    SplashScreenPlugin,
    RouterPlugin,
    UserPlugin,
    LeftNavigationPlugin,
    HeaderNavigationPlugin,
    EventsManager,
    container
) {

    'use strict';
    
    // did the components already get initialized
    var componentsAreReady = false;
    
    /**
     * 
     * run
     * 
     * @returns {undefined}
     */
    var run = function runFunction() {
        
        // first initialize the splashScreen plugin
        SplashScreenPlugin.initialize();
        
        // then we initialize the router plugin
        // the router plugin will intialize the router
        // the pre route will check if the user is logged and redirect him to
        // the appopriate page
        RouterPlugin.initialize(function(error, unsupported) {
            
            if (error) {

                utilities.log(error);
                
                require(['views/pages/notsupported'], function(NotSupportedView) {
                    
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

        // on event "post route" and the UI does not already exist
        EventsManager.on(EventsManager.constants.ROUTER_POSTROUTE, function(parameters) {
            
            if (parameters.routeName !== 'renderHomepage' && !componentsAreReady) {
                
                initializeComponents();
                
            }
            
        });
        
    };
    
    // as soon as the user is logged in and the application components have
    // not been initialized (ui, player, ...)
    var initializeComponents = function() {
        
        componentsAreReady = true;
        
        // initialize the left navigation
        LeftNavigationPlugin.initialize();
        
        // initialize the header navigation
        HeaderNavigationPlugin.initialize();
        
    };
    
    return {
        applicationStart: run
    };

});