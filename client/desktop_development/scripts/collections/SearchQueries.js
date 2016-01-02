/**
 * 
 * search queries results collection
 * 
 * @param {type} utilities
 * @param {type} Collection
 * @param {type} PlaylistModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.collection',
    'models.SearchQuery'
    
], function (utilities, Collection, SearchQueryModel) {
    
    'use strict';
    
    var SearchQueriesResultsCollection = Collection.extend({

        onInitialize: function() {
            
            utilities.log('[SEARCH QUERIES RESULTS COLLECTION] initializing ...', 'fontColor:blue');

        },
        model: SearchQueryModel,
        url: '/api/search'

    });
    
    return SearchQueriesResultsCollection;
    
});