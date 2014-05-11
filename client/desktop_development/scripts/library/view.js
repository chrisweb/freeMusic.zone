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
            
            var $renderedTemplate = $(renderedTemplate);
            
            if ($renderedTemplate.length === 1) {
                
                //this.setElement($renderedTemplate.first().html(''));
                
                var rootElement = $renderedTemplate.first().html('');
                
                this.setElement(rootElement);
                
                /*console.log(rootElement);
                console.log(rootElement[0]);
                
                console.log(this.el);
                
                this.el = rootElement;
                
                console.log(this.el);
                
                this.setElement(_.result(this, 'el'), true);*/
                
                /*var attrs = _.extend({}, _.result(this, 'attributes'));
                if (this.id) attrs.id = _.result(this, 'id');
                if (this.className) attrs['class'] = _.result(this, 'className');
                var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
                this.setElement($el, false);*/
                
                /*var rootElement = $renderedTemplate.first().html('');
                
                if (rootElement.attr('id')) this.id = rootElement.attr('id');
                if (rootElement.attr('class')) this.className = rootElement.attr('class');
                if (rootElement.prop('tagName')) this.tagName = rootElement.prop('tagName');
                if (rootElement[0].attributes) this.attributes = rootElement[0].attributes;*/
                
                //console.log(this.id);
                //console.log(this.className);
                //console.log(this.tagName);
                //console.log(this.attributes);
                
                //var $el = $('<' + this.tagName + '>').attr(this.attributes);
                
                //this.setElement(this.$el, true);
                
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

        }
        /*,
        update: function() {
            
            var viewHtml = this.htmlize();

            $('body').find('#' + this.$el.attr('id')).replaceWith(viewHtml);
            
        }*/

    });

    return View;

});