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
 * @param {type} $
 * @param {type} Container
 * @returns {unresolved}
 */
define([
    'backbone',
    'underscore',
    'jquery',
    'library.container'
], function(Backbone, _, $, Container) {

    'use strict';
    
    var View = Backbone.View.extend({
        
        initialize: function(options) {
            
            console.log('[CHRISWEB VIEW] initializing ...');

            this.options = options || {};
            
            var renderedTemplate;
            
            if (this.model !== undefined) {

                renderedTemplate = this.template(this.getModelAsJson());
                
            } else {
                
                renderedTemplate = this.template();
                
            }
            
            var $renderedTemplate = $(renderedTemplate);
            
            if ($renderedTemplate.length === 1) {

                var rootElement = $renderedTemplate.first().html('');

                this.setElement(rootElement);
                
            } else {
                
                throw 'view can not set element of template with more or less then one root element';
                
            }

            // if oninitialize exists
            if (this.onInitialize) {
                
                // execute it now
                this.onInitialize(options);
                
            }
            
        },
        render: function() {
            
            this.$el.html(this.htmlize());
            
            return this;
            
        },
        htmlize: function() {

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
                
                if (this.collection.models.length > 0) {
                
                    var ModelView = that.options.ModelView;

                    _.each(this.collection.models, function(value) {

                        var modelView = new ModelView({ model: value });

                        modelViews.push(modelView.create());

                    });

                    var renderedTemplateCache = $(renderedTemplate);

                    renderedTemplateCache.find('.list').html(modelViews);

                    renderedTemplate = renderedTemplateCache[0];
                    
                }

            } else {
                
                // view with either collection nor model
                renderedTemplate = this.template();
                
            }
            
            var renderedTemplateHtmlWithoutRoot = $(renderedTemplate).first().html();

            this.$el.html(renderedTemplateHtmlWithoutRoot);
            
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

            return this.render().$el;

        },
        addModel: function(model) {
            
            var ModelView = this.options.ModelView;

            var modelView = new ModelView({ model: model });

            this.$el.find('.list').append(modelView.create());
            
            Container.add(this.options.listId, modelView);
            
        },
        clear: function() {
            
            Container.clear(this.options.listId);
            
        }

    });

    return View;

});