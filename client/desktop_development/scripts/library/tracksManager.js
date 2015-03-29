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
    
], function (utilities, EventsManager, TracksCollection, moment) {
    
    'use strict';
    
    // the collection which contains all the tracks of the app
    var tracksCollection;
    
    /**
     * 
     * initialize the tracks cache manager
     * 
     * @returns {undefined}
     */
    var initialize = function initializeFunction() {
        
        if (tracksCollection === undefined) {
            
            tracksCollection = new TracksCollection();

            // sort the models of the collection by loading timestamp
            tracksCollection.comparator = 'loadedAt';
            
            startListening();
            
        }
        
    };

    /**
     * 
     * add one or more track(s) to the tracks cache manager
     * 
     * @param {type} addMe
     * @returns {undefined}
     */
    var add = function addFunction(addMe) {
        
        if (!_.isArray(addMe)) {
            
            addMe = [addMe];
            
        }
        
        _.each(addMe, function(trackModel) {
            
            var results = tracksCollection.where({ jamendo_id: trackModel.get('jamendo_id') });
        
            // check if the track is not already in the cache
            if (results.length === 0) {

                tracksCollection.add(trackModel);

            }
            
        });
        
    };
    
    /**
     * 
     * get one or more track(s) from the tracks manager
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
        var tracksAlreadyLoaded = [];
        
        _.each(getMe, function(trackId) {
        
            var results = tracksCollection.where({ jamendo_id: trackId });

            // check if the track is in the tracksmananger cache
            if (results.length === 0) {

                // if its not in the cache, fetch it from server
                fetchMe.push(trackId);

            } else {

                // if the track is already in the trackmanager return it
                tracksAlreadyLoaded.push(results[0]);

            }
            
        });
        
        if (fetchMe.length > 0) {
            
            fetch(fetchMe, function(error, serverTracksArray) {
                
                if (!error) {
                
                    var returnMe = tracksAlreadyLoaded.concat(serverTracksArray);
                    
                    callback(false, returnMe);
                    
                } else {
                    
                    callback(error);
                    
                }
                
            });
            
        } else {
            
            callback(false, tracksAlreadyLoaded);
            
        }
        
    };

    /**
     * 
     * we don't have the track(s), fetch it/them from the server
     * 
     * @param {type} fetchMe
     * @param {type} callback
     * 
     * @returns {unresolved}
     */
    var fetch = function fetchFunction(fetchMe, callback) {
        
        // TODO: fetch the track data from the server if its not yet
        // available in the tracks manager
        
        utilities.log('[TRACKSMANAGER] fetch the track(s) data from the server, fetchMe:', fetchMe);
        
        var tracksCollection = new TracksCollection();
        
        tracksCollection.fetch({
            data: {
                tracksIds: fetchMe
            },
            error: function(collection, response, options) {
                
                //utilities.log(collection, response, options);
                
                callback('error fetching track(s), status: ' + response.status);
                
            },
            success: function(collection, response, options) {
                
                //utilities.log(collection, response, options);
                
                // add the track models to the tracks manager collection
                tracksCollection.add(collection.models);
                
                // return the tracks list
                callback(false, collection.models);
                
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
            
            add(attributes.model);
            
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
        add: add,
        get: get,
        clearUnused: clearUnused
    };
    
});