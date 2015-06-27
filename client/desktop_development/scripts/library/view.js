/**
 * 
 * view library
 *
 * @param {type} utilities 
 * @param {type} Ribs
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'chrisweb-utilities',
    'ribsjs'
    
], function (utilities, Ribs) {
    
    'use strict';
    
    var LibraryView = Ribs.View.extend({
        
        onInitialize: function(options, configuration, router) {
            
            //utilities.log('[LIBRARY VIEW] initializing ...', 'fontColor:blue');
            
        }
        
    });
    
    return LibraryView;
    
});