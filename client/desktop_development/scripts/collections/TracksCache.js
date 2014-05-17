/**
 * 
 * tracks collection
 * 
 * @param {type} _
 * @param {type} collection
 * @param {type} TrackModel
 * @returns {unresolved}
 */
define([
    'utilities',
    'underscore',
    'collection',
    'models.Track'
], function (utilities, _, collection, TrackModel) {
    
    'use strict';
    
    var TracksCollection = collection.extend({

        initialize: function() {
            
            utilities.log('[TRACKSCACHE COLLECTION] (' + this.cid + ') initializing ...', 'blue');

        },
        model: TrackModel

    });
    
    return TracksCollection;
    
});