/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * base model
 * 
 * @param {type} utilities
 * @param {type} Backbone
 * @returns {unresolved}
 */
define([
    'utilities',
    'backbone'
], function (utilities, Backbone) {
    
    'use strict';

    var Model = Backbone.Model.extend({
        
        initialize: function(options) {
            
            utilities.log('[CHRISWEB MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
            // if oninitialize exists
            if (this.onInitialize) {
                
                // execute it now
                this.onInitialize(options);
                
            }
            
        }
        
    });

    return Model;
    
});