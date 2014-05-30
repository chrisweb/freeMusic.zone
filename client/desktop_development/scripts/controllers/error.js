define([
    'jquery',
    'utilities'
], function ($, utilities) {
    
    'use strict';

    var notfoundAction = function notfoundActionFunction() {
        
        utilities.log('[ERROR CONTROLLER] controller: error,  action: notfound', 'fontColor:blue');
            
        require(['views/components/notfound'], function(notfoundView) {

            // put the search field partial into the main section of the layout
            notfoundView.insertInto('section#main');

        });
        
    };

    return {
        notfound: notfoundAction
    };
    
});