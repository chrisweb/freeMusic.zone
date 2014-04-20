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

/*
// IndexCollection.js

define(["jquery", "backbone", "models/mvc_set/mvc_setModel"],
	function($, Backbone, Model) {

		// Creates a new Backbone Collection class object
		var mvc_setCollection = Backbone.Collection.extend({

			// Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
			model: Model

		});

		// Returns the Model class
		return mvc_setCollection;

	}

);
*/