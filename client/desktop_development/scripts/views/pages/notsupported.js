/**
 * 
 * not supported feature page view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * 
 * @returns {_L12.Anonym$2}
 */
define([
    'templates',
    'chrisweb.utilities',
    'ribs.view'
    
], function (JST, utilities, view) {
    
    'use strict';
    
    var NotSupportedView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[NOT SUPPORTED PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/notsupported'],
        
        // view events
        events: {
            
        }
        
    });
    
    return NotSupportedView;
    
});