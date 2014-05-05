define([
    'jquery',
    'underscore',
    'templates',
    'utilities',
    'view',
    'event'
], function ($, _, JST, utilities, view, eventsManager) {
    
    'use strict';
    
    
    
    var SearchBarView = view.extend({
        
        initialize: function() {
            
            utilities.log('[SEARCH PARTIAL VIEW] initializing ...', 'blue');
            
        },
        
        template: JST['templates/partials/search'],
        
        // view events
        events: {
            'click .search button': 'searchResultsRefresh',
            'keyup .search input': 'searchResultsRefresh'
        },
        
        // search results refresh, throttled at 1 action every 1 second
        searchResultsRefresh: _.throttle(function(jQueryEvent) {
            
            utilities.log('[SEARCH PARTIAL VIEW] refresh search results', 'blue');
            
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