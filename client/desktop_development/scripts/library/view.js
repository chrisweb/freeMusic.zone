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
    'underscore'
], function(Backbone, _) {

    'use strict';
    
    var View = Backbone.View.extend({
        
        initialize: function(options) {
            
            console.log('%%%%%%%%%%%%initialize chrisweb view');
            
            this.options = options || {};
            
        },
        render: function() {

            //console.log('this.template: ', this.template);
            
            var renderedTemplate;

            // put the template into the view element
            if (this.model !== undefined) {
                
                console.log('this.getModelAsJson()', this.getModelAsJson());
            
                // model template
                renderedTemplate = this.template(this.getModelAsJson());
            
            } else if (this.collection !== undefined) {
            
                // main collection template
                renderedTemplate = this.template();
            
                // for each model of the collection append a modelView to collection dom
                var modelViews = [];
                
                //console.log('this.getCollectionAsJson()', this.getCollectionAsJson());
                console.log('this.collection.models: ', this.collection.models);
                
                var that = this;
                
                _.each(this.collection.models, function(value, key) {
                    
                    console.log('value', value);
                    console.log('this.options.ModelView', that.options.ModelView);
                    
                    var ModelView = that.options.ModelView;
                    
                    var modelView = new ModelView({ model: value });
                    
                    modelViews.push(modelView.create());
                    
                });
                
                console.log('modelViews: ', modelViews);
                console.log('this.$el.find(\'tbody\'): ', this.$el.find('tbody'));
                
                $('renderedTemplate').find('tbody').html(modelViews);
            
            } else {
                
                // view with either collection nor model
                renderedTemplate = this.template();
                
            }
            
            // this will replace the default div by the template root element
            // and move all the events attached
            // http://backbonejs.org/#View-setElement
            //this.$el.html(renderedTemplate);
            this.setElement(renderedTemplate);
            
            // if there is a onRender function ...
            if (this.onRender) {
                
                // execute it now
                this.onRender();
                
            }
            
            // enables chainability
            return this;
            
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
            
            return this.render().el;
            
        }

    });

    return View;

});