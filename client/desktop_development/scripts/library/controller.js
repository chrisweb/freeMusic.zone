/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * chrisweb controller
 * 
 * @param {type} _
 * @param {type} Backbone
 * @param {type} utilities
 * @param {type} container
 * @returns {_L17.chrisweb.Controller|chrisweb.Controller}
 */
define([
    'underscore',
    'backbone',
    'utilities',
    'container'
], function (_, Backbone, utilities, container) {
    
    'use strict';
    
    var chrisweb = {};

    chrisweb.Controller = function ControllerFunction() {

        this.initialize.apply(this, arguments);

    };

    _.extend(chrisweb.Controller.prototype, Backbone.Events, {

        initialize: function controllerInitializeFunction(options) {

            utilities.log('[CHRISWEB CONTROLLER] initializing ...', 'fontColor:blue');

            this.options = options || {};

            // if oninitialize exists
            if (this.onInitialize) {

                // execute it now
                this.onInitialize(this.options);

            }

        },
        dispatch: function controllerDispatchFunction(containerId) {

            container.dispatch(containerId);

        }

    });
    
    chrisweb.Controller.extend = Backbone.Model.extend;
    
    return chrisweb.Controller;

});