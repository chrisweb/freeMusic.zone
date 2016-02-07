/**
 * 
 * playlists manager
 * 
 * @param {type} _
 * @param {type} utilities
 * @param {type} EventsLibrary
 * @param {type} PlaylistsCollection
 * @param {type} PlaylistsListCollection
 * @param {type} tracksManager
 * @param {type} PlaylistTracksCollection
 * @param {type} async
 * 
 * @returns {_L17.Anonym$2}
 */
define([
    'underscore',
    'chrisweb-utilities',
    'library.events',
    'collections.Playlists',
    'collections.PlaylistsList',
    'manager.tracks',
    'collections.PlaylistTracks',
    'async'

], function (
    _,
    utilities,
    EventsLibrary,
    PlaylistsCollection,
    PlaylistsListCollection,
    tracksManager,
    PlaylistTracksCollection,
    async
) {
    
    'use strict';
    
    // the collection which contains all the playlists of the app
    var playlistsCollection;
    
    // are the listeners already on
    var alreadyListening = false;
    
    /**
     * 
     * initialize the tracks cache manager
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        playlistsCollection = new PlaylistsCollection();
        
        // avoid duplicate listeners
        if (!alreadyListening) {
        
            startListening();
            
        }
        
    };

    /**
     * 
     * add one or more playlist(s) to the playlists manager
     * 
     * @param {type} addMe
     * @returns {undefined}
     */
    var add = function addFunction(addMe) {
        
        if (!_.isArray(addMe)) {
            
            addMe = [addMe];
            
        }
        
        var modelsToAdd = [];
        
        _.each(addMe, function(playlistModel) {
        
            var existingPlaylistModel = playlistsCollection.get(playlistModel.get('id'));

            // check if the playlist is not already in the playlistManager
            // playlists collection
            if (existingPlaylistModel === undefined) {

                modelsToAdd.push(playlistModel);
                
            }
            
        });

        playlistsCollection.add(modelsToAdd);
        
    };
    
    /**
     * 
     * get one or more playlist(s)
     * 
     * @param {type} getMe
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var get = function getFunction(getMe, callback) {
        
        if (!_.isArray(getMe)) {
            
            getMe = [getMe];
            
        }
        
        var getMeObjects = [];
            
        _.each(getMe, function eachGetMeCallback(getMePlaylist) {
            
            var getMeObject;
            
            // if its an id and not yet an object, then create the object
            if (!_.isObject(getMePlaylist)) {
                
                getMeObject = {
                    playlistId: getMePlaylist,
                    withTracksList: false
                };
                
                getMeObjects.push(getMeObject);
                
            } else {
                
                if (
                    _.has(getMePlaylist, 'playlistId')
                    && _.has(getMePlaylist, 'withTracksList')
                ) {
                
                    getMeObjects.push(getMePlaylist);
                    
                } else {
                    
                    callback('one or more properties are missing');
                    
                }
                
            }
            
        });
        
        var fetchMeObjectsArray = [];
        var playlistsAlreadyLoaded = [];
        
        // are there any playlists that need to get fetched or are they all
        // already available in the client
        _.each(getMeObjects, function eachGetMeObjectsCallback(getMeObject) {
            
            // get the playlist from collection, undefined if it doesnt exist
            var existingPlaylistModel = playlistsCollection.get(getMeObject.playlistId);
            
            // check if the playlist is not already in the playlistManager
            // playlists collection
            if (existingPlaylistModel === undefined) {
                
                fetchMeObjectsArray.push(getMeObject.playlistId);
                
            } else {
                
                playlistsAlreadyLoaded.push(existingPlaylistModel);
                
            }
            
        });
        
        // did we find playlists that need to get fetched
        if (fetchMeObjectsArray.length > 0) {
            
            fetch(fetchMeObjectsArray, function(error, serverPlaylistsArray) {
                
                if (!error) {
                    
                    var returnMe = playlistsAlreadyLoaded.concat(serverPlaylistsArray);
                    
                    getTracksList(returnMe, getMeObjects, callback);
                    
                } else {
                    
                    callback(error);
                    
                }
                
            });
            
        } else {
            
            getTracksList(playlistsAlreadyLoaded, getMeObjects, callback);
            
        }
        
    };
    
    /**
     * 
     * we don't have the playlist(s), fetch it/them from the server
     * 
     * @param array fetchMeObjectsArray
     * @param function callback
     * 
     * @returns {undefined}
     */
    var fetch = function fetchFunction(fetchMeObjectsArray, callback) {
        
        utilities.log('[PLAYLISTSMANAGER] fetch the playlist(s) data from the server, fetchMeObjectsArray:', fetchMeObjectsArray);
        
        var playlistsCollection = new PlaylistsCollection();
        
        playlistsCollection.fetch({
            data: {
                fetchMeObjectsArray: fetchMeObjectsArray
            },
            error: function(collection, response, options) {
                
                //utilities.log(collection, response, options);
                
                callback('error fetching playlist(s), status: ' + response.status);
                
            },
            success: function(collection, response, options) {
                
                //utilities.log(collection, response, options);
                
                callback(false, collection.models);
                
            }
        });
        
    };
    
    /**
     * 
     * fetch a list of entity ids of a page, of a user based on some query parameters
     * 
     * this is a different method then fetch, because here we don't know the
     * entity ids, we have to ask the server which entity match our query, then we need to get
     * those entites in another query
     * 
     * we don't fetch all the entity data as the entity data may already be
     * in the client cache, it might have been fetched previously
     * 
     * list can / should have a lot lower expiry time then entity, maybe we don't even cache them (at least client side)
     * 
     * @param Object options
     * @param Function callback
     * 
     * @returns void
     */
    var fetchList = function fetchListFunction(options, callback) {
        
        utilities.log('[PLAYLISTSMANAGER] fetch the list data from the server, options:', options);
        
        var playlistsListCollection = new PlaylistsListCollection();
        
        // where
        where = [];
        
        // TODO: allow multiple where key/values
        where.push({
            key: options.whereKey,
            value: options.whereValue,
            operator: '='
        });
        
        // order by
        var defaultComparator = 'id';
        
        if ('comparator' in options) {
            playlistsListCollection.comparator = options.comparator;
        } else {
            playlistsListCollection.comparator = defaultComparator;
        }
        
        // limit
        var limit = '100';
        
        if ('limit' in options) {
            limit = options.limit;
        }
        
        // query parameters
        var queryParameters = {
            where: where,
            comparator: playlistsListCollection.comparator,
            limit: limit
        };
        
        playlistsListCollection.fetch({
            data: queryParameters,
            error: function(collection, response, options) {

                utilities.log(collection, response, options);
                
                callback('error fetching playlists list, status: ' + response.status);

            },
            success: function(collection, response, options) {

                utilities.log(collection, response, options);

                callback(false, collection);
                
            }
        });
        
    };
    
    /**
     * 
     * get playlist tracks (private)
     * 
     * @param {type} playlistModelsArray
     * @param {type} getMeObjects
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var getTracksList = function getTracksListFunction(playlistModelsArray, getMeObjects, callback) {
        
        var asynchronousPlaylistTracksQueries = [];
        
        // build an array of playlistTracks query functions
        _.each(playlistModelsArray, function(playlistModel) {
            
            var getMeObject = _.findWhere(getMeObjects, { playlistId: playlistModel.get('id') });
            
            if (getMeObject.withTracksList) {
                
                asynchronousPlaylistTracksQueries.push(function(callbackForAsync) {
                    
                    getTracksListQuery(playlistModel, callbackForAsync);
                    
                });
                
            }
            
        });
        
        if (asynchronousPlaylistTracksQueries.length > 0) {
        
            // execute all the getTracksList queries asynchronously
            async.parallel(asynchronousPlaylistTracksQueries, function(error, results){

                if (!error) {

                    callback(false, results);

                } else {

                    callback(error);

                }

            });
            
        } else {
            
            callback(false, playlistModelsArray);
            
        }
        
    };
    
    /**
     * 
     * get playlistTracks query (private)
     * 
     * @param {type} playlistModel
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var getTracksListQuery = function getTracksListQueryFunction(playlistModel, callback) {
        
        var playlistTracksCollection = new PlaylistTracksCollection([], { playlistId: playlistModel.get('id') });

        // get all the playlistTracks from this playlist
        playlistTracksCollection.fetch({
            error: function (collection, response, options) {
                
                utilities.log(collection, response, options);

                callback('fetching trackslist failed');

            },
            success: function (collection, response, options) {

                playlistModel.set('tracksList', collection);
                
                callback(false, playlistModel);

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
        
        EventsLibrary.on(EventsLibrary.constants.PLAYLISTS_MANAGER_ADD, function addPlaylistEventFunction(attributes) {
            
            add(attributes.model);
            
        });

        EventsLibrary.on(EventsLibrary.constants.PLAYLISTS_MANAGER_GET, function getEventFunction(attributes) {
            
            var playlistsIds = attributes.ids;

            get(playlistsIds, function getPlaylistsManagerCallback() {
                
                //EventsLibrary.trigger

            });
            
        });
        
    };
    
    /**
     * 
     * get the next track in the playlist
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
        fetchList: fetchList,
        nextTrack: nextTrack
    };
    
});
