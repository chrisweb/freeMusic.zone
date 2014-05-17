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
 * @returns {_L17.Anonym$2}
 */
define([
    'utilities',
    'event',
    'backbone',
    'SoundManager'
], function(utilities, eventsManager, Backbone, SoundManager) {

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
    
    eventsManager.on('track:preview', function(parameters) {

        utilities.log('track preview: ' + parameters.trackId);
        
    });

    return {
        start: start
    };

});