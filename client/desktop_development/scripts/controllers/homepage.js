define([
    'jquery',
    'underscore',
    'utilities',
    'controller',
    'page',
    'event',
    'configuration',
    'model',
    'collection',
    'TrackSearchResultModel',
    'TrackSearchResultCollection'
], function ($, _, utilities, controller, page, eventsManager, configurationModule, model, collection, TrackSearchResultModel, TrackSearchResultCollection) {
    
    'use strict';

    var indexAction = function indexActionFunction() {
        
        utilities.log('[MAIN] controller: homepage,  action: index', 'blue');
        
        // add the search bar to the main section of the layout
        require(['views/components/searchBar'], function(SearchBarView) {
            
            var searchBarView = new SearchBarView();
            
            page.append(searchBarView, 'main');

        });
        
        // initialize tracks search results model
        var trackSearchResultModel = new TrackSearchResultModel();
        
        // initialize tracks search results collection
        var trackSearchResultCollection = new TrackSearchResultCollection();
        
        // initialize tracklist view
        require(['views/components/tracksList'], function(TracksListView) {
            
            require(['views/components/trackRow'], function(TrackRowView) {
                
                console.log('trackSearchResultCollection: ', trackSearchResultCollection);
            
                var tracksListView = new TracksListView({
                    collection: trackSearchResultCollection,
                    ModelView: TrackRowView
                });
            
                page.append(tracksListView, 'main');
                
            });

        });
        
        // listen for search events
        eventsManager.on('search:query', function(parameters, context) {
            
            handleSearch(parameters.queryString, function(error, results) {

                trackSearchResultCollection.reset();

                if (!error) {
                    
                    _.each(results, function(value, key) {

                        var trackSearchResultModel = new TrackSearchResultModel(value);

                        trackSearchResultCollection.add(trackSearchResultModel);

                    });

                } else {
                    
                    //TODO: handle the error
                    
                    console.log('errorThrown: ', error);
                    
                }

            });
            
        });
        
    };
    
    var jqXHR;
    
    var handleSearch = function handleSearchFunction(queryString, callback) {
        
        // TODO: filter query string

        var configuration = configurationModule.get('development');

        // abort previous request if it is still ongoing
        if (jqXHR !== undefined && jqXHR.readyState !== 4) {

            jqXHR.abort();

            console.log('aborted');

        }

        jqXHR = $.ajax({
            url: configuration.server.path + '/api/search',
            type: 'GET',
            data: { q: queryString },
            dataType: 'json'
        });

        jqXHR.done(function(dataJson, textStatus, jqXHR) {

            //utilities.log(dataJson);
            //utilities.log(textStatus);
            //utilities.log(jqXHR);

            callback(false, dataJson.results);

        });

        jqXHR.fail(function(jqXHR, textStatus, errorThrown) {

            //utilities.log(jqXHR);
            //utilities.log(textStatus);
            //utilities.log(errorThrown);

            callback(errorThrown);

        });
        
    };

    return {
        index: indexAction
    };
    
});