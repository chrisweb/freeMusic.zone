define([
    'jquery',
    'underscore',
    'templates',
    'utilities',
    'view',
    'eventsManager'
], function ($, _, JST, utilities, View, eventsManager) {
    
    'use strict';

    var HeaderNavigationView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[HEADER NAVIGATION PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
        },

        template: JST['templates/partials/header_navigation'],
        
        // view events
        events: {
            
        },
        
        onRender: function() {
            
        }
        
    });
    
    return HeaderNavigationView;
    
});