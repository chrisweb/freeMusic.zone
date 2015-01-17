/**
 * 
 * playlists manager collection
 * 
 * @param {type} utilities
 * @param {type} collection
 * @param {type} PlaylistModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'ribs.collection',
    'models.Playlist'
    
], function (utilities, collection, PlaylistModel) {
    
    'use strict';
    
    var PlaylistsManagerCollection = collection.extend({

        onInitialize: function() {
            
            utilities.log('[PLAYLISTS MANAGER COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: PlaylistModel

    });
    
    return PlaylistsManagerCollection;
    
});