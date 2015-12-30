'use strict';

// nodejs util
var util = require('util');

// utilities module
var utilities = require('../../bower_components/chrisweb-utilities/utilities');

// nodejs event emitter
var EventEmitter = require('events').EventEmitter;

var eventsLibrary = function eventsManagerFunction() {
    
    utilities.log('[EVENTS MANAGER] initialized');
    
};

util.inherits(eventsLibrary, EventEmitter);

module.exports = new eventsLibrary();