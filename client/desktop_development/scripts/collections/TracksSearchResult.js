/**
 * 
 * tracks search results collection
 * 
 * @param {type} utilities
 * @param {type} _
 * @param {type} collection
 * @param {type} TrackModel
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'underscore',
    'ribs.collection',
    'models.Track'
], function (utilities, _, collection, TrackModel) {
    
    'use strict';
    
    var TracksSearchResultsCollection = collection.extend({

        onInitialize: function() {
            
            utilities.log('[TRACKS SEARCH RESULTS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: TrackModel

    });
    
    return TracksSearchResultsCollection;
    
});