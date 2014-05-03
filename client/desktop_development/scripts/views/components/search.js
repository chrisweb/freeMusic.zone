define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utilities',
    'configuration',
    'view'
], function ($, _, Backbone, JST, utilities, configurationModule, view) {
    
    'use strict';
    
    var SearchView = view.extend({
        
        initialize: function() {
            
            utilities.log('[SEARCH PARTIAL VIEW] initializing ...', 'blue');
            
        },
        
        template: JST['templates/partials/search'],
        
        // view events
        events: {
            'click .search button': 'searchResultsRefresh',
            'keyup .search input': 'searchResultsRefresh'
        },

        // render
        render: function() {

            // put the searcj template into the section#main
            this.$el.html(this.template);
            
            // enables chainability
            return this;

        },
        
        searchResultsRefresh: function(jQueryEvent) {
            
            utilities.log('[SEARCH PARTIAL VIEW] refresh search results', 'blue');
            
            // TODO: use backbone model/collection for search queries
            // TODO: client side cache search queries
            // TODO: abort request if current request not done but other query requested
            // TODO: wait for x seconds or until current request is done before next request
            
            jQueryEvent.preventDefault();
            
            var searchInputElement = $(jQueryEvent.target);
            
            var queryString = searchInputElement.val();
            
            utilities.log('queryString: ' + queryString);
            
            // TODO: filter query string
            
            var configuration = configurationModule.get('development');

            var jqxhr = $.ajax({
                url: configuration.server.path + '/api/search',
                type: 'GET',
                data: { query: queryString },
                dataType: 'json'
            });

            jqxhr.done(function(dataJson, textStatus, jqXHR) {
                
                utilities.log(dataJson);
                utilities.log(textStatus);
                utilities.log(jqXHR);
                
            });

            jqxhr.fail(function(jqXHR, textStatus, errorThrown) {
                
                utilities.log(jqXHR);
                utilities.log(textStatus);
                utilities.log(errorThrown);
                
            });
            
        }
        
    });
    
    var insertInto = function insertIntoFunction(element) {
        
        var searchView = new SearchView();
        
        $(element).append(searchView.render().el);
        
    };

    return {
        insertIn: insertInto
    };
    
});