/**
 * 
 * @param {type} angular
 * @returns {_L4.Anonym$0}
 */
define('routes', ['configuration', 'utilities', 'backbone'], function(configuration, utilities, Backbone) {

    'use strict';

    var router = Backbone.Router.extend({
        
        initialize: function() {
            
            utilities.log('[ROUTER] initialization...', 'blue');
            
        },
        
        routes: {
            '': 'renderHomepage',
            'playlists': 'renderPaylistsList',
            'playlist/:id': 'renderPlaylistDetail',
            '*other': 'render404'
        }

    });
    
    var dispatch = function() {

        var applicationRoutes = new router();

        applicationRoutes.on('route:renderHomepage', function() {

            utilities.log('[APPLICATION] load homepage/home view', 'blue');

            require(['application/views/homepage/home'], function(homepageView) {

                console.log(homepageView);

                homepageView.render();

            });

        });

        applicationRoutes.on('renderPaylistsList', function() {

           utilities.log('[APPLICATION] load renderPaylistsList view', 'blue');

        });

        applicationRoutes.on('renderPlaylistDetail', function() {

           utilities.log('[APPLICATION] load renderPlaylistDetail view', 'blue');

        });

        applicationRoutes.on('render404', function() {

            // default route if none of the previous ones matched
            utilities.log('[APPLICATION] page not found', 'blue');

        });

        Backbone.history.start({
            pushState: true,
            root: '/'
        });
        
    }
    
    return {
        dispatch: dispatch
    };

});