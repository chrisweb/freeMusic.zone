define([
    'jquery',
    'underscore',
    'view',
    'templates',
    'utilities',
    'configuration'
], function ($, _, view, JST, utilities, configurationModule) {
    
    'use strict';
    
    var TracksListView = view.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[TRACKSLIST VIEW] initializing ...', 'blue');
            
            this.options = options || {};
            
            this.listenTo(this.collection, 'add', this.render);
            
            //var $el = $(this.template());
            
            //this.$el.replaceWith($el);
            
            //this.setElement($el);
            
        },

        template: JST['templates/partials/tracksList'],
        
        // view events
        events: {
            
        }
        
    });

    return TracksListView;
    
});