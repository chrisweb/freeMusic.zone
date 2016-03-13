/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * views container (singleton)
 * 
 * @param {type} Backbone
 * @param {type} _
 * @param {type} $
 * @returns {_L17.Anonym$2}
 */
define([
    'backbone',
    'underscore',
    'jquery'
], function(Backbone, _, $) {

    'use strict';

    var instance = null;

    var ContainerSingleton = function ContainerSingletonFunction() {
        
        if (instance !== null) {
            throw new Error('singleton has already been instantiated, use getInstance()');
        }
        
        this.containers = {};
        
    };
    
    ContainerSingleton.prototype = {

        dispatch: function dispatchFunction(containerSelector) {

            console.log('[CONTAINER] VIEWS DISPATCH');

            if (containerSelector === undefined) {

                _.each(this.containers, function(views, containerSelector) {

                    _.each(views, function(view) {

                        var viewHtml = view.create();

                        $('body').find(containerSelector).append(viewHtml);

                    });

                });

            } else {

                var views = this.containers[containerSelector];

                _.each(views, function(view) {

                    var viewHtml = view.create();

                    $('body').find(containerSelector).append(viewHtml);

                });

            }
            
            this.containers = {};

        },

        add: function addFunction(containerSelector, view) {

            console.log('[CONTAINER] VIEWS ADD');

            if (this.containers[containerSelector] === undefined) {

                this.containers[containerSelector] = [];

            }

            this.containers[containerSelector].push(view);

        },

        clear: function clearFunction(containerSelector) {

            var views = this.containers[containerSelector];

            _.each(views, function(view) {

                view.close();

            });

            this.containers = {};

        }
        
    };
    
    var getInstance = function getInstanceFunction() {
        
        if (instance === null) {
            
            console.log('[USER PLUGIN] initialized...');
            
            instance = new ContainerSingleton();
            
        }
        
        return instance;
        
    };

    return getInstance();

});