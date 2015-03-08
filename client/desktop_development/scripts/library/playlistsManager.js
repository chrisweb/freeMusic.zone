/**
 * 
 * tracks manager
 * 
 * @param {type} _
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} PlaylistsCollection
 * @param {type} tracksManager
 * 
 * @returns {_L17.Anonym$2}
 */
define([
    'underscore',
    'chrisweb.utilities',
    'library.eventsManager',
    'collections.Playlists',
    'library.tracksManager'
    
], function (_, utilities, EventsManager, PlaylistsCollection, tracksManager) {
    
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
                
                var playlistTracksCollection = playlistModel.get('playlistTracksCollection');
                
                if (playlistTracksCollection !== null) {
                
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

                                    _.each(tracksArray, function(trackData) {

                                        // get the playlistTrack model
                                        var playlistTrack = collection.get(trackData.get('id'));

                                        // put the trackData into the playlistTrack
                                        // model
                                        playlistTrack.set('trackModel', trackData);

                                    });

                                }

                            });

                        }
                    });
                    
                }

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
        
        var fetchMe = [];
        var playlistsAlreadyLoaded = [];
        
        _.each(getMe, function eachGetMeCallback(playlistId) {
            
            var existingPlaylistModel = playlistsCollection.get(playlistId);
            
            // check if the playlist is not already in the playlistManager
            // playlists collection
            if (existingPlaylistModel === undefined) {
                
                fetchMe.push(playlistId);
                
            } else {
                
                playlistsAlreadyLoaded.push(existingPlaylistModel);
                
            }
            
        });
        
        if (fetchMe.length > 0) {
            
            fetch(fetchMe, function(error, serverPlaylistssArray) {
                
                if (!error) {
                
                    var returnMe = playlistsAlreadyLoaded.concat(serverPlaylistssArray);
                    
                    callback(false, returnMe);
                    
                }
                
            });
            
        } else {
            
            callback(false, playlistsAlreadyLoaded);
            
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
     * fetch a list of playlists, the playlists list of a page or of a user
     * this is a different method then get, because here we don't know the
     * playlist ids, we have to ask the server which playlists need to get
     * fetched
     * 
     * @param {type} options
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var fetchList = function fetchListFunction(options, callback) {
        
        utilities.log('[PLAYLISTSMANAGER] fetch the list data from the server, options:', options);
        
        var playlistsCollection = new PlaylistsCollection();
        
        playlistsCollection.fetch({
            data: {
                whereKey: options.whereKey,
                whereValue: options.whereValue
            },
            error: function(collection, response, options) {

                utilities.log(collection, response, options);
                
                callback('error fetching playlist(s), status: ' + response.status);

            },
            success: function(collection, response, options) {

                utilities.log(collection, response, options);
                
                var playlistsIds = [];
                
                _.each(collection.models, function(playlistModel, index) {
                    
                    playlistsIds.push(playlistModel.get('id'));
                    
                    // does the option withTracks exist
                    if (_.has(options, 'withTracks')) {
                        
                        // withTracks is first, get the tracks of the first playlist
                        if (options.withTracks === 'first' && index === 0) {
                            
                            playlistModel.set('playlistTracksCollection', '');
                            
                            add(playlistModel);
                            
                        } else if (options.withTracks === 'all') {
                            
                            // TODO: handle situation where all playlists
                            // require their tracks data
                            
                        }

                    } else {
                        
                        add(playlistModel);
                        
                    }
                    
                });
                
                callback(false, playlistsIds);
                
            }
        });
        

        
    };
    
    /**
     * 
     * get a list of playlists
     * 
     * @param {type} listName
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var getPlaylistsList = function getPlaylistsListFunction(listName, callback) {
        
        
        
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