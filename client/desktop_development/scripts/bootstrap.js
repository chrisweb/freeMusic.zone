/**
 * 
 * application bootstrap
 * 
 * @param {type} utilities
 * @param {type} SplashScreenPlugin
 * @param {type} RouterPlugin
 * @param {type} LeftNavigationPlugin
 * @param {type} HeaderNavigationPlugin
 * @param {type} EventsLibrary
 * @param {type} Ribs
 * @param {type} TracksManager
 * @param {type} PlaylistsManager
 * @param {type} PlayerPlugin
 * 
 * @returns {_L19.Anonym$6}
 */
define([
    'chrisweb-utilities',
    'library.plugin.splashScreen',
    'library.plugin.router',
    'library.plugin.leftNavigation',
    'library.plugin.headerNavigation',
    'library.events',
    'ribsjs',
    'manager.tracks',
    'manager.playlists',
    'manager.collaborativePlaylists',
    'library.plugin.player',
    
    'library.jquery.plugin.hasAttr' // adds a new hasAttr function to $ (jquery)
], function (
    utilities,
    splashScreenPlugin,
    routerPlugin,
    leftNavigationPlugin,
    headerNavigationPlugin,
    eventsLibrary,
    Ribs,
    tracksManager,
    playlistsManager,
    collaborativePlaylistsManager,
    playerPlugin
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
        splashScreenPlugin.initialize();
        
        // then we initialize the router plugin
        // the router plugin will intialize the router
        routerPlugin.initialize(function(error, unsupported) {
            
            if (error) {

                utilities.log(error, 'fontColor:red');
                
                require(['views/pages/notsupported'], function(NotSupportedView) {
                    
                    var notSupportedView = new NotSupportedView({
                        templateVariables: {
                            feature: unsupported.feature
                        }
                    });
                    
                    Ribs.Container.clear('#core');
                    
                    Ribs.Container.add('#core', notSupportedView);
                    
                    Ribs.Container.dispatch('#core');
                    
                });
                
            }
            
        });
        
        // on dom load
        $(function() {
            
            utilities.log('dom finished loading...');
            
            eventsLibrary.trigger(eventsLibrary.constants.DOM_LOADED);
            
        });
        
        // on event "post route" and the UI does not already exist
        eventsLibrary.on(eventsLibrary.constants.ROUTER_POSTROUTE, function(attributes) {
            
            if (attributes.routeName !== 'renderHomepage') {
                
                if (!componentsAreReady) {
                    
                    initializeComponents();
                    
                }
                
            }
            
        });
        
    };
    
    /**
     * 
     * as soon as the user is logged in and the application components have
     * not been initialized (ui, player, ...)
     * 
     * @returns {undefined}
     */
    var initializeComponents = function initializeComponentsFunction() {
        
        componentsAreReady = true;
        
        var $body = $('body');
        
        // remove the style attribute from the body tag that got added by
        // skrollr
        if ($body.hasAttr('style')) {
            
            $body.removeAttr('style');
            
        }
        
        // initialize the left navigation plugin
        leftNavigationPlugin.initialize();
        
        // initialize the header navigation plugin
        headerNavigationPlugin.initialize();
        
        // initialize the tracks manager
        tracksManager.initialize();
        
        // initialize the playlists manager
        playlistsManager.initialize();
        
        // initialize the collaborative playlists manager
        collaborativePlaylistsManager.initialize();
        
        // initialize the player plugin
        playerPlugin.initialize();
        
    };
    
    return {
        applicationStart: run
    };

});