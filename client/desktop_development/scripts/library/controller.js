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
    'library.utilities',
    'library.container'
], function (_, Backbone, utilities, container) {
    
    'use strict';
    
    var chrisweb = {};

    chrisweb.Controller = function ControllerFunction() {
        
        //utilities.log('arguments: ', arguments);

        this.initialize.apply(this, arguments);

    };

    _.extend(chrisweb.Controller.prototype, Backbone.Events, {

        initialize: function controllerInitializeFunction(options, configuration, router) {

            utilities.log('[CHRISWEB CONTROLLER] initializing ...', 'fontColor:blue');

            this.options = options || {};
            this.configuration = configuration.get();
            this.router = router;

            // if oninitialize exists
            if (this.onInitialize) {

                // execute it now
                this.onInitialize(this.options, this.configuration, this.router);

            }

        },
        dispatch: function controllerDispatchFunction(containerId) {

            container.dispatch(containerId);

        }

    });
    
    chrisweb.Controller.extend = Backbone.Model.extend;
    
    return chrisweb.Controller;

});