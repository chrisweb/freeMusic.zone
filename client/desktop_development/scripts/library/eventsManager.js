/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * events manager
 * 
 * @param {type} Backbone
 * @param {type} _
 * @returns {unresolved}
 */
define([
    'backbone',
    'underscore'
], function(Backbone, _) {
    'use strict';
    
    var EventsManager;
    
    if (EventsManager === undefined) {
        
        EventsManager = _.extend({}, Backbone.Events);
        
    }

    return EventsManager;

});
