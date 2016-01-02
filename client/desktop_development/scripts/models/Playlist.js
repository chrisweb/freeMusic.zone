/**
 * 
 * playlist model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} Model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'underscore',
    'library.model'
    
], function (utilities, _, Model) {
    
    'use strict';

    var PlaylistModel = Model.extend({
            
        onInitialize: function() {
            
            utilities.log('[PLAYLIST MODEL] initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            tracksList: null,
            id: null
        },
        validate: function(attrs) {
            
        }

    });

    return PlaylistModel;
    
});