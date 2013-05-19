
define('application', ['configuration', 'utilities', 'routes', 'backbone'], function(configurationModule, utilities, routes, Backbone) {

    'use strict';
    
    var configuration = configurationModule.get();
    
    var launchApplication = function() {
        
        utilities.log('[APPLICATION] initialization...', 'blue');
        
        var applicationRoutes = new routes();

        applicationRoutes.on('route:renderHomepage', function() {
            
            utilities.log('[APPLICATION] load homepage/home view', 'blue');
            
            require(['viewsPath/homepage/home'], function(homepageView) {
                
                var homepageViewModule = new homepageView();
                
                homepageViewModule.render();
                
            });
            
        });

        applicationRoutes.on('renderPaylistsList', function() {
           
           utilities.log('[APPLICATION] load renderPaylistsList view', 'blue');
           
        });

        applicationRoutes.on('renderPlaylistDetail', function() {
           
           utilities.log('[APPLICATION] load renderPlaylistDetail view', 'blue');
           
        });

        applicationRoutes.on('render404', function() {
            
            // default route if none of the previous ones matched
            utilities.log('[APPLICATION] page not found', 'blue');
            
        });
        
        Backbone.history.start({
            pushState: true,
            root: '/'
        });

    };

    /**
     * 
     */
    return {
        dispatch: launchApplication
    };
    
});