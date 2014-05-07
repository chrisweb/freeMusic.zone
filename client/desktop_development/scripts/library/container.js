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
 * @param {type} JamEvent
 * @returns {_L17.Anonym$2}
 */
define([
    'backbone',
    'underscore',
    'jquery'
], function (Backbone, _, $) {
    
    'use strict';
    
    var containers = [];
    
    var initialize = function initializeFunction(containersArray) {
        
        containers = containersArray;
        
    };
    
    var add = function addFunction(containerId, view) {
        
        if (containers[containerId] === undefined) {
            
            containers[containerId] = [];
            
        }
        
        containers[containerId].push(view);
        
        $('body').find('#' + containerId).append(view.create());
        
    };
    
    var clear = function clearFunction(containerId) {
        
        var views = containers[containerId];
        
        _.each(views, function(view) {
            
            view.close();
            
        });
        
    };

    return {
        initialize: initialize,
        add: add,
        clear: clear
    };
    
});