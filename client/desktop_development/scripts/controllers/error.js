/**
 * 
 * error controller
 * 
 * @param {type} $
 * @param {type} utilities
 * @param {type} Controller
 * @returns {unresolved}
 */
define([
    'jquery',
    'library.utilities',
    'library.controller'
], function ($, utilities, Controller) {
    
    'use strict';
    
    var ErrorController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[ERROR CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        notfoundAction: function notfoundActionFunction() {
        
            utilities.log('[ERROR CONTROLLER] controller: error,  action: notfound', 'fontColor:blue');

            require(['views/components/notfound'], function(notfoundView) {

                // put the search field partial into the main section of the layout
                notfoundView.insertInto('section#main');

            });

        }
        
    });

    return ErrorController;
    
});