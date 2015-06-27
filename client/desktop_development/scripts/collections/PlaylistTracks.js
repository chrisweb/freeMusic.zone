/**
 * 
 * playlist tracks collection
 * 
 * a playlist track is not a track, it just contains playlist specific
 * informations for a track, like its position in the playlist, the userId of
 * the user that added the track to the playlist or the date when the track
 * got added
 * 
 * @param {type} utilities
 * @param {type} Collection
 * @param {type} PlaylistTrackModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.collection',
    'models.PlaylistTrack'
    
], function (utilities, Collection, PlaylistTrackModel) {
    
    'use strict';
    
    var PlaylistTracksCollection = Collection.extend({

        url: function() {
            return '/api/playlists/tracks/' + this.options.playlistId;
        },
        onInitialize: function() {
            
            utilities.log('[PLAYLIST TRACKS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: PlaylistTrackModel

    });
    
    return PlaylistTracksCollection;
    
});