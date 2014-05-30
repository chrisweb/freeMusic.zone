define([
    'jquery',
    'underscore',
    'utilities',
    'controller',
    'container',
    'eventsManager',
    'configuration',
    'tracksCache'
], function ($, _, utilities, controller, container, eventsManager, configurationModule, tracksCacheManager) {
    
    'use strict';

    var indexAction = function indexActionFunction() {
        
        utilities.log('[MAIN] controller: homepage,  action: index', 'fontColor:blue');
        
        // add the search bar to the main section of the layout
        require(['views/components/searchBar'], function(SearchBarView) {
            
            var searchBarView = new SearchBarView();
            
            container.add('main', searchBarView);

        });
        
        // initialize tracklist view
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

            container.add('main', tracksListView);
            
            // listen for search events
            eventsManager.on('search:query', function(parameters) {

                handleSearch(parameters.queryString, function(error, results) {

                    tracksSearchResultCollection.reset();

                    if (!error) {

                        _.each(results, function(value) {

                            // initialize a new trqck model
                            var trackModel = new TrackModel(value);
                            
                            // add the track to the cache
                            tracksCacheManager.addTrack(trackModel);

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

        });
        
    };
    
    var jqXHR;
    
    var handleSearch = function handleSearchFunction(queryString, callback) {
        
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

    return {
        index: indexAction
    };
    
});