/**
 * 
 * track model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'underscore',
    'ribs.model'
    
], function (utilities, _, model) {
    
    'use strict';

    var TrackModel = model.extend({
            
        onInitialize: function() {
            
            utilities.log('[TRACK MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            id: 0,
            usageCounter: 0, // usage counter for cache collection to check usage in views
            isPlaying: false, // is player playing this song
            isCurrent: false, // is this the current track in player
            loaded: false, // did this track get preloaded
            loadedAt: 0, // timestamp at which the preloading got completed
            jamendo_album_image: null,
            jamendo_artist_name: null
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return TrackModel;
    
});