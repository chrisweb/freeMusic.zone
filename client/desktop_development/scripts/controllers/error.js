/**
 * 
 * error controller
 * 
 * @param {type} $
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} Ribs
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'chrisweb-utilities',
    'library.controller',
    'ribsjs'
    
], function ($, utilities, Controller, Ribs) {
    
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

                Ribs.Container.clear('#core');

                var notfoundView = new NotfoundView();

                Ribs.Container.add('#core', notfoundView);
                
                Ribs.Container.dispatch('#core');

            });

        }
        
    });

    return ErrorController;
    
});