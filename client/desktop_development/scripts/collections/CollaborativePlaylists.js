/**
 * 
 * collaborative playlists collection
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
    'models.CollaborativePlaylist'
    
], function (utilities, Collection, CollaborativePlaylistModel) {
    
    'use strict';
    
    var CollaborativePlaylistsCollection = Collection.extend({

        onInitialize: function() {
            
            utilities.log('[COLLABORATIVE PLAYLISTS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: CollaborativePlaylistModel,
        url: '/api/collaborativeplaylists'

    });
    
    return CollaborativePlaylistsCollection;
    
});