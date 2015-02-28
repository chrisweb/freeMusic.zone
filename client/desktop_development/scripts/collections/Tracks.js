/**
 * 
 * tracks manager collection
 * 
 * @param {type} utilities
 * @param {type} collection
 * @param {type} TrackModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'ribs.collection',
    'models.Track'
    
], function (utilities, collection, TrackModel) {
    
    'use strict';
    
    var TracksManagerCollection = collection.extend({

        onInitialize: function() {
            
            utilities.log('[TRACKS MANAGER COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: TrackModel,
        url: '/api/tracks'

    });
    
    return TracksManagerCollection;
    
});