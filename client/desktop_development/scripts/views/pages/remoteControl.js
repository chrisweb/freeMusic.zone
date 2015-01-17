/**
 * 
 * remote control page view
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
    
    var RemoteControlView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[REMOTE CONTROL PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/remoteControl'],
        
        // view events
        events: {
            
        }
        
    });
    
    return RemoteControlView;
    
});