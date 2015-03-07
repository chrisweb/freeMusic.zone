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
        
        _.each(getMe, function(playlistId) {
            
            var existingPlaylistModel = playlistsCollection.get(playlistId);

            // check if the playlist is not already in the playlistManager
            // playlists collection
            if (existingPlaylistModel === undefined) {
                
                
                
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
        nextTrack: nextTrack
    };
    
});