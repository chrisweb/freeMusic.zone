define([
    'underscore',
    'backbone',
    'jquery',
    'utilities',
    'router',
    'page'
], function (_, Backbone, $, utilities, router, page) {

    'use strict';
    
    var initializeRouter = function initializeRouterFunction() {
        
        utilities.log('[BOOTSTRAP] initializeRouter', 'blue');
        
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
        
        utilities.log('[BOOTSTRAP] initializeLayout', 'blue');

        page.start();
        
    };

    var run = function runFunction() {
        
        $(function() {
        
            initializeLayout();
            
            initializeRouter();
            
        });
        
    };
    
    return {
        applicationStart: run
    };

});