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
 * @param {type} utilities
 * @param {type} Backbone
 * @param {type} _
 * @param {type} $
 * @param {type} Container
 * @returns {unresolved}
 */
define([
    'vendor.chrisweb.utilities',
    'backbone',
    'underscore',
    'jquery',
    'vendor.chrisweb.container'
], function(utilities, Backbone, _, $, Container) {

    'use strict';
    
    var View = Backbone.View.extend({
        
        initialize: function(options) {
            
            utilities.log('[CHRISWEB VIEW] initializing ...');

            this.options = options || {};
            
            // collection children views, usefull when collection view gets
            // destroyed and we want to take some action on sub views
            this.collectionModelViews = {};
            
            // list of reference view by model. Usefull to delete all view
            // reference when a model is remove from the collection
            this.referenceModelView = {};
            
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
            
            if (this.collection !== undefined) {
                
                this.listenTo(this.collection, 'add', this.addModel);
                this.listenTo(this.collection, 'remove', this.removeModel);
                this.listenTo(this.collection, 'reset', this.clear);
                
            }
            
            if (this.model !== undefined) {
                
                this.listenTo(this.model, 'destroy', this.close);
                
            }

            // if oninitialize exists
            if (this.onInitialize) {
                
                // execute it now
                this.onInitialize(options);
                
            }
            
        },
        render: function() {
            
            this.htmlize();

            // if onRender exists
            if (this.onRender) {
                
                // execute it now
                this.onRender();
                
            }

            return this;
            
        },
        htmlize: function() {

            var renderedTemplate;

             // put the template into the view element
            if (this.collection !== undefined) {
            
                // main collection template
                if (this.model !== undefined) {
                    renderedTemplate = this.template(this.getModelAsJson());
                } else {
                    renderedTemplate = this.template();
                }

                // for each model of the collection append a modelView to collection dom
                var that = this;
                
                if (this.collection.models.length > 0) {
                    
                    if (that.options.ModelView !== undefined) {
                
                        var ModelView = that.options.ModelView;
                        
                    } else {
                        
                        throw 'a collection view needs a ModelView passed on instantiation through the options';
                        
                    }
                    
                    var modelViewsAsHtml = [];

                    _.each(this.collection.models, function(model) {

                        var modelView = new ModelView({ model: model, parentView: that });
                        
                        that.collectionModelViews[model.cid] = modelView;
                        
                        var $html = modelView.create();

                        that.referenceModelView[model.cid] = {$html:$html};
                        
                        modelViewsAsHtml.push($html);

                    });

                    var $renderedTemplateCache = $(renderedTemplate);

                    if ($renderedTemplateCache.hasClass('list')) {
                        
                        $renderedTemplateCache.append(modelViewsAsHtml);
                        
                    } else {
                    
                        $renderedTemplateCache.find('.list').append(modelViewsAsHtml);
                        
                    }

                    renderedTemplate = $renderedTemplateCache[0];
                    
                }

            } else if (this.model !== undefined) {

                // model template
                renderedTemplate = this.template(this.getModelAsJson());

            } else {
                
                // view with either collection nor model
                renderedTemplate = this.template();
                
            }

            this.setElement($(renderedTemplate));
            
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

            if (this.collectionModelViews !== null) {
                
                _.each(this.collectionModelViews, function closeModelViews(modelView) {

                    modelView.close();
                    
                });
                
                this.collectionModelViews = {};
                
            }

            // remove the view from dom and stop listening to events that were
            // added with listenTo or that were added to the events declaration
            this.remove();
            
            // unbind events triggered from within views using backbone events
            this.unbind();
            
            if (this.model !== undefined) {
                
                //this.model.destroy();//sure?? you want destroy model server-side because of view close??
                //this.model.trigger('destroy', this.model, this.model.collection, {});
                
            }
            
            if (this.collection !== undefined) {
                
                // TODO: ...
                
            }
            
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

            var modelView = new ModelView({ model: model, parentView: this });

            var $element = modelView.create();

            this.referenceModelView[model.cid] = {$html:$element, container: modelView};

            this.$el.find('.list').append($element);
            
            Container.add(this.options.listId, modelView);
            
            this.collectionModelViews[model.cid] = modelView;
            
        },
        /*clear: function() {
            
            Container.clear(this.options.listId);
            
            this.referenceModelView = {};
            
        },*/
        removeModel: function removeModelFunction(model) {
            
            var view = this.referenceModelView[model.cid];
            
            if (view === undefined) {
                return view;
            }
            
            if (view.container !== undefined) {
                Container.remove(this.options.listId, view.container);
                view.container.close();
                //close ?
            }
            if (view.$html !== undefined) {
                view.$html.remove();
            }
            
            delete this.referenceModelView[model.cid];
            
            delete this.collectionModelViews[model.cid];
            
            return view;
            
        }

    });

    return View;

});