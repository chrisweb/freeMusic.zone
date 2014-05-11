define([
    'jquery',
    'underscore',
    'templates',
    'utilities',
    'view',
    'event',
    'backbone'
], function ($, _, JST, utilities, View, eventsManager, Backbone) {
    
    'use strict';

    var SearchBarView = View.extend({
    //var SearchBarView = Backbone.View.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[SEARCH PARTIAL VIEW] initializing ...', 'blue');
            
            this.options = options || {};
            
            //var $el = $(this.template());
            
            //this.$el.replaceWith($el);
            
            //this.setElement($el);
            
            //this.$el.replaceWith($el);
            
        },
        /*render : function () {
            
            this.$el.html(this.template(this.options));
            
            return this;
            
        },*/
        
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
            
                console.log(' ## trigger search:query');
            
                eventsManager.trigger('search:query', { queryString: queryString }, this);
                
            }
            
        }, 1000)
        
    });
    
    return SearchBarView;
    
});