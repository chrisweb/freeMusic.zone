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
], function (utilities, Backbone, _, $) {
    
    'use strict';
    
    var containers = {};
    
    var create = function dispatchFunction(container) {
        
        utilities.log('[CONTAINER] VIEWS DISPATCH');
        
        if (container === undefined) {

            _.each(containers, function(views, containerId) {

                _.each(views, function(view) {

                    var viewHtml = view.create();

                    $('body').find('#' + containerId).append(viewHtml);

                });

            });
            
        } else {
            
            var views = containers[container];
            
            _.each(views, function(view) {

                var viewHtml = view.create();
                
                $('body').find('#' + container).append(viewHtml);

            });
            
        }
        
    };
    
    var add = function addFunction(containerId, view) {
        
        utilities.log('[CONTAINER] VIEWS ADD');
        
        if (containers[containerId] === undefined) {
            
            containers[containerId] = [];
            
        }

        containers[containerId].push(view);
        
    };
    
    var clear = function clearFunction(containerId) {
        
        var views = containers[containerId];

        _.each(views, function(view) {
            
            view.close();
            
        });
        
        containers = {};
        
    };

    return {
        dispatch: create,
        add: add,
        clear: clear
    };
    
});