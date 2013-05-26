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
    'text!application/templates/playlist/list-0.0.1.html',
    'text!application/collections/playlists-0.0.1'
], function(configuration, utilities, Backbone, _, $, playlistListTemplate, playlistCollection) {

    'use strict';

    return Backbone.View.extend({

        el: $('#content'),

        initialize: function() {

            utilities.log('[PLAYLIST VIEW] initialization...', 'blue');

        },

        render: function () {

            var playlistsCollection = new playlistCollection();

            playlistsCollection.fetch({

                success: function(playlists) {

                    $(this.el).html(_.template(playlistListTemplate, {playlists: playlists, _: _}));

                }

            });

        }
        
    });
    
});