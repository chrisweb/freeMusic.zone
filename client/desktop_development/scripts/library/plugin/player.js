/**
 * 
 * player plugin
 * 
 * @param {type} utilities
 * @param {type} EventsLibrary
 * @param {type} playerCore
 * @param {type} TracksManager
 * @param {type} PlaylistsManager
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb-utilities',
    'library.events',
    'library.player.core',
    'manager.tracks',
    'manager.playlists'

], function (
    utilities,
    EventsLibrary,
    playerCore,
    TracksManager,
    PlaylistsManager
) {
    
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
        
        EventsLibrary.on(EventsLibrary.constants.TRACK_PLAY, function(attributes) {
            
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
        
        EventsLibrary.on(EventsLibrary.constants.TRACK_PAUSE, function() {
            
            // pause the track
            playerCore.pause();
            
        });
        
        // when the player tells us that a track finished playing and that
        // we should play the next one of the playlist
        EventsLibrary.on(EventsLibrary.constants.PLAYLIST_NEXT, function(attributes) {
            
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