/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * base controller
 * 
 * @param {type} _
 * @returns {unresolved}
 */
define([
    'underscore'
], function (_) {

    var controller = function controllerFunction(options) {

        this.options = options || {};

        if (_.isFunction(this.initialize)) {
            this.initialize(this.options);
        }

    };
    
    return controller;

});