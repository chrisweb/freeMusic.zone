define([
    'backbone',
    'underscore',
    'utilities',
    'templates'
], function (Backbone, _, utilities, JST) {
    
    'use strict';
    
    var layoutTemplate;
    
    var containers = {};

    var Layout = Backbone.View.extend({
        
        el: 'body',
        initialize: function() {
            
            utilities.log('[PAGE LAYOUT] initializing ...', 'blue');
            
        },
        
        template: JST['templates/layout'],
        
        // view events
        events: {

        },

        // render
        render: function() {

            // put the layout template into the body tag
            this.$el.html(this.template);
            
            // enables chainability
            return this;

        }
        
    });
    
    var start = function startFunction() {
        
        utilities.log('[PAGE] start', 'blue');
        
        var layout = new Layout();
        
        layoutTemplate = layout.render();
        
        _.each(layoutTemplate.$el.children(), function(value, key) {
            
            var elementId = $(value).attr('id');
            
            if (elementId === undefined) {
                
                elementId = $(value).prop('tagName').toLowerCase();
                
                $(value).attr('id', elementId);
                
            }
            
            containers[elementId] = [];
            
        });
        
    };
    
    var append = function appendFunction(view, containerId) {
        
        containers[containerId].push(view);
        
        layoutTemplate.$el.find('#' + containerId).append(view.create());
        
    };

    return {
        start: start,
        append: append
    };
    
});