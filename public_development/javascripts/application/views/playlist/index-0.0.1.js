/**
 * 
 * playlist list view
 * 
 */
define([
    'configuration',
    'utilities',
    'backbone',
    'underscore',
    'jquery',
    // using require js text for templates
    'text!application/templates/playlist/playlist-0.0.1.html',
    'playlist_collection',
    'playlist_model'
], function(configuration, utilities, Backbone, _, $, playlistListTemplate, PlaylistCollection, PlaylistModel) {

    'use strict';

    return Backbone.View.extend({

        el: $('#content'),

        initialize: function() {

            utilities.log('[PLAYLIST VIEW] initialization...', 'blue');

        },

        render: function () {

            var playlistCollection = new PlaylistCollection();
            
            var playlistModel = new PlaylistModel();
            
            // TODO:
            // initialize playlists collection
            // initialize playlist model
            // display playlist and its tracks
            // initialize player

            /*playlistsCollection.fetch({

                success: function(playlists) {

                    $(this.el).html(_.template(playlistListTemplate, {playlists: playlists, _: _}));

                }

            });*/

        }
        
    });
    
});