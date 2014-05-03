define([
    'underscore',
    'backbone',
    'jquery',
    'utilities'
], function (Backbone, $, utilities) {

    'use strict';
    
    var initializeRouter = function initializeRouterFunction() {
        
        var applicationRouter = router.start();

        applicationRouter.on('route:renderHomepage', function() {

            utilities.log('[MAIN] homepage', 'blue');

            require(['controllers/homepage'], function(HomepageController) {
                
                utilities.log('[MAIN] homepage controller got loaded', 'blue');
                
                HomepageController.index();
                
            });

        });
        
        applicationRouter.on('route:render404', function() {

            utilities.log('[MAIN] 404', 'blue');

            

        });
        
        Backbone.history.start({
            pushState: true
        });
        
    };
    
    var initializeLayout = function initializeLayoutFunction() {
        
        require(['views/layout'], function(LayoutView) {
            
            // rendering the main layout
            var layoutView = new LayoutView({ el: 'body' });
            
            layoutView.render();
            
            require(['views/components/search'], function(SearchView) {
            
                // put the search field partial into the main section of the layout
                var searchView = new SearchView({ el: 'section#main' });

                searchView.render();
                
            });
            
        });
        
    };

    var run = function runFunction() {
        
        $(function() {
        
            initializeLayout();
            
            initializeRouter();
            
        });
        
    };
    
    return {
        start: run
    };

});