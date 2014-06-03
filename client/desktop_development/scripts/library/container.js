/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * views container
 * 
 * @param {type} utilities
 * @param {type} Backbone
 * @param {type} _
 * @param {type} $
 * @returns {_L17.Anonym$2}
 */
define([
    'utilities',
    'backbone',
    'underscore',
    'jquery'
], function(utilities, Backbone, _, $) {

    'use strict';

    var instance = null;

    var ContainerSingleton = function ContainerSingletonFunction() {
        
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()");
        }
        
        this.containers = {};
        
    };
    
    ContainerSingleton.prototype = {

        dispatch: function dispatchFunction(containerId) {

            utilities.log('[CONTAINER] VIEWS DISPATCH');

            if (containerId === undefined) {

                _.each(this.containers, function(views, containerId) {

                    _.each(views, function(view) {

                        var viewHtml = view.create();

                        $('body').find('#' + containerId).append(viewHtml);

                    });

                });

            } else {

                var views = this.containers[containerId];

                _.each(views, function(view) {

                    var viewHtml = view.create();

                    $('body').find('#' + containerId).append(viewHtml);

                });

            }
            
            this.containers = {};

        },

        add: function addFunction(containerId, view) {

            utilities.log('[CONTAINER] VIEWS ADD');

            if (this.containers[containerId] === undefined) {

                this.containers[containerId] = [];

            }

            this.containers[containerId].push(view);

        },

        clear: function clearFunction(containerId) {

            var views = this.containers[containerId];

            _.each(views, function(view) {

                view.close();

            });

            this.containers = {};

        }
        
    };
    
    var getInstance = function getInstanceFunction() {
        
        if (instance === null) {
            instance = new ContainerSingleton();
        }
        
        return instance;
        
    };

    return getInstance();

});