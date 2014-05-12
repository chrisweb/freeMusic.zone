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
    'backbone',
    'underscore',
    'jquery'
], function (Backbone, _, $) {
    
    'use strict';
    
    var containers = {};
    
    var renderAll = function dispatchFunction() {

        _.each(containers, function(views, containerId) {

            _.each(views, function(view) {
                
                //var viewHtml = view.create('#' + containerId);
                var viewHtml = view.render().$el;
                
                $('body').find('#' + containerId).append(viewHtml);
                
            });

        });
        
    };
    
    var add = function addFunction(containerId, view) {
        
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
        dispatch: renderAll,
        add: add,
        clear: clear
    };
    
});