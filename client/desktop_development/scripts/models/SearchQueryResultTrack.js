/**
 * 
 * search query result track model
 * 
 * a search query result track is not a track, it just contains search query specific
 * informations for a track, like its position in the search query results
 * 
 * @param {type} utilities
 * @param {type} Model
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.model'
    
], function (utilities, Model) {
    
    'use strict';
    
    var SearchQueryResultTrackModel = Model.extend({
        
        onInitialize: function() {
            
            utilities.log('[SEARCH QUERY RESULT TRACK MODEL] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        defaults: {
            id: null,
            position: 0
        },
        validate: function(attrs) {

            utilities.log(attrs);

        }

    });

    return SearchQueryResultTrackModel;
    
});