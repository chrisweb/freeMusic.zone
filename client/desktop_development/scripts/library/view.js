/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * base view
 * 
 * @param {type} Backbone
 * @param {type} _
 * @returns {unresolved}
 */
define([
    'backbone',
    'underscore',
    'jquery'
], function(Backbone, _, $) {

    'use strict';
    
    var View = Backbone.View.extend({
        
        initialize: function(options) {

            this.options = options || {};
            
            var renderedTemplate;
            
            if (this.model !== undefined) {
                
                renderedTemplate = this.template(this.getModelAsJson());
                
            } else {
                
                renderedTemplate = this.template();
                
            }

            this.setElement(renderedTemplate);

            if (this.onInitialize) {
                
                // execute it now
                this.onInitialize(options);
                
            }
            
        },
        render: function() {
            
            
            
        },
        htmlize: function() {

            //console.log('this.template: ', this.template);
            
            var renderedTemplate;

            // put the template into the view element
            if (this.model !== undefined) {

                // model template
                renderedTemplate = this.template(this.getModelAsJson());
            
            } else if (this.collection !== undefined) {
            
                // main collection template
                renderedTemplate = this.template();
            
                // for each model of the collection append a modelView to collection dom
                var modelViews = [];

                var that = this;
                
                _.each(this.collection.models, function(value, key) {

                    var ModelView = that.options.ModelView;
                    
                    var modelView = new ModelView({ model: value });
                    
                    modelViews.push(modelView.create());
                    
                });

                $(renderedTemplate).find('tbody').html(modelViews);
            
            } else {
                
                // view with either collection nor model
                renderedTemplate = this.template();
                
            }
            
            return $(renderedTemplate);
            
        },
        getModelAsJson: function() {
            
            var data;
            
            if (this.model) {
                
                data = this.model.toJSON();
                
            } 
            
            return data;
            
        },
        getCollectionAsJson: function() {
            
            var data;
            
            if (this.collection) {
                
                data = this.collection.toJSON();
                
            } 
            
            return data;
            
        },
        close: function() {

            // remove the view from dom and stop listening to events that were
            // added with listenTo or that were added to the events declaration
            this.remove();
            
            // unbind events triggered from within views using backbone events
            this.unbind();
            
            // if there is a onClose function ...
            if (this.onClose) {
                
                // execute it now
                this.onClose();
                
            }

        },
        create: function() {
            
            return this.htmlize();

        },
        update: function() {
            
            var viewHtml = this.htmlize();

            $('body').find('#' + this.$el.attr('id')).replaceWith(viewHtml);
            
        }

    });

    return View;

});