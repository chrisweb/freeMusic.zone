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
 * @param {type} eventsManager
 * @param {type} TracksCacheCollection
 * @param {type} moment
 * @returns {_L17.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'ribs.eventsManager',
    'collections.TracksCache',
    'moment'
], function (utilities, eventsManager, TracksCacheCollection, moment) {
    
    'use strict';
    
    var tracksCacheCollection;
    
    var start = function startFunction() {
        
        tracksCacheCollection = new TracksCacheCollection();
        
        // sort the models of the collection by loading timestamp
        tracksCacheCollection.comparator = 'loadedAt';
        
    };

    var addTrack = function addTrackFunction(trackModel) {
        
        if (tracksCacheCollection.get(trackModel.get('id')) === undefined) {
        
            tracksCacheCollection.add(trackModel);
            
        }
        
    };

    var fetchTrack = function fetchTrackFunction(trackId) {
 
        var trackModel = tracksCacheCollection.get(trackId);
 
        if (trackModel === undefined) {
        
            // TODO: fetch the track from the server
            
            utilities.log('fetch the track from the server');
            
        }
        
        return trackModel;
        
    };
    
    // TODO: need to call this function somewhere at some interval
    var clearUnused = function clearUnusedFunction() {
        
        tracksCacheCollection.each(function(trackModel) {
            
            if (trackModel.get('usageCounter') === 0) {
                
                tracksCacheCollection.remove(trackModel);
                
            }
            
        });
        
    };
    
    var soundsGarbageCollector = function soundsGarbageCollectorFunction() {
        
        var loadedSongs = tracksCacheCollection.where({ loaded: true });
        
        if (loadedSongs.length > 10) {
            
            // TODO: unload a song and then call this function again
            
            utilities.log('WE NEED TO FREE SOME MEMORY', 'fontColor:red');
            utilities.log(loadedSongs);
            
        }
        
    };
    
    eventsManager.on('trackRowView:onInitialize', function incrementUsage(parameters) {
        
        var trackModel = tracksCacheCollection.get(parameters.id);
        
        trackModel.set('usageCounter', trackModel.get('usageCounter')+1);
        
    });
    
    eventsManager.on('trackRowView:onInitializeClose', function decrementUsage(parameters) {
        
        var trackModel = tracksCacheCollection.get(parameters.id);
        
        trackModel.set('usageCounter', trackModel.get('usageCounter')-1);
        
    });
    
    eventsManager.on('sound:onload', function setLoaded(parameters) {
        
        var trackModel = tracksCacheCollection.get(parameters.id);
        
        trackModel.set('loaded', true);
        
        var timestamp = moment().unix();
        
        trackModel.set('loadedAt', timestamp);
        
        soundsGarbageCollector();
        
    });

    return {
        start: start,
        fetchTrack: fetchTrack,
        addTrack: addTrack,
        clearUnused: clearUnused
    };
    
});