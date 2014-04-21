define([
    'jquery',
    'backbone',
    'underscore'
], function($, Backbone, _) {
    'use strict';

    var EventsManager = _.extend({}, Backbone.Events);

    return EventsManager;

});
