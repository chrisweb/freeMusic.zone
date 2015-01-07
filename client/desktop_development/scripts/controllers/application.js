/**
 * 
 * application controller
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

                container.clear('#core');

                var settingsView = new SettingsView();

                container.add('#core', settingsView);
                
                container.dispatch('#core');

            });

        }
        
    });

    return ApplicationController;
    
});