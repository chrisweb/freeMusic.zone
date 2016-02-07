/**
 * 
 * collaborative playlists list collection
 * 
 * @param {type} utilities
 * @param {type} Collection
 * @param {type} CollaborativePlaylistModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.collection',
    'models.CollaborativePlaylist'
    
], function (utilities, Collection, CollaborativePlaylistModel) {
    
    'use strict';
    
    var CollaborativePlaylistsListCollection = Collection.extend({

        onInitialize: function() {
            
            utilities.log('[COLLABORATIVE PLAYLISTS LIST COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: CollaborativePlaylistModel,
        url: '/api/collaborativeplaylists/list'

    });
    
    return CollaborativePlaylistsListCollection;
    
});