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
 * @param {type} collection
 * @param {type} PlaylistTrackModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'ribs.collection',
    'models.PlaylistTrack'
    
], function (utilities, collection, PlaylistTrackModel) {
    
    'use strict';
    
    var PlaylistTracksCollection = collection.extend({

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