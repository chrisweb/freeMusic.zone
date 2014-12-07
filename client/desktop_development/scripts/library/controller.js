/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * controller library
 *
 * @param {type} utilities 
 * @param {type} RibsController
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'chrisweb.utilities',
    'ribs.controller'
    
], function (utilities, RibsController) {
    
    'use strict';
    
    var LibraryController = RibsController.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[LIBRARY CONTROLLER] initializing ...', 'fontColor:blue');
            
        }
        
    });
    
    return LibraryController;
    
});