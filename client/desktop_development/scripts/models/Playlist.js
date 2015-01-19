/**
 * 
 * playlist model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'underscore',
    'ribs.model'
    
], function (utilities, _, model) {
    
    'use strict';

    var PlaylistModel = model.extend({
            
        onInitialize: function() {
            
            utilities.log('[PLAYLIST MODEL] initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            
        },
        validate: function(attrs) {
            
        }

    });

    return PlaylistModel;
    
});