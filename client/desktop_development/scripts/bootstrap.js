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