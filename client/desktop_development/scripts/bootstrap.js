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
 * @param {type} modernizr
 * @returns {_L19.Anonym$6}
 */
define([
    'underscore',
    'backbone',
    'jquery',
    'chrisweb.utilities',
    'configuration',
    'library.router',
    'ribs.container',
    'ribs.eventsManager',
    'library.player.core',
    'library.tracksCache',
    'library.plugin.headerNavigation',
    'library.plugin.leftNavigation',
    'library.user',
    'Modernizr'
], function (
    _,
    Backbone,
    $,
    utilities,
    configuration,
    Router,
    container,
    eventsManager,
    Player,
    TracksCacheManager,
    HeaderNavigation,
    LeftNavigation,
    user,
    modernizr
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
    
    var initializeRouter = function initializeRouterFunction() {
        
        utilities.log('[BOOTSTRAP] initializeRouter', 'fontColor:blue');
        
        var router = Router.getRrouter();

        router.on('route:renderHomepage', function() {
            
            var options = {};
            
            require(['controllers/homepage'], function(HomepageController) {
                
                var homepageController = new HomepageController(options, configuration, router);
                
                homepageController.indexAction();
                
            });

        });
        
        router.on('route:controllerActionDispatcher', function(controllerName, actionName) {
            
            utilities.log('route:controllerActionDispatcher, controller: ' + controllerName + ', action: ' + actionName);
            
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
        
        // event triggered before a route
        eventsManager.on('router:preRoute', function bootstrapPreRoute(parameters) {
            
            utilities.log(parameters);
            
        });
        
        Backbone.history.start({
            pushState: true
        });
        
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
        
        // the oauth page that is in the iframe will trigger the "connected"
        // event from within the iframe on successfull oauth connection, we
        // listen for that event and trigger an app event to inform the app
        // that the oauth process has come to an end
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

        // on dom load
        $(function() {
            
            // initialize user before router as pre-route event triggers
            // a check to verify if user is logged in
            initializeUser();

            initializeRouter();
            
            initializeApplication();

            eventsManager.trigger('application:loaded');
            
        });
        
        // on user connected with oauth, as soon as the user is connected
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
            
            var router = Router.getRrouter();
            
            // navigate to the welcome page
            router.navigate('desktop/homepage/welcome', {trigger: true});
            
        });
        
    };
    
    return {
        applicationStart: run
    };

});