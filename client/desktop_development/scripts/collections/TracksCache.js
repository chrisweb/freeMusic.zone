/**
 * 
 * tracks collection
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} collection
 * @param {type} TrackModel
 * @returns {unresolved}
 */
define([
    'library.utilities',
    'underscore',
    'library.collection',
    'models.Track'
], function (utilities, _, collection, TrackModel) {
    
    'use strict';
    
    var TracksCollection = collection.extend({

        onInitialize: function() {
            
            utilities.log('[TRACKSCACHE COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: TrackModel

    });
    
    return TracksCollection;
    
});