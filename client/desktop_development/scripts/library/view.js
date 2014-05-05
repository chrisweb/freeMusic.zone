define([
    'backbone',
    'utilities',
    'underscore'
], function(Backbone, utilities, _) {

    'use strict';

    var View = Backbone.View.extend({
        
        initialize: function(options) {
            
            this.options = options || {};
            
        },
        render: function() {
            
            // right now backbone creates a default div as el
            // because we dont set all, nor do we use tagName and so on
            // but we want the root element of the template to be the el
            // because all html should be in template not in js code
            // http://stackoverflow.com/questions/11694012/backbone-view-assign-template-to-el
            // http://stackoverflow.com/questions/11594961/backbone-not-this-el-wrapping
            // http://backbonejs.org/#View-setElement
            
            utilities.log('[VIEW] rendering ...');
            
            //console.log('this.template: ', this.template);

            // put the template into the view element
            if (this.model !== undefined) {
                
                console.log('this.getModelAsJson()', this.getModelAsJson());
            
                // model template
                this.$el.html(this.template(this.getModelAsJson()));
            
            } else if (this.collection !== undefined) {
            
                // main collection template
                this.$el.html(this.template());
            
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
            
                this.$el.find('tbody').html(modelViews);
            
            } else {
                
                // view with either collection nor model
                this.$el.html(this.template());
                
            }
            
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