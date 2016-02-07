/**
 * 
 * collaborative playlist track model
 * 
 * a collaborative playlist track is not a track, it just contains the collaborative playlist specific
 * informations for a track, like the upvotes count it got for a specific collaborative playlist, the userId of
 * the user that added the track to the collaborative playlist or the date when the track got added
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
    
    var CollaborativePlaylistTrackModel = Model.extend({
        
        onInitialize: function() {
            
            utilities.log('[COLLABORATIVE PLAYLIST TRACK MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            id: null,
            upvotes_total: 0,
            date_added: null,
            user_id: 0,
            room_id: 0,
            trackModel: null
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return CollaborativePlaylistTrackModel;
    
});