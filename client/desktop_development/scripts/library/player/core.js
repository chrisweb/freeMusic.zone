/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * player core
 * 
 * @param {type} utilities
 * @param {type} configurationModule
 * @param {type} eventsManager
 * @param {type} Backbone
 * @param {type} SoundManager
 * @param {type} tracksCacheManager
 * @returns {_L19.Anonym$4}
 */
define([
    'utilities',
    'configuration',
    'eventsManager',
    'backbone',
    'SoundManager',
    'tracksCache'
], function(utilities, configurationModule, eventsManager, Backbone, SoundManager, tracksCacheManager) {

    'use strict';

    var soundManager2 = SoundManager.soundManager;

    var start = function startFunction() {

        utilities.log('[PLAYER CORE] initializing ...', 'blue');
        
        var configuration = configurationModule.get();

        soundManager2.setup({
            url: configuration.soundmanager.flash.url,
            flashVersion: configuration.soundmanager.flash.version,
            preferFlash: configuration.soundmanager.preferFlash,
            debugMode: configuration.soundmanager.debugMode,
            onready: function() {

                eventsManager.trigger('player:loaded');
                
                utilities.log('[PLAYER CORE] loaded', 'green');

            },
            ontimeout: function() {

                eventsManager.trigger('player:timeout');
                
                utilities.log('[PLAYER CORE] timeout', 'red');

            }
        });
        
        // set the default options
        soundManager2.defaultOptions = {
            autoLoad: false, // enable automatic loading (otherwise .load() will call with .play())
            autoPlay: false, // enable playing of file ASAP (much faster if "stream" is true)
            from: null, // position to start playback within a sound (msec), see demo
            loops: 1, // number of times to play the sound. Related: looping (API demo)
            multiShot: false, // let sounds "restart" or "chorus" when played multiple times..
            multiShotEvents: false, // allow events (onfinish()) to fire for each shot, if supported.
            position: null, // offset (milliseconds) to seek to within downloaded sound.
            pan: 0, // "pan" settings, left-to-right, -100 to 100
            stream: true, // allows playing before entire file has loaded (recommended)
            to: null, // position to end playback within a sound (msec), see demo
            type: null, // MIME-like hint for canPlay() tests, eg. 'audio/mp3'
            usePolicyFile: false, // enable crossdomain.xml request for remote domains (for ID3/waveform access)
            volume: 33 // self-explanatory. 0-100, the latter being the max.
        };

        // flash9 options
        soundManager2.flash9Options = {
            usePeakData: false, // enable left/right channel peak (level) data
            useWaveformData: false, // enable sound spectrum (raw waveform data) - WARNING: May set CPUs on fire.
            useEQData: false // enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
        };

    };

    var createTrackSound = function createTrackSoundFunction(trackModel, autoPlay) {

        var trackSound = soundManager2.createSound({
            autoPlay: autoPlay,
            id: trackModel.get('id'),
            url: trackModel.get('audio'),
            onfinish: function() {

                eventsManager.trigger('sound:onfinish');
                
                utilities.log('[PLAYER CORE] sound:onfinish');

            },
            onload: function() {

                eventsManager.trigger('sound:onload', { id: this.id });
                
                utilities.log('[PLAYER CORE] sound:onload');

            },
            onunload: function() {

                eventsManager.trigger('sound:onunload', { id: this.id });
                
                utilities.log('[PLAYER CORE] sound:onunload');

            },
            onpause: function() {

                eventsManager.trigger('sound:onpause');
                
                utilities.log('[PLAYER CORE] sound:onpause');

            },
            onplay: function() {

                eventsManager.trigger('sound:onplay');
                
                utilities.log('[PLAYER CORE] sound:onplay');

            },
            onresume: function() {

                eventsManager.trigger('sound:onresume');
                
                utilities.log('[PLAYER CORE] sound:onresume');

            },
            onsuspend: function() {

                eventsManager.trigger('sound:onsuspend');
                
                utilities.log('[PLAYER CORE] sound:onsuspend');

            },
            onstop: function() {

                eventsManager.trigger('sound:onstop');
                
                utilities.log('[PLAYER CORE] sound:onstop');

            },
            onid3: function() {

                eventsManager.trigger('sound:onid3');
                
                utilities.log('[PLAYER CORE] sound:onid3');

            },
            whileloading: function() {

                eventsManager.trigger('sound:whileloading');
                
                utilities.log('[PLAYER CORE] sound:whileloading');

            },
            whileplaying: function() {

                eventsManager.trigger('sound:whileplaying');
                
                utilities.log('[PLAYER CORE] sound:whileplaying');

            }
            
        });
        
        return trackSound;

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
        
        if (trackModel.get('loaded') === false) {

            var autoPlay = true;

            var trackSound = createTrackSound(trackModel, autoPlay);
            
            trackModel.set('sound', trackSound);
        
            trackSound.load();
               
        } else {
            
            trackModel.get('sound').play();
            
        }

    });

    eventsManager.on('track:stop', function(parameters) {

        utilities.log('track stop: ' + parameters.trackId);
        
        var trackModel = tracksCacheManager.fetchTrack(parameters.trackId);
        
        trackModel.get('sound').stop();

    });

    eventsManager.on('track:pause', function(parameters) {

        utilities.log('track pause: ' + parameters.trackId);
        
        var trackModel = tracksCacheManager.fetchTrack(parameters.trackId);
        
        trackModel.get('sound').pause();

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