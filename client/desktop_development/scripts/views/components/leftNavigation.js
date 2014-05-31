define([
    'jquery',
    'underscore',
    'templates',
    'utilities',
    'view',
    'eventsManager'
], function ($, _, JST, utilities, View, eventsManager) {
    
    'use strict';

    var LeftNavigationView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[LEFT NAVIGATION PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
        },

        template: JST['templates/partials/left_navigation'],
        
        // view events
        events: {
            
        },
        
        onRender: function() {
            
        }
        
    });
    
    return LeftNavigationView;
    
});