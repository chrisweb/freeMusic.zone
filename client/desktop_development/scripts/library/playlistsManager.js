/**
 * 
 * tracks manager
 * 
 * @param {type} _
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} PlaylistsCollection
 * @param {type} PlaylistsListCollection
 * @param {type} tracksManager
 * @param {type} PlaylistTracksCollection
 * async
 * 
 * @returns {_L17.Anonym$2}
 */
define([
    'underscore',
    'chrisweb.utilities',
    'library.eventsManager',
    'collections.Playlists',
    'collections.PlaylistsList',
    'library.tracksManager',
    'collections.PlaylistTracks',
    'async'
    
], function (_, utilities, EventsManager, PlaylistsCollection, PlaylistsListCollection, tracksManager, PlaylistTracksCollection, async) {
    
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
        
        _.each(addMe, function(playlistModel) {
        
            var existingPlaylistModel = playlistsCollection.get(playlistModel.get('id'));

            // check if the playlist is not already in the playlistManager
            // playlists collection
            if (existingPlaylistModel === undefined) {

                playlistsCollection.add(playlistModel);
                
            }
            
        });
        
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
                    withPlaylistTracks: false
                };
                
                getMeObjects.push(getMeObject);
                
            } else {
                
                if (
                    _.has(getMePlaylist, 'playlistId')
                    && _.has(getMePlaylist, 'withPlaylistTracks')
                ) {
                
                    getMeObjects.push(getMePlaylist);
                    
                } else {
                    
                    callback('one or more properties are missing');
                    
                }
                
            }
            
        });
        
        var fetchMe = [];
        var playlistsAlreadyLoaded = [];
        
        // are there any playlists that need to get fetched or are they all
        // already available in the client
        _.each(getMeObjects, function eachGetMeObjectsCallback(getMeObject) {
            
            // get the playlist from collection, undefined if it doesnt exist
            var existingPlaylistModel = playlistsCollection.get(getMeObject.playlistId);
            
            // check if the playlist is not already in the playlistManager
            // playlists collection
            if (existingPlaylistModel === undefined) {
                
                fetchMe.push(getMeObject.playlistId);
                
            } else {
                
                playlistsAlreadyLoaded.push(existingPlaylistModel);
                
            }
            
        });
        
        // did we find playlists that need to get fetched
        if (fetchMe.length > 0) {
            
            fetch(fetchMe, function(error, serverPlaylistsArray) {
                
                if (!error) {
                    
                    var returnMe = playlistsAlreadyLoaded.concat(serverPlaylistsArray);
                    
                    getPlaylistTracks(returnMe, getMeObjects, callback);
                    
                } else {
                    
                    callback(error);
                    
                }
                
            });
            
        } else {
            
            getPlaylistTracks(playlistsAlreadyLoaded, getMeObjects, callback);
            
        }
        
    };
    
    /**
     * 
     * we don't have the playlist(s), fetch it/them from the server
     * 
     * @param {type} fetchMe
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var fetch = function fetchFunction(fetchMe, callback) {
        
        utilities.log('[PLAYLISTSMANAGER] fetch the playlist(s) data from the server, fetchMe:', fetchMe);
        
        var playlistsCollection = new PlaylistsCollection();
        
        playlistsCollection.fetch({
            data: {
                playlistsIds: fetchMe
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
     * fetch a list of playlists ids of a page or of a user
     * 
     * this is a different method then fetch, because here we don't know the
     * playlist ids, we have to ask the server which playlists need to get
     * fetched, we don't fetch the playlist data, just the ids of the playlists
     * 
     * we don't fetch all the playlist data as the playlist data may already be
     * in the client cache because if got loaded previously
     * 
     * @param {type} options
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var fetchList = function fetchListFunction(options, callback) {
        
        utilities.log('[PLAYLISTSMANAGER] fetch the list data from the server, options:', options);
        
        var playlistsListCollection = new PlaylistsListCollection();
        
        playlistsListCollection.comparator = 'name';
        
        var fetchQuery = {
            whereKey: options.whereKey,
            whereValue: options.whereValue
        };
        
        playlistsListCollection.fetch({
            data: fetchQuery,
            error: function(collection, response, options) {

                utilities.log(collection, response, options);
                
                callback('error fetching playlists list, status: ' + response.status);

            },
            success: function(collection, response, options) {

                utilities.log(collection, response, options);
                
                var playlistsIds = [];
                
                _.each(collection.models, function(playlistModel, index) {
                    
                    // note to self: we only need the IDs, as we will return
                    // the list of IDs so that later on we can use
                    // playlistManager.get to get the playlist data, but it's
                    // not possible with the API as is to just get the IDs
                    playlistsIds.push(playlistModel.get('id'));
                    
                });
                
                callback(false, playlistsIds);
                
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
    var getPlaylistTracks = function getPlaylistTracksFunction(playlistModelsArray, getMeObjects, callback) {
        
        var asynchronousPlaylistTracksQueries = [];
        
        // build an array of playlistTracks query functions
        _.each(playlistModelsArray, function(playlistModel) {
            
            var getMeObject = _.findWhere(getMeObjects, { playlistId: playlistModel.get('id') });
            
            if (getMeObject.withPlaylistTracks) {
                
                asynchronousPlaylistTracksQueries.push(function(callbackForAsync) {
                    
                    getPlaylistTracksQuery(playlistModel, callbackForAsync);
                    
                });
                
            }
            
        });
        
        if (asynchronousPlaylistTracksQueries.length > 0) {
        
            // execute all the getPlaylistTracks queries asynchronously
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
    var getPlaylistTracksQuery = function getPlaylistTracksQueryFunction(playlistModel, callback) {
        
        var playlistTracksCollection = new PlaylistTracksCollection([], { playlistId: playlistModel.get('id') });

        // get all the tracks needed by this playlist
        playlistTracksCollection.fetch({
            error: function(collection, response, options) {

                utilities.log(collection, response, options);

            },
            success: function(collection, response, options) {

                //utilities.log(collection, response, options);

                var tracksList = [];

                // get all the track ids
                _.each(collection.models, function(model) {

                    tracksList.push(model.get('id'));

                });

                tracksManager.get(tracksList, function(error, tracksArray) {

                    if (!error) {

                        _.each(tracksArray, function(trackData, index) {

                            // get the playlistTrack model
                            // note to self: a playlist track is
                            // not the same as a track, the track
                            // only contains the universal track
                            // informations but the playlistTrack
                            // contains playlist specific
                            // informations about the track, like
                            // it's position inside of the playlist,
                            // the date it got added to the playlist,
                            // or data like the userId of the user
                            // that added the track to the playlist
                            var playlistTrack = collection.get(trackData.get('id'));

                            // put the trackData into the
                            // playlistTrack model
                            playlistTrack.set({
                                trackModel: trackData
                            });

                        });
                        
                        playlistModel.set({
                            playlistTracksCollection: collection
                        });
                        
                        callback(false, playlistModel);

                    } else {

                        callback(error);

                    }

                });

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
        
        EventsManager.on(EventsManager.constants.PLAYLISTS_MANAGER_ADD, function addPlaylistEventFunction(attributes) {
            
            add(attributes.model);
            
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