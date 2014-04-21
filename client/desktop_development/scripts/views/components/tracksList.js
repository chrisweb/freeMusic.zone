define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'utilities',
    'configuration'
], function ($, _, Backbone, JST, utilities, configurationModule) {
    
    'use strict';
    
    var TrackListView = Backbone.View.extend({
        
        initialize: function() {
            
            utilities.log('[TRACK LIST VIEW] initializing ...', 'blue');
            
        },
        
        template: JST['templates/partials/trackList'],
        
        // view events
        events: {
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
            
        }
        
    });

    return TrackListView;
    
});