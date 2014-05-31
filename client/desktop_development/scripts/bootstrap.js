define([
    'underscore',
    'backbone',
    'jquery',
    'utilities',
    'router',
    'container',
    'layout',
    'eventsManager',
    'player.core',
    'tracksCache',
    'navigationBar'
], function (_, Backbone, $, utilities, router, container, layout, eventsManager, Player, TracksCacheManager, NavigationBar) {

    'use strict';
    
    // TODO: all of these initializers could be put into "plugins"
    
    var initializeRouter = function initializeRouterFunction() {
        
        utilities.log('[BOOTSTRAP] initializeRouter', 'fontColor:blue');
        
        var applicationRouter = router.start();

        applicationRouter.on('route:renderHomepage', function() {
            
            require(['controllers/homepage'], function(HomepageController) {
                
                HomepageController.index();
                
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
    
    var initializeNavigationBar = function initializeNavigationBarFunction() {
        
        utilities.log('[BOOTSTRAP] initializeNavigationBar', 'fontColor:blue');
        
        NavigationBar.start();
        
    };
    
    var run = function runFunction() {

        $(function() {
        
            initializeLayout();
            
            initializeRouter();
            
            initializePlayer();
            
            initializeTracksCacheManager();
            
            initializeNavigationBar();

            eventsManager.trigger('application:loaded');
            
        });
        
    };
    
    return {
        applicationStart: run
    };

});