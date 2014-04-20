define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';
    
    // https://github.com/gruntjs/grunt-contrib-jst
    // http://robdodson.me/blog/2012/05/30/using-jquery-deferred-to-load-an-underscore-template/
    // http://ricostacruz.com/backbone-patterns/#jst_templates

    var ApplicationView = Backbone.View.extend({
        template: JST['app/scripts/templates/application.ejs']
    });

    return ApplicationView;
});


/*
// IndexView.js

define(["jquery", "backbone", "models/mvc_set/mvc_setModel", "text!templates/mvc_set/mvc_set.html"],

    function($, Backbone, Model, template){

        var mvc_setView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".magic",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return mvc_setView;

    }

);
*/