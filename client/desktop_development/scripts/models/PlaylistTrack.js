/**
 * 
 * playlist track model
 * 
 * a playlist track is not a track, it just contains playlist specific
 * informations for a track, like its position in the playlist, the userId of
 * the user that added the track to the playlist or the date when the track
 * got added
 * 
 * @param {type} utilities
 * @param {type} Model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.model'
    
], function (utilities, Model) {
    
    'use strict';
    
    var PlaylistTrackModel = Model.extend({
        
        onInitialize: function() {
            
            utilities.log('[PLAYLIST TRACK MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            id: null,
            count_total: 0,
            count_unique: 0,
            twitter_users: [],
            position: 0,
            trackModel: null
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return PlaylistTrackModel;
    
});