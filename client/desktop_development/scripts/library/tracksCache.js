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
    
    var tracksCacheCollection;
    
    /**
     * 
     * initialize the tracks cache manager
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        tracksCacheCollection = new TracksCacheCollection();
        
        // sort the models of the collection by loading timestamp
        tracksCacheCollection.comparator = 'loadedAt';
        
        startListening();
        
    };

    /**
     * 
     * add a track to the tracks cache manager
     * 
     * @param {type} trackModel
     * @returns {undefined}
     */
    var addTrack = function addTrackFunction(trackModel) {
        
        var results = tracksCacheCollection.where({ jamendo_id: trackModel.get('jamendo_id') });
        
        // check if the track is not already in the cache
        if (results.length === 0) {
            
            tracksCacheCollection.add(trackModel);
            
        }
        
    };

    /**
     * 
     * we don't have that track, fetch it from the server
     * 
     * @param {type} trackId
     * @returns {unresolved}
     */
    var fetchTrack = function fetchTrackFunction(trackId) {
        
        var results = tracksCacheCollection.where({ jamendo_id: trackId });
        
        var trackModel;
        
        if (results.length === 0) {
            
            // TODO: fetch the track from the server
            
            utilities.log('fetch the track from the server');
            
        } else {
            
            trackModel = results[0];
            
        }
        
        return trackModel;
        
    };
    
    /**
     * 
     * remove the track models of all the tracks that don't get used right now
     * 
     * @returns {undefined}
     */
    var clearUnused = function clearUnusedFunction() {
        
        // TODO: need to call this function somewhere at some interval
        
        tracksCacheCollection.each(function(trackModel) {
            
            if (trackModel.get('usageCounter') === 0) {
                
                tracksCacheCollection.remove(trackModel);
                
            }
            
        });
        
    };
    
    /**
     * 
     * remove the songs from memory that are the least used
     * 
     * @returns {undefined}
     */
    var soundsGarbageCollector = function soundsGarbageCollectorFunction() {
        
        var loadedSongs = tracksCacheCollection.where({ loaded: true });
        
        if (loadedSongs.length > 10) {
            
            // TODO: unload a song and then call this function again
            
            utilities.log('WE NEED TO FREE SOME MEMORY', 'fontColor:red');
            utilities.log(loadedSongs);
            
        }
        
    };
    
    /**
     * 
     * start listening to events
     * 
     * @returns {undefined}
     */
    var startListening = function startListeningFunction() {
        
        EventsManager.on(EventsManager.constants.TRACKSCACHE_TRACK_USAGE, function incrementUsage(parameters) {
            
            var results = tracksCacheCollection.where({ jamendo_id: parameters.trackId });
            
            if (results.length > 0) {
                
                var trackModel = results[0];
            
                if (trackModel === undefined) {

                    throw 'the tracks cache could not find the track in the collection, did you add the track?';

                }

                if (parameters.action === 'decrement') {

                    trackModel.set('usageCounter', trackModel.get('usageCounter')-1);

                } else if (parameters.action === 'increment') {

                    trackModel.set('usageCounter', trackModel.get('usageCounter')+1);

                }
            
            }
            
        });
        
        EventsManager.on(EventsManager.constants.TRACKSCACHE_TRACK_ADD, function incrementUsage(parameters) {
            
            addTrack(parameters.model);
            
        });
        
        EventsManager.on(EventsManager.constants.SOUND_ONLOAD, function setLoaded(parameters) {
            
            var results = tracksCacheCollection.where({ jamendo_id: parameters.trackId });
            
            if (results.length > 0) {
                
                var trackModel = results[0];
            
                trackModel.set('loaded', true);

                var timestamp = moment().unix();

                trackModel.set('loadedAt', timestamp);

                soundsGarbageCollector();
                
            }
            
        });
        
    };
    
    return {
        initialize: initialize,
        fetchTrack: fetchTrack,
        addTrack: addTrack,
        clearUnused: clearUnused
    };
    
});