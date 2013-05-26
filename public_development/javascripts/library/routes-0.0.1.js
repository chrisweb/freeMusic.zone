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
        
        // check if user is logged in
        // TODO: create a session model for the user
        // TODO: check login status on every view not just during routes dispatch
        var isLogged = false;

        if (!isLogged) {

            // if user isnt logged in redirect him to homepage
            applicationRoutes.navigate('/', true);

        }

        // route events that retrieve data from models and then call the view render
        applicationRoutes.on('route:renderHomepage', function() {
            
            if (!isLogged) {
                
                utilities.log('[APPLICATION] user is not logged, load connect/connect view', 'blue');

                require(['application/views/connect/connect-0.0.1'], function(connectViewModule) {

                    var options = {};

                    var connectView = new connectViewModule(options);

                    connectView.render();

                });
                
            } else {
                
                utilities.log('[APPLICATION] load homepage/home view', 'blue');
                
                require(['application/views/homepage/home-0.0.1'], function(homepageViewModule) {

                    var options = {};

                    var homepageView = new homepageViewModule(options);

                    homepageView.render();

                });
                
            }
            
            var eventManager = _.extend({}, Backbone.Events);
            
            // the connect view onclose vent of the colorbox will trigger can
            // besides the homepage route also trigger the homepage view rendering
            eventManager.bind('loadHomepage', applicationRoutes.navigate('', true));

        });

        applicationRoutes.on('route:renderPaylistsList', function() {

           utilities.log('[APPLICATION] load renderPaylistsList view', 'blue');
           
            require([
                'application/views/playlist/list-0.0.1'
            ], function(playlistListViewModule) {

                var playlistListView = new playlistListViewModule();

                playlistListView.render();

            });

        });

        applicationRoutes.on('route:renderPlaylistDetail', function() {

           utilities.log('[APPLICATION] load renderPlaylistDetail view', 'blue');
           
            require([
                'application/models/playlist-0.0.1',
                'application/views/playlist/detail-0.0.1'
            ], function(playlistDetailViewModule, playlistModelModule) {
                
                var playlistModel = new playlistModelModule();
                
                var playlistListView = new playlistListViewModule();

                playlistListView.render();

            });
            
        });

        applicationRoutes.on('route:render404', function() {

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