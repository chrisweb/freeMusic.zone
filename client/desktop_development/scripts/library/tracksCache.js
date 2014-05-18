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
 * @param {type} TracksCacheCollection
 * @returns {_L14.Anonym$1}
 */
define([
    'collections.TracksCache'
], function (TracksCacheCollection) {
    
    'use strict';
    
    var tracksCacheCollection;
    
    var start = function startFunction() {
        
        tracksCacheCollection = new TracksCacheCollection;
        
    };

    var fetchTrack = function fetchTrackFunction(trackId, incement) {
 
        var trackModel = tracksCacheCollection.get(trackId);
 
        if (trackModel === undefined) {
        
            // TODO: fetch the track from the server
            
        }
        
        if (incement === true) {
        
            // incement the usage counter
            this.incrementUsage(trackModel);
            
        }
        
        return trackModel;
        
    };
    
    var addTrack = function addTrackFunction(trackModel, incement) {
        
        if (!tracksCacheCollection.contains(trackModel.get('id'))) {
        
            tracksCacheCollection.add(trackModel);
            
        }
        
        if (incement === true) {
        
            // incement the usage counter
            this.incrementUsage(trackModel);
            
        }
        
    };
    
    var incrementUsage = function incrementUsageFunction(trackModel) {
        
        trackModel.set('usageCounter', trackModel.get('usageCounter')+1);
        
    };
    
    var decrementUsage = function incrementUsageFunction(trackModel) {
        
        trackModel.set('usageCounter', track.get('usageCounter')-1);
        
    };
    
    var clearUnused = function clearUnusedFunction() {
        
        tracksCacheCollection.each(function(trackModel) {
            
            if (trackModel.get('usageCounter') === 0) {
                
                tracksCacheCollection.remove(trackModel);
                
            }
            
        });
        
    };

    return {
        start: start,
        fetchTrack: fetchTrack,
        addTrack: addTrack,
        incrementUsage: incrementUsage,
        decrementUsage: decrementUsage,
        clearUnused: clearUnused
    };
    
});