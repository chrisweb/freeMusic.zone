/**
 * 
 * collaborative playlists controller
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} Ribs
 * @param {type} playlistsManager
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'chrisweb-utilities',
    'library.controller',
    'ribsjs',
    'library.playlistsManager'
    
], function ($, _, utilities, Controller, Ribs, playlistsManager) {
    
    'use strict';

    var CollaborativePlaylistsController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[COLLABORATIVE PLAYLISTS CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction() {
        
            utilities.log('[COLLABORATIVE PLAYLISTS CONTROLLER] action: index', 'fontColor:blue');
            
            
            

            // chat message input form
            require([
                'views/pages/collaborativePlaylists'
            ], function(CollaborativePlaylistsView) {

                var collaborativePlaylistsView = new CollaborativePlaylistsView();
                
                Ribs.Container.clear('#core');

                Ribs.Container.add('#core', collaborativePlaylistsView);
                
                Ribs.Container.dispatch('#core');
                
                //var userPlaylistsList = 
                
                //PlaylistsManager.get({
                //    playlistId: userPlaylistsList,
                //    withPlaylistTracks: false
                //}, function(error, playlistsArray) {

            });
            
            /*
            // chat messages list
            require([
                'views/components/chat/messagesList',
                'views/components/chat/messageRow',
                'models.ChatMessage',
                'collections.ChatMessages'
            ], function(TracksListView, TrackRowView, TrackModel, TracksSearchResultCollection) {



            });

            // add the search bar to the main section of the layout
            require([
                'views/components/searchBar'
            ], function(SearchBarView) {

                var searchBarView = new SearchBarView();

                container.add('#core', searchBarView);

            });

            // search results
            require([
                'views/components/tracksList',
                'views/components/trackRow',
                'models.Track',
                'collections.TracksSearchResult'
            ], function(TracksListView, TrackRowView, TrackModel, TracksSearchResultCollection) {

                // initialize tracks search results collection
                var tracksSearchResultCollection = new TracksSearchResultCollection();

                // initialize the tracks list view
                var tracksListView = new TracksListView({
                    collection: tracksSearchResultCollection,
                    ModelView: TrackRowView
                });

                container.add('#core', tracksListView);

                // listen for search events
                EventsManager.on(EventsManager.constants.SEARCH_QUERY, function(attributes) {

                    handleSearch(attributes.queryString, function handleSearchCallback(error, results) {

                        tracksSearchResultCollection.reset();

                        if (!error) {

                            _.each(results, function(value) {

                                // initialize a new trqck model
                                var trackModel = new TrackModel(value);

                                // add the track to the cache
                                TracksManager.addTrack(trackModel);

                                // add the track to the search result collection
                                tracksSearchResultCollection.add(trackModel);

                            });

                        } else {

                            //TODO: handle the error

                            utilities.log('errorThrown: ' + error);

                        }

                    });

                });

                container.dispatch();

            });*/

        }
        
    });
    
    var jqXHR;
    
    var searchQuery = function searchQueryFunction(queryString, callback) {
        
        // TODO: filter query string

        var configuration = configurationModule.get();

        // abort previous request if it is still ongoing
        if (jqXHR !== undefined && jqXHR.readyState !== 4) {

            jqXHR.abort();

        }

        jqXHR = $.ajax({
            url: configuration.server.path + '/api/search',
            type: 'GET',
            data: { q: queryString },
            dataType: 'json'
        });

        jqXHR.done(function(dataJson, textStatus, jqXHR) {

            //utilities.log(dataJson);
            utilities.log(textStatus);
            utilities.log(jqXHR);

            callback(false, dataJson.results);

        });

        jqXHR.fail(function(jqXHR, textStatus, errorThrown) {

            //utilities.log(jqXHR);
            utilities.log(textStatus);
            utilities.log(errorThrown);

            callback(errorThrown);

        });
        
    };

    return CollaborativePlaylistsController;
    
});