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
            
            _.bindAll(this, 'addModel');
            
            this.listenTo(this.collection, 'add', this.addModel);
            
            this.listenTo(this.collection, 'reset', this.clear);
            
            //var $el = $(this.template());
            
            //this.$el.replaceWith($el);
            
            //this.setElement($el);
            
        },

        template: JST['templates/partials/tracksList'],
        
        containerId: 'trackSearchResults',
        
        // view events
        events: {
            
        }
        
    });

    return TracksListView;
    
});