/**
 * 
 * player plugin
 * 
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} PlayerCore
 * @param {type} TracksManager
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'library.eventsManager',
    'library.player.core',
    'library.tracksManager'
    
], function (utilities, EventsManager, PlayerCore, TracksManager) {
    
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
            
            var playerCore = new PlayerCore({ trackUrl: trackModel.get('jamendo_stream_url') });
            
            // player events listeners
            playerCore.startListening();
            
            // start playing the track
            playerCore.play();
            
        });
        
    };

    return {
        initialize: initialize
    };
    
});