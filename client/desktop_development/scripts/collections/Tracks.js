/**
 * 
 * tracks manager collection
 * 
 * @param {type} utilities
 * @param {type} Collection
 * @param {type} TrackModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.collection',
    'models.Track'
    
], function (utilities, Collection, TrackModel) {
    
    'use strict';
    
    var TracksManagerCollection = Collection.extend({

        onInitialize: function() {
            
            utilities.log('[TRACKS MANAGER COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: TrackModel,
        url: '/api/tracks'

    });
    
    return TracksManagerCollection;
    
});