/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * layout
 * 
 * @param {type} Backbone
 * @param {type} _
 * @param {type} JST
 * @returns {_L8.Anonym$3}
 */
define([
    'backbone',
    'underscore',
    'templates'
], function (Backbone, _, JST) {
    
    'use strict';
    
    var layoutTemplate;
    
    var containers = {};

    var Layout = Backbone.View.extend({
        
        el: 'body',
        initialize: function() {
            
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
    
    var create = function createFunction() {

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
        
        return containers;
        
    };

    return {
        create: create
    };
    
});