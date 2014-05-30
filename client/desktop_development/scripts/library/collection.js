/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * base collection
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

    var Collection = Backbone.Collection.extend({
        
        initialize: function(options) {
            
            utilities.log('[CHRISWEB COLLECTION] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
            // if oninitialize exists
            if (this.onInitialize) {
                
                // execute it now
                this.onInitialize(options);
                
            }
            
        },
        batchSave: function() {
            
            
            
        }
        
    });

    return Collection;
    
});