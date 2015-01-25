/**
 * 
 * player plugin
 * 
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} PlayerCore
 * @param {type} TracksManager
 * @param {type} PlaylistsManager
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'library.eventsManager',
    'library.player.core',
    'library.tracksManager',
    'library.playlistsManager'
    
], function (utilities, EventsManager, playerCore, TracksManager, PlaylistsManager) {
    
    'use strict';
    
    var initialize = function initializeFunction(callback) {
        
        startListening();
        
    };
    
    /**
     * 
     * start listening to events
     * 
     * @returns {undefined}
     */
    var startListening = function startListeningFunction() {
        
        EventsManager.on(EventsManager.constants.TRACK_PLAY, function(attributes) {
            
            var trackModel = TracksManager.fetchTrack(attributes.trackId);
            
            // setup the player
            playerCore.setup({
                loopPlaylist: true
            });
            
            // start playing the track
            playerCore.play({
                url: trackModel.get('jamendo_stream_url'),
                playlistId: attributes.playlistId,
                id: attributes.trackId
            });
            
        });
        
        // when the player tells us that a track finished playing and that
        // we should play the next one of the playlist
        EventsManager.on(EventsManager.constants.PLAYLIST_NEXT, function(attributes) {
            
            console.log(attributes);
            
            
            
        });
        
    };

    return {
        initialize: initialize
    };
    
});