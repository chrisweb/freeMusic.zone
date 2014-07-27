/**
 * 
 * welcome view
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
    'library.utilities',
    'configuration',
    'library.view'
], function ($, _, Backbone, JST, utilities, configurationModule, view) {
    
    'use strict';
    
    var WelcomeView = view.extend({
        
        onInitialize: function() {
            
            utilities.log('[WELCOME PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/partials/welcome'],
        
        // view events
        events: {
            
        }
        
    });
    
    return WelcomeView;
    
});