define([
    'backbone',
    'utilities'
], function (Backbone, utilities) {
    
    'use strict';

    var indexAction = function indexActionFunction() {
        
        utilities.log('[MAIN] homepage controller index action', 'blue');
        
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

    return {
        index: indexAction
    };
    
});