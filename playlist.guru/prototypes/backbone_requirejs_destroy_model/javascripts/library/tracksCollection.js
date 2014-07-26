define([
    'underscore',
    'backbone',
    'trackModel'
], function (_, Backbone, TrackModel) {
    
    'use strict';

    var tracksCollection = Backbone.Collection.extend({

        model: TrackModel,
        url: 'https://chris.lu/tracks',
        parse: function(response, options) {

            console.log('trackModel content got send to the server');
            console.log(response);
            console.log(options);

        },
        initialize: function() {

            this.on('add', function(model) {

                console.log('a model got added to the tracks collection');
                console.log(JSON.stringify(model.toJSON()));

            });

            this.on('remove', function(model) {

                console.log('a model got removed from the tracks collection');
                console.log(JSON.stringify(model.toJSON()));

            });

        },
        toJSON: function(options) {

            console.log('tracksCollection toJSON');
            console.log(options);
            console.log(this);

            var tracks = this.where({ albumId: options.albumId });

            if (tracks.length > 0) {

                if ($.type(options.selectedIds) !== 'undefined') {

                    tracks.filter();

                }

                console.log(tracks.length);

                return tracks;

            } else {

                return null;

            }

        }

    });

    return tracksCollection;
    
});