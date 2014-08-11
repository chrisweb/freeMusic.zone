'use strict';

// nodejs util
var util = require('util');

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// nodejs event emitter
var EventEmitter = require('events').EventEmitter;

var eventsManager = function eventsManagerFunction() {
    
    utilities.log('[EVENTS MANAGER] initialized');
    
};

util.inherits(eventsManager, EventEmitter);

module.exports = new eventsManager();