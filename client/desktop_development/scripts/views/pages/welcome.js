/**
 * 
 * welcome page view
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
    'library.view'
    
], function (JST, utilities, view) {
    
    'use strict';
    
    var WelcomeView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[WELCOME PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/welcome'],
        
        // view events
        events: {
            
        }
        
    });
    
    return WelcomeView;
    
});