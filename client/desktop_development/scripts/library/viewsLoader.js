/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * views loader
 * 
 * @param {type} Backbone
 * @returns {unresolved}
 */
define([
    ''
], function () {
    
    'use strict';

    var ViewsLoader = function(views, callback) {

        require(views, function() {
            
            callback(arguments);
            
        });
        
    };

    return ViewsLoader;
    
});