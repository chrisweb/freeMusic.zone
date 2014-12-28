/**
 * 
 * error controller
 * 
 * @param {type} $
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'chrisweb.utilities',
    'library.controller',
    'ribs.container'
    
], function ($, utilities, Controller, container) {
    
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

            require(['views/pages/notfound'], function(NotfoundView) {

                container.clear('#core');

                var notfoundView = new NotfoundView();

                container.add('#left', notfoundView);
                
                container.dispatch('#left');

            });

        }
        
    });

    return ErrorController;
    
});