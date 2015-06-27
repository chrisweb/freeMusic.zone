/**
 * 
 * settings page view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * 
 * @returns {unresolved}
 */
define([
    'templates',
    'chrisweb-utilities',
    'configuration',
    'library.view'
    
], function (JST, utilities, view) {
    
    'use strict';
    
    var SettingsView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[SETTINGS PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/settings'],
        
        // view events
        events: {
            
        }
        
    });
    
    return SettingsView;
    
});