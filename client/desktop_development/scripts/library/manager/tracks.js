/**
 * 
 * tracks manager
 * 
 * @param {type} utilities
 * @param {type} EventsLibrary
 * @param {type} TracksCollection
 * @param {type} moment
 * 
 * @returns {_L17.Anonym$2}
 */
define([
    'chrisweb-utilities',
    'library.events',
    'collections.Tracks',
    'moment',
    'ribsjs'

], function (
    utilities,
    EventsLibrary,
    TracksCollection,
    moment,
    Ribs
) {
    
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
        
        var modelsToAdd = [];
        
        _.each(addMe, function(trackModel) {
            
            var results = tracksCollection.where({ jamendo_id: trackModel.get('jamendo_id') });
        
            // check if the track is not already in the cache
            if (results.length === 0) {

                modelsToAdd.push(trackModel);

            }
            
        });

        tracksCollection.add(modelsToAdd);
        
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
        
        var getMeArray = [];

        if (!_.isArray(getMe)) {
            getMeArray = [getMe];
        } else {
            getMeArray = getMe;
        }
        
        var fetchMe = [];
        var tracksAlreadyLoadedArray = [];
        var isInputAModel;
        
        _.each(getMeArray, function (getMe) {
            
            var trackId;
            
            // is getMe a model or an id
            if (getMe instanceof Ribs.Model) {
                trackId = getMe.get('id');
                isInputAModel = true;
            } else {
                trackId = getMe;
                isInputAModel = false;
            }

            var result = tracksCollection.findWhere({ jamendo_id: trackId });

            // check if the track is in the tracksmananger cache
            if (result === undefined) {

                // if its not in the cache, fetch it from server
                fetchMe.push(trackId);

            } else {

                // if the track is already in the trackmanager return it
                tracksAlreadyLoadedArray.push(results[0]);

            }
            
        });
        
        // did new models get fetched or did we have all we needed in cache
        if (fetchMe.length > 0) {
            
            fetch(fetchMe, function(error, serverTracksArray) {
                
                if (!error) {
                    
                    // merge the newly fetched models with the ones from cache into single array
                    var allModelsArray = tracksAlreadyLoadedArray.concat(serverTracksArray);
                    
                    var returnMeArray;

                    if (isInputAModel) {
                        returnMeArray = addToInitialModel(allModelsArray, getMeArray);
                    } else {
                        returnMeArray = allModelsArray;
                    }
                    
                    callback(false, returnMeArray);
                    
                } else {
                    
                    callback(error);
                    
                }
                
            });
            
        } else {
            
            var returnMeArray = [];

            if (isInputAModel) {
                returnMeArray = addToInitialModel(tracksAlreadyLoadedArray, getMeArray);
            } else {
                returnMeArray = tracksAlreadyLoadedArray;
            }

            callback(false, returnMeArray);
            
        }
        
    };
    
    /**
     * if the requested IDs were in models, take the response and put it back into those models
     */
    var addToInitialModel = function addToInitialModelFunction(returnMeArray, getMeArray) {
        
        var mergedModelsArray = [];

        _.each(getMeArray, function eachReturnMeCallback(getMeModel) {
            
            var matchingModel = _.find(returnMeArray, function findMatchingModelCallback(returnMeModel) {
                return returnMeModel.get('jamendo_id') === getMeModel.get('id');
            })
            
            var trackModel = null;
            
            if (matchingModel !== undefined) {
                trackModel = matchingModel;
            }
            
            getMeModel.set({
                trackModel: trackModel
            }, {
                silent: true
            });

            mergedModelsArray.push(getMeModel);

        });

        return mergedModelsArray;

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
     * fetch a list of entity ids of a page, of a user based on some query parameters
     * 
     * this is a different method then fetch, because here we don't know the
     * entity ids, we have to ask the server which entity match our query, then we need to get
     * those entites in another query
     * 
     * we don't fetch all the entity data as the entity data may already be
     * in the client cache, it might have been fetched previously
     * 
     * list can / should have a lot lower expiry time then entity, maybe we don't even cache them (at least client side)
     * 
     * @param Object options
     * @param Function callback
     * 
     * @returns void
     */
    var fetchList = function fetchListFunction(options, callback) {
       
        utilities.log('[TRACKS MANAGER] fetch the list of entites from the server based on a query, options:', options);

        // not yet implemented, as most entities have their own tracks list

        callback('not implemented');
         
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
        
        EventsLibrary.on(EventsLibrary.constants.TRACKS_MANAGER_USAGE, function incrementUsage(attributes) {
            
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
        
        EventsLibrary.on(EventsLibrary.constants.TRACKS_MANAGER_ADD, function incrementUsage(attributes) {
            
            add(attributes.model);
            
        });
        
        EventsLibrary.on(EventsLibrary.constants.SOUND_ONLOAD, function setLoaded(attributes) {
            
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