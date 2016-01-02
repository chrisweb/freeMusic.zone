/**
 * 
 * search query tracks collection
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
    'models.SearchQueryResultTrack'

], function (
    utilities,
    Collection,
    SearchQueryResultTrackModel
) {
    
    'use strict';
    
    var SearchQueryTracksCollection = Collection.extend({
        
        // url: '',
        onInitialize: function() {
            
            utilities.log('[SEARCH QUERY TRACKS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: SearchQueryResultTrackModel

    });
    
    return SearchQueryTracksCollection;
    
});