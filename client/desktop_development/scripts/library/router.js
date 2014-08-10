/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * router
 * 
 * @param {type} utilities
 * @param {type} ribsRouter
 * @param {type} user
 * @returns {undefined}
 */
define([
    'chrisweb.utilities',
    'ribs.router',
    'library.user'
], function (utilities, ribsRouter, user) {
    
    'use strict';

    var Router = ribsRouter.extend({
    
        initialize: function initializeFunction() {
        
            utilities.log('[LIBRARY ROUTER] initializing ...');
        
        }
        
    });
    
});