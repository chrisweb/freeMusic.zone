/**
 * 
 * playlists list collection
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
    
    var PlaylistsListCollection = collection.extend({

        onInitialize: function() {
            
            utilities.log('[PLAYLISTS LIST COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: PlaylistModel,
        url: '/api/playlists/list'

    });
    
    return PlaylistsListCollection;
    
});