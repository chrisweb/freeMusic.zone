/**
 * 
 * player plugin
 * 
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} playerCore
 * @param {type} TracksManager
 * @param {type} PlaylistsManager
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb-utilities',
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
            
            TracksManager.get(attributes.trackId, function(error, trackModelsArray) {
                
                var trackModel = trackModelsArray[0];
                
                if (!error) {
                    
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
                    
                } else {
                    
                    // TODO: error
                    
                    utilities.log(error);
                    
                }
                
            });
            
        });
        
        EventsManager.on(EventsManager.constants.TRACK_PAUSE, function() {
            
            // pause the track
            playerCore.pause();
            
        });
        
        // when the player tells us that a track finished playing and that
        // we should play the next one of the playlist
        EventsManager.on(EventsManager.constants.PLAYLIST_NEXT, function(attributes) {
            
            var nextTrack = PlaylistsManager.nextTrack();
            
            TracksManager.get(nextTrack.id, function(error, trackModelsArray) {
                
                var trackModel = trackModelsArray[0];
                
                if (!error) {
                    
                    // start playing the track
                    playerCore.play({
                        url: trackModel.get('jamendo_stream_url'),
                        playlistId: attributes.playlistId,
                        id: attributes.trackId
                    });
                    
                } else {
                    
                    // TODO: error
                    
                    utilities.log(error);
                    
                }
                
            });
            
        });
        
    };

    return {
        initialize: initialize
    };
    
});