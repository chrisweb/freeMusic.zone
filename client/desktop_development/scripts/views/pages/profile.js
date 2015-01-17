/**
 * 
 * profile page view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * 
 * @returns {unresolved}
 */
define([
    'templates',
    'chrisweb.utilities',
    'ribs.view'
    
], function (JST, utilities, view) {
    
    'use strict';
    
    var ProfileView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[PROFILE PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/profile'],
        
        // view events
        events: {
            
        }
        
    });
    
    return ProfileView;
    
});