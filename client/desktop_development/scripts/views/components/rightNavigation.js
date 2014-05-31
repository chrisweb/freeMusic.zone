define([
    'jquery',
    'underscore',
    'templates',
    'utilities',
    'view',
    'eventsManager'
], function ($, _, JST, utilities, View, eventsManager) {
    
    'use strict';

    var RightNavigationView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[RIGHT NAVIGATION PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
        },

        template: JST['templates/partials/right_navigation'],
        
        // view events
        events: {
            
        },
        
        onRender: function() {
            
        }
        
    });
    
    return RightNavigationView;
    
});