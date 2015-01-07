/**
 * 
 * welcome page view
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
    
    var WelcomeView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[WELCOME PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/welcome'],
        
        // view events
        events: {
            
        }
        
    });
    
    return WelcomeView;
    
});