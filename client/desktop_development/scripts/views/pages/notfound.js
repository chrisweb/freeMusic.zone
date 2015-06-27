/**
 * 
 * 404 notfound page view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * 
 * @returns {_L12.Anonym$2}
 */
define([
    'templates',
    'chrisweb-utilities',
    'library.view'
    
], function (JST, utilities, view) {
    
    'use strict';
    
    var NotfoundView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[NOTFOUND PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/notfound'],
        
        // view events
        events: {
            
        }
        
    });
    
    return NotfoundView;
    
});