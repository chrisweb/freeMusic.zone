/**
 * 
 * search bar view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} JST
 * @param {type} utilities
 * @param {type} View
 * @param {type} eventsManager
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'templates',
    'library.utilities',
    'library.view',
    'library.eventsManager'
], function ($, _, JST, utilities, View, eventsManager) {
    
    'use strict';

    var SearchBarView = View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[SEARCH PARTIAL VIEW] initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
        },

        template: JST['templates/partials/search'],
        
        // view events
        events: {
            /*'click .search button': 'searchResultsRefresh',
            'keyup .search input': 'searchResultsRefresh'*/
            'click button': 'searchResultsRefresh',
            'keyup input': 'searchResultsRefresh'
        },
        
        onRender: function() {
            
            
            
        },
        
        // search results refresh, throttled at 1 action every 1 second
        searchResultsRefresh: _.throttle(function(jQueryEvent) {
            
            utilities.log('[SEARCH PARTIAL VIEW] refresh search results', 'fontColor:blue');
            
            // TODO: use backbone model/collection for search queries
            // TODO: client side cache search queries
            // TODO: abort request if current request not done but other query requested
            // TODO: wait for x seconds or until current request is done before next request
            
            jQueryEvent.preventDefault();
            
            var searchInputElement = $(jQueryEvent.target);
            
            var queryString = searchInputElement.val();
            
            utilities.log('queryString: ' + queryString);
            
            // jamendo requires seqrch queries to have at least two characters
            if (queryString.length > 1) {

                eventsManager.trigger('search:query', { queryString: queryString }, this);
                
            }
            
        }, 1000)
        
    });
    
    return SearchBarView;
    
});