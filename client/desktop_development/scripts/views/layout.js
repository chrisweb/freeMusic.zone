define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utilities'
], function ($, _, Backbone, JST, utilities) {
    
    'use strict';
    
    var LayoutView = Backbone.View.extend({
        
        initialize: function() {
            
            utilities.log('[LAYOUT VIEW] initializing ...', 'blue');
            
        },
        
        template: JST['templates/layout'],
        
        // view events
        events: {

        },

        // render
        render: function() {

            // put the layout template into the body tag
            this.$el.html(this.template);
            
            // TODO: initialize the subviews (header/aside/navigation/footer)

            // enables chainability
            return this;

        }
        
    });

    return LayoutView;
    
});