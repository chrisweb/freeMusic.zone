/**
 * 
 * playlists collection
 * 
 * @param {type} utilities
 * @param {type} Collection
 * @param {type} PlaylistModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.collection',
    'models.Playlist'
    
], function (utilities, Collection, PlaylistModel) {
    
    'use strict';
    
    var PlaylistsCollection = Collection.extend({

        onInitialize: function() {
            
            utilities.log('[PLAYLISTS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: PlaylistModel,
        url: '/api/playlists'

    });
    
    return PlaylistsCollection;
    
});