/**
 * 
 * collaborative playlists manager
 * 
 * @param {type} _
 * @param {type} utilities
 * @param {type} EventsLibrary
 * @param {type} collaborativePlaylistsCollection
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
    'collections.CollaborativePlaylists',
    'models.CollaborativePlaylist',
    'collections.PlaylistsList',
    'manager.tracks',
    'collections.PlaylistTracks',
    'async'

], function (
    _,
    utilities,
    EventsLibrary,
    CollaborativePlaylistsCollection,
    CollaborativePlaylistModel,
    PlaylistsListCollection,
    tracksManager,
    PlaylistTracksCollection,
    async
) {
    
    'use strict';
    
    // the collection which contains all the playlists of the app
    var collaborativePlaylistsCollection;
    
    // are the listeners already on
    var alreadyListening = false;
    
    /**
     * 
     * initialize the tracks cache manager
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        collaborativePlaylistsCollection = new CollaborativePlaylistsCollection();
        
        // avoid duplicate listeners
        if (!alreadyListening) {
        
            startListening();
            
        }
        
    };

    /**
     * 
     * add one or more collaborative playlist(s) to the collaborative playlists manager
     * 
     * @param {type} addMe
     * @returns {undefined}
     */
    var add = function addFunction(addMe, callback) {
        
        if (!_.isArray(addMe)) {
            
            addMe = [addMe];
            
        }
        
        var modelsToAdd = [];
        
        _.each(addMe, function addEach(collaborativePlaylistModel) {
        
            var existingCollaborativePlaylistModel = collaborativePlaylistsCollection.get(collaborativePlaylistModel.get('id'));

            // check if the collaborative playlist is not already in the collaborative playlistManager
            if (existingCollaborativePlaylistModel === undefined) {

                modelsToAdd.push(collaborativePlaylistModel);
                
            }
            
        });

        collaborativePlaylistsCollection.add(modelsToAdd);

        if (callback) {

            callback(false, addMe);

        }
        
    };
    
    var saveOne = function saveOneFunction(saveMe, callback) {

        var collaborativePlaylistModel = new CollaborativePlaylistModel(saveMe);
        
        collaborativePlaylistModel.save(
            saveMe,
            {
                error: function (model, response, options) {
        
                    //utilities.log(model, response, options);
        
                    callback('error while saving a collaborative playlist, status: ' + response.status);
                
                },
                success: function (model, response, options) {
                    
                    //utilities.log(model, response, options);
                    
                    add(model, callback);
                
                }
            });
        
    };
    
    var save = function saveFunction(saveMe, callback) {
        
        

    };
    
    /**
     * 
     * get one or more collaborative playlist(s)
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
            
        _.each(getMe, function eachGet(getMeCollaborativePlaylist) {
            
            var getMeObject;
            
            // if its an id and not yet an object, then create the object
            if (!_.isObject(getMeCollaborativePlaylist)) {
                
                getMeObject = {
                    collaborativePlaylistId: getMeCollaborativePlaylist,
                    withPlaylistTracks: false
                };
                
                getMeObjects.push(getMeObject);
                
            } else {
                
                if (
                    _.has(getMePlaylist, 'collaborativePlaylistId')
                    && _.has(getMePlaylist, 'withPlaylistTracks')
                ) {
                
                    getMeObjects.push(getMeCollaborativePlaylist);
                    
                } else {
                    
                    callback('one or more properties are missing');
                    
                }
                
            }
            
        });
        
        var fetchMe = [];
        var collaborativePlaylistsAlreadyLoaded = [];
        
        // are there any playlists that need to get fetched or are they all
        // already available in the client
        _.each(getMeObjects, function eachGetMeObjectsCallback(getMeObject) {
            
            // get the playlist from collection, undefined if it doesnt exist
            var existingCollaborativePlaylistModel = collaborativePlaylistsCollection.get(getMeObject.collaborativePlaylistId);
            
            // check if the playlist is not already in the playlistManager
            // playlists collection
            if (existingCollaborativePlaylistModel === undefined) {
                
                fetchMe.push(getMeObject.collaborativePlaylistId);
                
            } else {
                
                collaborativePlaylistsAlreadyLoaded.push(existingCollaborativePlaylistModel);
                
            }
            
        });
        
        // did we find playlists that need to get fetched
        if (fetchMe.length > 0) {
            
            fetch(fetchMe, function(error, serverCollaborativePlaylistsArray) {
                
                if (!error) {
                    
                    var returnMe = collaborativePlaylistsAlreadyLoaded.concat(serverCollaborativePlaylistsArray);
                    
                    getCollaborativePlaylistTracks(returnMe, getMeObjects, callback);
                    
                } else {
                    
                    callback(error);
                    
                }
                
            });
            
        } else {
            
            getCollaborativePlaylistTracks(collaborativePlaylistsAlreadyLoaded, getMeObjects, callback);
            
        }
        
    };
    
    /**
     * 
     * we don't have the collaborative playlist(s), fetch it/them from the server
     * 
     * @param {type} fetchMe
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var fetch = function fetchFunction(fetchMe, callback) {
        
        utilities.log('[COLLABORATIVE PLAYLISTS MANAGER] fetch the playlist(s) data from the server, fetchMe:', fetchMe);
        
        collaborativePlaylistsCollection.fetch({
            data: {
                collaborativePlaylistsIds: fetchMe
            },
            error: function(collection, response, options) {
                
                //utilities.log(collection, response, options);
                
                callback('error fetching collaborative playlist(s), status: ' + response.status);
                
            },
            success: function(collection, response, options) {
                
                //utilities.log(collection, response, options);
                
                callback(false, collection.models);
                
            }
        });
        
    };
    
    /**
     * 
     * fetch a list of collaborative playlists ids of a page or of a user
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
        
        utilities.log('[COLLABORATIVE PLAYLISTS MANAGER] fetch the list data from the server, options:', options);
        
        var collaborativePlaylistsListCollection = new collaborativePlaylistsListCollection();
        
        collaborativePlaylistsListCollection.comparator = 'name';
        
        var fetchQuery = {
            whereKey: options.whereKey,
            whereValue: options.whereValue
        };
        
        collaborativePlaylistsListCollection.fetch({
            data: fetchQuery,
            error: function(collection, response, options) {

                utilities.log(collection, response, options);
                
                callback('error fetching collaborative playlists list, status: ' + response.status);

            },
            success: function(collection, response, options) {

                utilities.log(collection, response, options);
                
                var collaborativePlaylistsIds = [];
                
                _.each(collection.models, function(collaborativePlaylistModel, index) {
                    
                    // note to self: we only need the IDs, as we will return
                    // the list of IDs so that later on we can use
                    // playlistManager.get to get the playlist data, but it's
                    // not possible with the API as is to just get the IDs
                    collaborativePlaylistsIds.push(collaborativePlaylistModel.get('id'));
                    
                });
                
                callback(false, collaborativePlaylistsIds);
                
            }
        });
        
    };
    
    /**
     * 
     * get collaborative playlist tracks (private)
     * 
     * @param {type} playlistModelsArray
     * @param {type} getMeObjects
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var getCollaborativePlaylistTracks = function getCollaborativePlaylistTracksFunction(collaborativePlaylistModelsArray, getMeObjects, callback) {
        
        var asynchronousCollaborativePlaylistTracksQueries = [];
        
        // build an array of playlistTracks query functions
        _.each(collaborativePlaylistModelsArray, function(collaborativePlaylistModel) {
            
            var getMeObject = _.findWhere(getMeObjects, { collaborativePlaylistId: collaborativePlaylistModel.get('id') });
            
            if (getMeObject.withPlaylistTracks) {
                
                asynchronousCollaborativePlaylistTracksQueries.push(function(callbackForAsync) {
                    
                    getCollaborativePlaylistTracksQuery(collaborativePlaylistModel, callbackForAsync);
                    
                });
                
            }
            
        });
        
        if (asynchronousCollaborativePlaylistTracksQueries.length > 0) {
        
            // execute all the getCollaborativePlaylistTracks queries asynchronously
            async.parallel(asynchronousCollaborativePlaylistTracksQueries, function(error, results){

                if (!error) {

                    callback(false, results);

                } else {

                    callback(error);

                }

            });
            
        } else {
            
            callback(false, collaborativePlaylistModelsArray);
            
        }
        
    };
    
    /**
     * 
     * get collaborativePlaylistTracks query (private)
     * 
     * @param {type} collaborativePlaylistModel
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var getCollaborativePlaylistTracksQuery = function getCollaborativePlaylistTracksQueryFunction(collaborativePlaylistModel, callback) {
        
        var collaborativePlaylistTracksCollection = new CollaborativePlaylistTracksCollection([], { collaborativePlaylistId: collaborativePlaylistModel.get('id') });

        // get all the tracks needed by this collaborative playlist
        collaborativePlaylistTracksCollection.fetch({
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

                            // get the collaborative playlistTrack model
                            // note to self: a collaborative playlist track is
                            // not the same as a track, the track
                            // only contains the universal track
                            // informations but the collaborativePlaylistTrack
                            // contains collaborative playlist specific
                            // informations about the track, like
                            // it's position inside of the collaborative playlist,
                            // the date it got added to the collaborative playlist,
                            // or data like the userId of the user
                            // that added the track to the collaborative playlist
                            var collaborativePlaylistTrack = collection.get(trackData.get('id'));

                            // put the trackData into the
                            // collaborativePlaylistTrack model
                            collaborativePlaylistTrack.set({
                                trackModel: trackData
                            });

                        });
                        
                        collaborativePlaylistModel.set({
                            collaborativePlaylistTracksCollection: collection
                        });
                        
                        callback(false, collaborativePlaylistModel);

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
        
        EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_MANAGER_ADD, function addPlaylistEventFunction(attributes) {
            
            add(attributes.model);
            
        });

        EventsLibrary.on(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_MANAGER_GET, function getEventFunction(attributes) {
            
            var collaborativePlaylistsIds = attributes.ids;

            get(collaborativePlaylistsIds, function getCollaborativePlaylistsManagerCallback() {
                
                //EventsLibrary.trigger

            });
            
        });
        
    };
    
    /**
     * 
     * get the next track in the collaborative playlist
     * 
     * @returns {undefined}
     */
    var nextTrack = function nextTrackFunction() {
        
        
        
    };
    
    return {
        initialize: initialize,
        add: add,
        save: save,
        saveOne: saveOne,
        get: get,
        fetch: fetch,
        fetchList: fetchList,
        nextTrack: nextTrack
    };
    
});
