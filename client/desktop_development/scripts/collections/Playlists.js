/**
 * 
 * playlists collection
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
    
    var PlaylistsCollection = collection.extend({

        onInitialize: function() {
            
            utilities.log('[PLAYLISTS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: PlaylistModel,
        url: '/api/playlists'

    });
    
    return PlaylistsCollection;
    
});