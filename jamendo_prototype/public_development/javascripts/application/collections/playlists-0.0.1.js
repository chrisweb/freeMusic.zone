
/**
 * playlists collection
 */
define('playlistsCollection', [
    'configuration',
    'utilities',
    'backbone',
    'underscore',
    'application/models/playlist-0.0.1'
], function(configuration, utilities, Backbone, _, playlistModel) {
    
    'use strict';

    return Backbone.Collection.extend({
        
        model: playlistModel,
        url: configuration.application.host + configuration.application.apiPath + '/playlists'
        
    });

});