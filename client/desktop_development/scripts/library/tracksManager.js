/**
 * 
 * tracks manager
 * 
 * @param {type} utilities
 * @param {type} EventsManager
 * @param {type} TracksCollection
 * @param {type} moment
 * 
 * @returns {_L17.Anonym$2}
 */
define([
    'chrisweb.utilities',
    'library.eventsManager',
    'collections.Tracks',
    'models.Track',
    'moment'
    
], function (utilities, EventsManager, TracksCollection, TrackModel, moment) {
    
    'use strict';
    
    // the collection which contains all the tracks of the app
    var tracksCollection;
    
    // are the listeners already on
    var alreadyListening = false;
    
    /**
     * 
     * initialize the tracks cache manager
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        tracksCollection = new TracksCollection();
        
        // sort the models of the collection by loading timestamp
        tracksCollection.comparator = 'loadedAt';
        
        // avoid duplicate listeners
        if (!alreadyListening) {
            
            startListening();
            
        }
        
    };

    /**
     * 
     * add a track to the tracks cache manager
     * 
     * @param {type} trackModel
     * @returns {undefined}
     */
    var addTrack = function addTrackFunction(trackModel) {
        
        var results = tracksCollection.where({ jamendo_id: trackModel.get('jamendo_id') });
        
        // check if the track is not already in the cache
        if (results.length === 0) {
            
            tracksCollection.add(trackModel);
            
        }
        
    };
    
    /**
     * 
     * get a track from the tracks manager
     * 
     * @param {type} trackId
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    var getTrack = function getTrackFunction(trackId, callback) {
        
        var results = tracksCollection.where({ jamendo_id: trackId });
        
        // check if the track is in the tracksmananger cache
        if (results.length === 0) {
            
            // if its not in the cache, fetch it from server
            fetchTrack(trackId, callback);
            
        } else {
            
            // if the track is already in the trackmanager return it
            callback(results[0]);
            
        }
        
    };

    /**
     * 
     * we don't have that track, fetch it from the server
     * 
     * @param {type} trackId
     * @param {type} callback
     * 
     * @returns {unresolved}
     */
    var fetchTrack = function fetchTrackFunction(trackId, callback) {
        
        // TODO: fetch the track data from the server if its not yet
        // available in the tracks manager
            
        utilities.log('[TRACKSMANAGER] fetch the track data from the server, trackId:' + trackId);
        
        var trackModel = new TrackModel();
        
        trackModel.set({ id: trackId });
        
        trackModel.fetch({
            error: function(model, response, options) {

                //utilities.log(collection, response, options);
                
                callback('error fetching track, status: ' + response.status);

            },
            success: function(model, response, options) {

                //utilities.log(collection, response, options);
                
                callback(false, model);
                
            }
        });
        
    };
    
    /**
     * 
     * remove the track models of all the tracks that don't get used right now
     * 
     * @returns {undefined}
     */
    var clearUnused = function clearUnusedFunction() {
        
        // TODO: need to call this function somewhere at some interval
        
        tracksCollection.each(function(trackModel) {
            
            if (trackModel.get('usageCounter') === 0) {
                
                tracksCollection.remove(trackModel);
                
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
        
        var loadedSongs = tracksCollection.where({ loaded: true });
        
        if (loadedSongs.length > 10) {
            
            // TODO: unload a song and then call this function again
            // when unloading, unload the songs with the lowest usage count
            // first
            
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
        
        alreadyListening = true;
        
        EventsManager.on(EventsManager.constants.TRACKS_MANAGER_USAGE, function incrementUsage(attributes) {
            
            var results = tracksCollection.where({ jamendo_id: attributes.trackId });
            
            if (results.length > 0) {
                
                var trackModel = results[0];
            
                if (trackModel === undefined) {

                    throw 'the tracks cache could not find the track in the collection, did you add the track?';

                }

                if (attributes.action === 'decrement') {

                    trackModel.set('usageCounter', trackModel.get('usageCounter')-1);

                } else if (attributes.action === 'increment') {

                    trackModel.set('usageCounter', trackModel.get('usageCounter')+1);

                }
            
            }
            
        });
        
        EventsManager.on(EventsManager.constants.TRACKS_MANAGER_ADD, function incrementUsage(attributes) {
            
            addTrack(attributes.model);
            
        });
        
        EventsManager.on(EventsManager.constants.SOUND_ONLOAD, function setLoaded(attributes) {
            
            var results = tracksCollection.where({ jamendo_id: attributes.trackId });
            
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
        addTrack: addTrack,
        getTrack: getTrack,
        clearUnused: clearUnused
    };
    
});