/**
 * 
 * games page view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'chrisweb.utilities',
    'configuration',
    'ribs.view'
    
], function (JST, utilities, view) {
    
    'use strict';
    
    var GamesView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[GAMES PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/games'],
        
        // view events
        events: {
            
        }
        
    });
    
    return GamesView;
    
});