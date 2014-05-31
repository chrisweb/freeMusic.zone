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
    'headerNavigation',
    'rightNavigation'
], function (_, Backbone, $, utilities, router, container, layout, eventsManager, Player, TracksCacheManager, HeaderNavigation, RightNavigation) {

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
    
    var initializeHeaderNavigation = function initializeHeaderNavigationFunction() {
        
        utilities.log('[BOOTSTRAP] initializeHeaderNavigation', 'fontColor:blue');
        
        HeaderNavigation.start();
        
    };
    
    var initializeRightNavigation = function initializeRightNavigationFunction() {
        
        utilities.log('[BOOTSTRAP] initializeRightNavigation', 'fontColor:blue');
        
        RightNavigation.start();
        
    };
    
    var run = function runFunction() {

        $(function() {
        
            initializeLayout();
            
            initializeRouter();
            
            initializePlayer();
            
            initializeTracksCacheManager();
            
            initializeHeaderNavigation();
            
            initializeRightNavigation();

            eventsManager.trigger('application:loaded');
            
        });
        
    };
    
    return {
        applicationStart: run
    };

});