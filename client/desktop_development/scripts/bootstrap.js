/**
 * 
 * application bootstrap
 * 
 * @param {type} _
 * @param {type} Backbone
 * @param {type} $
 * @param {type} utilities
 * @param {type} configuration
 * @param {type} router
 * @param {type} container
 * @param {type} layout
 * @param {type} eventsManager
 * @param {type} Player
 * @param {type} TracksCacheManager
 * @param {type} HeaderNavigation
 * @param {type} LeftNavigation
 * @returns {_L18.Anonym$5}
 */
define([
    'underscore',
    'backbone',
    'jquery',
    'library.utilities',
    'configuration',
    'library.router',
    'library.container',
    'layout',
    'library.eventsManager',
    'library.player.core',
    'library.tracksCache',
    'library.plugin.headerNavigation',
    'library.plugin.leftNavigation'
], function (_, Backbone, $, utilities, configuration, router, container, layout, eventsManager, Player, TracksCacheManager, HeaderNavigation, LeftNavigation) {

    'use strict';
    
    // TODO: all of these initializers could be put into "plugins"
    
    var initializeApplication = function initializeApplicationFunction() {
        
        utilities.log('[BOOTSTRAP] initializeApplication', 'fontColor:blue');
        
        // TODO: modernizr checks
        
    };
    
    var initializeRouter = function initializeRouterFunction() {
        
        utilities.log('[BOOTSTRAP] initializeRouter', 'fontColor:blue');
        
        var applicationRouter = router.start();

        applicationRouter.on('route:renderHomepage', function() {
            
            require(['controllers/homepage'], function(HomepageController) {
                
                var homepageController = new HomepageController();
                
                homepageController.indexAction();
                
            });

        });
        
        applicationRouter.on('route:controllerActionDispatcher', function(controllerName, actionName) {
            
            // if the action is not defined use the default value from
            // configuration
            if ($.type(actionName) === 'undefined') {
                
                actionName = configuration.client.defaults.action;
                
            }
            
            // filter symbols of action and controller name
            // remove everything that is not alpha numeric
            controllerName.replace(/[^a-zA-Z0-9]/g, '');
            actionName.replace(/[^a-zA-Z0-9]/g, '');
            
            // load the controller and call the action
            require(['controllers/' + controllerName], function(controller) {
                
                controller[actionName]();
                
            });

        });
        
        applicationRouter.on('route:render404', function() {

            require(['controllers/error'], function(ErrorController) {
                
                ErrorController.notfound();
                
            });

        });
        
        Backbone.history.start({
            pushState: true
        });
        
    };
    
    var initializeLayout = function initializeLayoutFunction() {
        
        utilities.log('[BOOTSTRAP] initializeLayout', 'fontColor:blue');

        layout.create();
        
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

        $(function() {
            
            initializeApplication();
        
            initializeLayout();
            
            initializeRouter();
            
            // TODO: initialize these onLogin:
            //initializePlayer();
            
            //initializeTracksCacheManager();
            
            //initializeHeaderNavigation();
            
            //initializeLeftNavigation();

            eventsManager.trigger('application:loaded');
            
        });
        
    };
    
    return {
        applicationStart: run
    };

});