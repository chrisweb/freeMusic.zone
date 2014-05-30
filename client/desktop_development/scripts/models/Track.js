/**
 * 
 * track model
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} model
 * @returns {unresolved}
 */
define([
    'utilities',
    'underscore',
    'model'
], function (utilities, _, model) {
    
    'use strict';

    var TrackModel = model.extend({
            
        onInitialize: function() {
            
            utilities.log('[TRACK MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            usageCounter: 0, // usage counter for cache collection to check usage in views
            isPlaying: false, // is player playing this song
            isCurrent: false, // is this the current track in player
            loaded: false, // did soundmanager preload this track
            loadedAt: 0 // timestamp at which the preloading got completed
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return TrackModel;
    
});