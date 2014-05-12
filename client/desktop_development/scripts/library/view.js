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
    'jquery',
    'container'
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
                
                //this.setElement($renderedTemplate.first().html(''));
                
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

            console.log('HTMLIZE');

            //console.log('this.template: ', this.template);
            
            var renderedTemplate;

            // put the template into the view element
            if (this.model !== undefined) {

                // model template
                renderedTemplate = this.template(this.getModelAsJson());
            
            } else if (this.collection !== undefined) {
            
                // main collection template
                renderedTemplate = this.template();
                
                //console.log(renderedTemplate);
            
                // for each model of the collection append a modelView to collection dom
                var modelViews = [];

                var that = this;
                
                if (this.collection.models.length > 0) {
                
                    var ModelView = that.options.ModelView;

                    _.each(this.collection.models, function(value, key) {
                        
                        //console.log(value);

                        var modelView = new ModelView({ model: value });
                        
                        //console.log(modelView);

                        modelViews.push(modelView.create());

                    });

                    //console.log(modelViews);
                    
                    //console.log($(renderedTemplate).find('.list'));
                    
                    var renderedTemplateCache = $(renderedTemplate);

                    var result = renderedTemplateCache.find('.list').html(modelViews);
                    
                    //console.log(renderedTemplate);
                    //console.log(result[0]);
                    
                    // result2 = $(renderedTemplate).find('.list').replaceWith(result);
                    
                    //console.log(result2[0]);
                    
                    renderedTemplate = renderedTemplateCache[0];
                    
                }
                
                //console.log(renderedTemplate);
            
            } else {
                
                // view with either collection nor model
                renderedTemplate = this.template();
                
            }
            
            var renderedTemplateHtmlWithoutRoot = $(renderedTemplate).first().html();
            
            //return $(renderedTemplateHtmlWithoutRoot);
            
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
            
            Container.add(this.options.containerId, modelView);
            
        },
        clear: function() {
            
            Container.clear(this.options.containerId);
            
        }

    });

    return View;

});