/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * tracks manager
 * 
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} TracksCacheCollection
 * @param {type} moment
 * 
 * @returns {_L17.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'library.eventsManager',
    'collections.TracksCache',
    'moment'
    
], function (utilities, EventsManager, TracksCacheCollection, moment) {
    
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
        
        playlistsCollection = new TracksCacheCollection();
        
        // avoid duplicate listeners
        if (!alreadyListening) {
        
            startListening();
            
        }
        
    };

    /**
     * 
     * add a playlist to the playlists manager
     * 
     * @param {type} playlistModel
     * @returns {undefined}
     */
    var addPlaylist = function addPlaylistFunction(playlistModel) {
        
        var existingPlaylistModel = playlistsCollection.get(playlistModel.get('id'));
        
        // check if the playlist is not already in the collection
        if (existingPlaylistModel === undefined) {
            
            playlistsCollection.add(playlistModel);
            
        }
        
    };
    
    /**
     * 
     * start listening for events
     * 
     * @returns {undefined}
     */
    var startListening = function startListeningFunction() {
        
        alreadyListening = true;
        
        EventsManager.on(EventsManager.constants.PLAYLISTS_MANAGER_ADD, function incrementUsage(attributes) {
            
            addPlaylist(attributes.model);
            
        });
        
    };
    
    return {
        initialize: initialize,
        addPlaylist: addPlaylist
    };
    
});