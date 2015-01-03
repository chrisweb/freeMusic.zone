/**
 * 
 * 404 notfound page view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} Backbone
 * @param {type} JST
 * @param {type} utilities
 * @param {type} configurationModule
 * @param {type} view
 * @returns {_L12.Anonym$2}
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'chrisweb.utilities',
    'configuration',
    'ribs.view'
], function ($, _, Backbone, JST, utilities, configurationModule, view) {
    
    'use strict';
    
    var NotfoundView = view.extend({
        
        onInitialize: function() {
            
            utilities.log('[NOTFOUND PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/notfound'],
        
        // view events
        events: {
            
        }
        
    });
    
    return NotfoundView;
    
});