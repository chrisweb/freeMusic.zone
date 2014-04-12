/*global define*/

define([
    'underscore',
    'backbone',
    'models/application'
], function (_, Backbone, ApplicationModel) {
    'use strict';

    var ApplicationCollection = Backbone.Collection.extend({
        model: ApplicationModel
    });

    return ApplicationCollection;
});
