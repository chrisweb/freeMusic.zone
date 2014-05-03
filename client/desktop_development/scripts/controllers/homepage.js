define([
    'jquery',
    'utilities'
], function ($, view, utilities) {
    
    'use strict';

    var indexAction = function indexActionFunction() {
        
        utilities.log('[MAIN] homepage controller index action', 'blue');
            
        require(['views/components/search'], function(searchView) {

            // put the search field partial into the main section of the layout
            searchView.insertIn('section#main');

        });
        
    };

    return {
        index: indexAction
    };
    
});