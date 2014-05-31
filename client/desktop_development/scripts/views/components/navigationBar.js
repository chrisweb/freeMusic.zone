define([
    'jquery',
    'underscore',
    'templates',
    'utilities',
    'view',
    'eventsManager'
], function ($, _, JST, utilities, View, eventsManager) {
    
    'use strict';

    var NavigationBarView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[NAVIGATION PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
        },

        template: JST['templates/partials/navigation'],
        
        // view events
        events: {
            
        },
        
        onRender: function() {
            
        }
        
    });
    
    return NavigationBarView;
    
});