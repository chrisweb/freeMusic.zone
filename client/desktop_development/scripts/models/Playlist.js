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
            playlistTracksCollection: null,
            id: 0
        },
        validate: function(attrs) {
            
        }

    });

    return PlaylistModel;
    
});