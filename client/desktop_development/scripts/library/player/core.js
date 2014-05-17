/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * @param {type} utilities
 * @param {type} eventsManager
 * @param {type} Backbone
 * @param {type} SoundManager
 * @param {type} tracksCacheManager
 * @returns {_L18.Anonym$2}
 */
define([
    'utilities',
    'eventsManager',
    'backbone',
    'SoundManager',
    'tracksCache'
], function(utilities, eventsManager, Backbone, SoundManager, tracksCacheManager) {

    'use strict';
    
    var soundManager2 = SoundManager.soundManager;

    var start = function startFunction() {

        utilities.log('[PLAYER CORE] initializing ...', 'blue');

        soundManager2.setup({
            url: '/flash/soundmanager/',
            flashVersion: 9,
            preferFlash: false, // prefer HTML5 mode where supported
            onready: function() {
                
                eventsManager.trigger('player:loaded');
                
            },
            ontimeout: function() {
                
                eventsManager.trigger('player:timeout');
                
            },
            defaultOptions: {
                
                // default valome for now sound objects
                volume: 33
                
            }
        });

    };
    
    var setIsCurrent = function setIsCurrentFunction(trackModel, isCurrent) {
        
        trackModel.set(isCurrent, true);
        
    };
    
    var setIsPlaying = function setIsPlayingFunction(trackModel, isPlaying) {
        
        trackModel.set(isPlaying, true);
        
    };
    
    eventsManager.on('track:play', function(parameters) {

        utilities.log('track play: ' + parameters.trackId);
        
        var trackModel = tracksCacheManager.fetchTrack(parameters.trackId);
        
        console.log(trackModel);
        
        // TODO: create sound, play sound
        
    });
    
    eventsManager.on('track:stop', function(parameters) {

        utilities.log('track stop: ' + parameters.trackId);
        
    });
    
    eventsManager.on('track:pause', function(parameters) {

        utilities.log('track pause: ' + parameters.trackId);
        
    });
    
    eventsManager.on('track:next', function(parameters) {

        utilities.log('track next: ' + parameters.trackId);
        
    });
    
    eventsManager.on('track:previous', function(parameters) {

        utilities.log('track previous: ' + parameters.trackId);
        
    });

    return {
        start: start
    };

});