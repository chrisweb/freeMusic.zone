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
     * @param {type} trackModel
     * @returns {undefined}
     */
    var addTrack = function addTrackFunction(trackModel) {
        
        if (tracksCacheCollection.get(trackModel.get('id')) === undefined) {
        
            tracksCacheCollection.add(trackModel);
            
        }
        
    };

    /**
     * 
     * @param {type} trackId
     * @returns {unresolved}
     */
    var fetchTrack = function fetchTrackFunction(trackId) {
 
        var trackModel = tracksCacheCollection.get(trackId);
 
        if (trackModel === undefined) {
        
            // TODO: fetch the track from the server
            
            utilities.log('fetch the track from the server');
            
        }
        
        return trackModel;
        
    };
    
    /**
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
     * @returns {undefined}
     */
    var startListening = function startListeningFunction() {
        
        EventsManager.on(EventsManager.constants.TRACKROW_VIEW_ON_INITIALIZE, function incrementUsage(parameters) {

            var trackModel = tracksCacheCollection.get(parameters.id);

            trackModel.set('usageCounter', trackModel.get('usageCounter')+1);

        });

        EventsManager.on(EventsManager.constants.TRACKROW_VIEW_ON_CLOSE, function decrementUsage(parameters) {

            var trackModel = tracksCacheCollection.get(parameters.id);

            trackModel.set('usageCounter', trackModel.get('usageCounter')-1);

        });

        EventsManager.on(EventsManager.constants.SOUND_ONLOAD, function setLoaded(parameters) {

            var trackModel = tracksCacheCollection.get(parameters.id);

            trackModel.set('loaded', true);

            var timestamp = moment().unix();

            trackModel.set('loadedAt', timestamp);

            soundsGarbageCollector();

        });
        
    };

    return {
        initialize: initialize,
        fetchTrack: fetchTrack,
        addTrack: addTrack,
        clearUnused: clearUnused
    };
    
});