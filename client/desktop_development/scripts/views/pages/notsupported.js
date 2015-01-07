/**
 * 
 * not supported feature page view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * 
 * @returns {_L12.Anonym$2}
 */
define([
    'jquery',
    'underscore',
    'templates',
    'chrisweb.utilities',
    'ribs.view'
], function ($, _, JST, utilities, view) {
    
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