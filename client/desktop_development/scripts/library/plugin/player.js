/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * player plugin
 * 
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} TracksManager
 * 
 * @returns {_L16.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'library.eventsManager',
    'library.player.core',
    'library.tracksManager'
    
], function (utilities, EventsManager, TracksManager) {
    
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
            
            TracksManager.fetchTrack(attributes.trackId);
            
            
            
        });
        
    };

    return {
        initialize: initialize
    };
    
});