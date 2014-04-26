define([
    'backbone',
    'underscore',
    'utilities'
], function (Backbone, _, utilities) {

    var controller = function controllerFunction(options) {

        this.options = options || {};

        if (_.isFunction(this.initialize)) {
            this.initialize(this.options);
        }

    };
    
    return controller;

});