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
 * @param {type} ChriswebPlayer
 * 
 * @returns {_L19.Anonym$4}
 */
define([
    'chrisweb.utilities',
    'configuration',
    'chrisweb.player'
    
], function(utilities, configurationModule, ChriswebPlayer) {
    
    'use strict';
    
    var PlayerCore = ChriswebPlayer.extend({});
    
    PlayerCore.prototype.startListening = function startListeningFunction() {

        var that = this;

        this.events.on(this.events.constants.positionEvent, function(trackPositionInPercent) {

            that.positionChange(trackPositionInPercent);

        });

        this.events.on(this.events.constants.playEvent, function() {

            that.play();

        });

        this.events.on(this.events.constants.pauseEvent, function() {

            that.pause();

        });

        this.events.on(this.events.constants.stopEvent, function() {

            that.stop();

        });

    };

    /**
     * 
     * stop listening for events
     * 
     * @returns {undefined}
     */
    PlayerCore.prototype.stopListening = function stopListeningFunction() {

        this.events.off(this.events.constants.positionEvent);

        this.events.off(this.events.constants.playEvent);

        this.events.off(this.events.constants.pauseEvent);

        this.events.off(this.events.constants.stopEvent);

    };

    return PlayerCore;

});