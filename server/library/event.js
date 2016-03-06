'use strict';

// nodejs util
var util = require('util');

// utilities module
var utilities = require('chrisweb-utilities');

// nodejs event emitter
var EventEmitter = require('events').EventEmitter;

var eventsLibrary = function eventsManagerFunction() {
    
    utilities.log('[EVENTS MANAGER] initialized');
    
};

util.inherits(eventsLibrary, EventEmitter);

module.exports = new eventsLibrary();