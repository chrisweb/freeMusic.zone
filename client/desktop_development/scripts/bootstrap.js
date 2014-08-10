/**
 * 
 * application bootstrap
 * 
 * @param {type} _
 * @param {type} Backbone
 * @param {type} $
 * @param {type} utilities
 * @param {type} configuration
 * @param {type} Router
 * @param {type} container
 * @param {type} eventsManager
 * @param {type} Player
 * @param {type} TracksCacheManager
 * @param {type} HeaderNavigation
 * @param {type} LeftNavigation
 * @param {type} user
 * @returns {_L19.Anonym$5}
 */
define([
    'underscore',
    'backbone',
    'jquery',
    'chrisweb.utilities',
    'configuration',
    'ribs.router',
    'ribs.container',
    'ribs.eventsManager',
    'library.player.core',
    'library.tracksCache',
    'library.plugin.headerNavigation',
    'library.plugin.leftNavigation',
    'library.user'
], function (_, Backbone, $, utilities, configuration, Router, container, eventsManager, Player, TracksCacheManager, HeaderNavigation, LeftNavigation, user) {

    'use strict';
    
    // TODO: all of these initializers could be put into "plugins"
    
    var initializeApplication = function initializeApplicationFunction() {
        
        utilities.log('[BOOTSTRAP] initializeApplication', 'fontColor:blue');
        
        // TODO: modernizr checks
        
    };
    
    var initializeRouter = function initializeRouterFunction() {
        
        utilities.log('[BOOTSTRAP] initializeRouter', 'fontColor:blue');
        
        var router = Router.start();

        router.on('route:renderHomepage', function() {
            
            var options = {};
            
            require(['controllers/homepage'], function(HomepageController) {
                
                var homepageController = new HomepageController(options, configuration, router);
                
                homepageController.indexAction();
                
            });

        });
        
        router.on('route:controllerActionDispatcher', function(controllerName, actionName) {
            
            //utilities.log('route:controllerActionDispatcher, controller: ' + controllerName + ', action: ' + actionName);
            
            // if the action is not defined use the default value from
            // configuration
            if ($.type(actionName) === 'undefined') {
                
                actionName = configuration.client.defaults.action;
                
            }
            
            // filter symbols of action and controller name
            // remove everything that is not alpha numeric
            controllerName.replace(/[^a-zA-Z0-9]/g, '');
            actionName.replace(/[^a-zA-Z0-9]/g, '');
            
            var options = {};

            // load the controller and call the action
            require(['controllers/' + controllerName], function(Controller) {
                
                var controller = new Controller(options, configuration, router);

                controller[actionName + 'Action']();
                
            });

        });
        
        router.on('route:render404', function() {

            require(['controllers/error'], function(ErrorController) {
                
                ErrorController.notfoundAction();
                
            });

        });
        
        Backbone.history.start({
            pushState: true
        });
        
        return router;
        
    };
    
    var initializePlayer = function initializePlayerFunction() {
        
        utilities.log('[BOOTSTRAP] initializePlayer', 'fontColor:blue');

        Player.start();
        
    };
    
    var initializeTracksCacheManager = function initializeTracksCacheManagerFunction() {
        
        utilities.log('[BOOTSTRAP] initializeTracksCacheManager', 'fontColor:blue');

        TracksCacheManager.start();
        
    };
    
    var initializeUser = function initializeUserFunction() {
        
        utilities.log('[BOOTSTRAP] initializeUser', 'fontColor:blue');
        
        // fetch user data from server
        user.fetchUserData();
        
        var isLogged = user.getAttribute('isLogged');
        
        utilities.log('isLogged: ', isLogged);
        
        eventsManager.on('router:preRoute', function bootstrapPreRoute(parameters) {
            
            utilities.log(parameters);
            
        });
        
        // the oauth iframe will call this from within the iframe on successfull
        // connection
        window.connected = function() {

            utilities.log('oauth connected');

            eventsManager.trigger('oauth:connected');

        };
        
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

        // pre dom load


        // on dom load
        $(function() {
            
                    // initialize user before router as pre-route event triggers
        // a check to verify if user is logged in
        initializeUser();

        initializeRouter();
            
            initializeApplication();

            eventsManager.trigger('application:loaded');
            
        });
        
        // on user connected
        eventsManager.on('oauth:connected', function bootstrapOauthConnected() {
            
            initializePlayer();
            
            initializeTracksCacheManager();
            
            initializeHeaderNavigation();
            
            initializeLeftNavigation();
            
        });
        
    };
    
    return {
        applicationStart: run
    };

});