/**
 * 
 * application controller
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
    
    var ApplicationController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[APPLICATION CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        settingsAction: function settingsActionFunction() {
        
            utilities.log('[APPLICATION CONTROLLER] controller: application,  action: settings', 'fontColor:blue');

            require(['views/pages/settings'], function(SettingsView) {

                Ribs.Container.clear('#core');

                var settingsView = new SettingsView();

                Ribs.Container.add('#core', settingsView);
                
                Ribs.Container.dispatch('#core');

            });

        }
        
    });

    return ApplicationController;
    
});