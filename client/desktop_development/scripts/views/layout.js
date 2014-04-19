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
