/**
 * 
 * twitter charts page view
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
    
    var TwitterChartsView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[TWITTER CHARTS PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/twitterCharts'],
        
        // view events
        events: {
            
        }
        
    });
    
    return TwitterChartsView;
    
});