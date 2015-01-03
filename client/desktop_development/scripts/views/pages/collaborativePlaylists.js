/**
 * 
 * collaborative playlists page view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} Backbone
 * @param {type} JST
 * @param {type} utilities
 * @param {type} configurationModule
 * @param {type} view
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
], function ($, _, Backbone, JST, utilities, configurationModule, view) {
    
    'use strict';
    
    var TwitterChartsView = view.extend({
        
        onInitialize: function() {
            
            utilities.log('[COLLABORATIVE PLAYLISTS PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/collaborativePlaylists'],
        
        // view events
        events: {
            
        }
        
    });
    
    return TwitterChartsView;
    
});