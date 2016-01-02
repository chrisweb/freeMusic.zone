/**
 * 
 * search query results manager
 * 
 * @param {type} _
 * @param {type} utilities
 * @param {type} EventsLibrary
 * @param {type} searchQueriesResultsCollection
 * @param {type} tracksManager
 * @param {type} TracksCollection
 * @param {type} async
 * 
 * @returns {_L17.Anonym$2}
 */
define([
    'underscore',
    'chrisweb-utilities',
    'library.events',
    'collections.SearchQueries',
    'manager.tracks',
    'collections.SearchQueryTracks',
    'async',
    'models.SearchQueryResultTrack'

], function (
    _,
    utilities,
    EventsLibrary,
    searchQueriesResultsCollection,
    tracksManager,
    SearchQueryTracksCollection,
    async,
    SearchQueryResultTrackModel
) {
    
    'use strict';
    
    // the collection which contains all the search queries results of the app
    var searchQueriesResultsCollection;
    
    // are the listeners already on
    var alreadyListening = false;
    
    /**
     * 
     * initialize the tracks cache manager
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        searchQueriesResultsCollection = new searchQueriesResultsCollection();
        
        // avoid duplicate listeners
        if (!alreadyListening) {
        
            startListening();
            
        }
        
    };

    /**
     * 
     * add one or more search query / queries result(s) to the search queries results manager
     * 
     * @param {type} addMe
     * @returns {undefined}
     */
    var add = function addFunction(addMe) {
        
        if (!_.isArray(addMe)) {
            
            addMe = [addMe];
            
        }
        
        var modelsToAdd = [];
        
        _.each(addMe, function(searchQueryResultModel) {
        
            var existingSearchQueryResultModel = searchQueriesResultsCollection.get(searchQueryResultModel.get('searchQuery'));

            // check if the model is not already in the manager
            if (existingSearchQueryResultModel === undefined) {

                modelsToAdd.push(searchQueryResultModel);
                
            }
            
        });

        searchQueriesResultsCollection.add(modelsToAdd);
        
    };
    
    /**
     * 
     * get one or more search query / queries result(s)
     * 
     * @param {type} getMe
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var get = function getFunction(getMe, callback) {
        
        utilities.log('[SEARCH QUERIES] get, getMe:', getMe);

        if (!_.isArray(getMe)) {
            
            getMe = [getMe];
            
        }
        
        var getMeObjectsArray = [];
            
        _.each(getMe, function eachGetMeCallback(getMeSearchQuery) {
            
            var getMeObject;
            
            // if its a string and not yet an object, then create the object
            if (!_.isObject(getMeSearchQuery)) {
                
                getMeObject = {
                    searchQuery: getMeSearchQuery,
                    withTracksList: true // search query results by default contain the tracksList, something else seems pretty useless
                };
                
                getMeObjectsArray.push(getMeObject);
                
            } else {
                
                if (
                    _.has(getMeSearchQuery, 'searchQuery')
                    && _.has(getMeSearchQuery, 'withTracksList')
                ) {
                
                    getMeObjectsArray.push(getMeSearchQuery);
                    
                } else {
                    
                    callback('one or more properties are missing');
                    
                }
                
            }
            
        });
        
        var fetchMeObjectsArray = [];
        var searchQueriesResultsAlreadyLoaded = [];
        
        // are there any search queries that need to get fetched or are they all
        // already available in the client
        _.each(getMeObjectsArray, function eachGetMeObjectsArrayCallback(getMeObject) {
            
            // get the query / queries result(s) from query / queries result(s) collection, the response will be
            // undefined if there is not already a model for that search query result in the collection
            var existingsearchQueryResultModel = searchQueriesResultsCollection.where({ query: getMeObject.searchQuery });
            
            // check if the query / queries result(s) is not already in the query / queries result(s) manager
            if (existingsearchQueryResultModel.length === 0) {
                
                fetchMeObjectsArray.push(getMeObject);
                
            } else {
                
                searchQueriesResultsAlreadyLoaded.push(existingsearchQueryResultModel);
                
            }
            
        });
        
        // did we find search query / queries result(s) that need to get fetched
        if (fetchMeObjectsArray.length > 0) {
            
            fetch(fetchMeObjectsArray, function(error, serverSearchQueriesResultsArray) {
                
                if (!error) {
                    
                    var returnMe = searchQueriesResultsAlreadyLoaded.concat(serverSearchQueriesResultsArray);

                    callback(false, returnMe);
                    
                } else {
                    
                    callback(error);
                    
                }
                
            });
            
        }
        
    };
    
    /**
     * 
     * we don't have the search query result yet, fetch it from the server
     * 
     * @param {type} fetchMe
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var fetch = function fetchFunction(fetchMeObjectsArray, callback) {
        
        utilities.log('[SEARCH QUERIES] fetch the search query result from the server, fetchMeObjectsArray:', fetchMeObjectsArray);
        
        if (fetchMeObjectsArray.length > 0) {
            
            var functionsArray = [];

            _.each(fetchMeObjectsArray, function forEachCallback(fetchMeObject) {
                
                functionsArray.push(function callbackFromAsyncFunction(callbackFromAsyncFunction) {
                
                    fetchQuery(fetchMeObject.searchQuery, callbackFromAsyncFunction);
                
                });

            });
            
            // execute all the getCollaborativePlaylistTracks queries asynchronously
            async.parallel(functionsArray, function asyncParallelCallback(error, queryResults) {
                
                if (!error) {
                    
                    callback(false, queryResults);

                } else {
                    
                    callback(error);

                }

            });
            
        }
        
    }
    
    var fetchQuery = function fetchQueryFunction(searchQuery, callback) {
        
        // fetch a model from server
        searchQueriesResultsCollection.fetch({
            data: {
                q: searchQuery
            },
            error: function (collection, response, options) {
            
                //utilities.log(collection, response, options);
            
                callback('error fetching search query result(s), status: ' + response.status);
                
            },
            success: function (collection, response, options) {
            
                //utilities.log(collection, response, options);
                
                var searchQueryModel = collection.first();
                
                var tracksList = new SearchQueryTracksCollection();
                
                // convert the objects into models and add them to the tracksList collection
                _.each(searchQueryModel.get('tracksList'), function eachTracksListCallback(trackData) {
                    
                    var searchQueryResultTrackModel = new SearchQueryResultTrackModel({
                        id: trackData.id,
                        position: trackData.position
                    });

                    tracksList.add(searchQueryResultTrackModel, {
                        silent: true
                    });
                
                });
                
                // add the tracksList to the model
                searchQueryModel.set('tracksList', tracksList);
                
                // return the model
                callback(false, searchQueryModel);
                
            }

        });
        
    };
    
    /**
     * 
     * start listening for events
     * 
     * @returns {undefined}
     */
    var startListening = function startListeningFunction() {
        
        alreadyListening = true;
        
        EventsLibrary.on(EventsLibrary.constants.SEARCH_QUERIES_MANAGER_ADD, function addSearchQueryEventFunction(attributes) {
            
            add(attributes.model);
            
        });

        EventsLibrary.on(EventsLibrary.constants.SEARCH_QUERIES_MANAGER_GET, function getEventFunction(attributes) {
            
            var searchQuery = attributes.searchQuery;

            get(searchQuery, function getSearchQueryCallback() {
                
                //EventsLibrary.trigger

            });
            
        });
        
    };
    
    /**
     * 
     * get the next track of the query
     * 
     * @returns {undefined}
     */
    var nextTrack = function nextTrackFunction() {
        
        
        
    };
    
    return {
        initialize: initialize,
        add: add,
        get: get,
        fetch: fetch,
        nextTrack: nextTrack
    };
    
});
