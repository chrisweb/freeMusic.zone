define([
    'jquery',
    'backbone',
    'underscore'
], function($, Backbone, _) {
    'use strict';
    
    var EventsManager;
    
    if (EventsManager === undefined) {
        
        EventsManager = _.extend({}, Backbone.Events);
        
    }

    return EventsManager;

});
