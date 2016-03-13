define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    
    'use strict';

    var trackModel = Backbone.Model.extend({
        url: 'https://chris.lu/track',
        defaults: {
            name: '',
            artistId: 0
        },
        initialize: function() {

            console.log('created a new trackModel, initializeing event listeners');

            this.on('change', function(model) {

                console.log('some attributes have changed in the trackModel');
                console.log(model.changedAttributes());

            });

            this.on('invalid', function(model, errors) {

                console.log('some attributes are invalid in the trackModel');
                console.log(model);
                console.log(errors);

            });

            this.on('destroy', function(model) {

                console.log('the trackModel got destroyed');
                console.log(JSON.stringify(model.toJSON()));

            });

        },
        validate: function(attributes, options) {

            console.log('validate the trackModel input data');
            console.log(attributes);
            console.log(options);

            var errors = [];

            if (attributes.name === '') {

                errors.push('"name" is required');

            }

            if ($.type(attributes.artistId) !== 'number') {

                errors.push('"artistId" must be of type number');

            }

            if (errors.length > 0) {

                return errors;

            } else {

                return false;

            }

        }

    });

    return trackModel;
    
});