/**
 * 
 * @param {type} angular
 * @returns {_L4.Anonym$0}
 */
define('routes', ['configuration', 'utilities', 'backbone'], function(configuration, utilities, Backbone) {

    'use strict';

    return Backbone.Router.extend({
    
        routes: {
            '/': 'renderHomepage',
            'playlists': 'renderPaylistsList',
            'playlist/:id': 'renderPlaylistDetail',
            '*other': 'renderHomepage'
        }
        
        
        
    });

});