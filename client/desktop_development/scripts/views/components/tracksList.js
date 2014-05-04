define([
    'jquery',
    'underscore',
    'view',
    'templates',
    'utilities',
    'configuration'
], function ($, _, view, JST, utilities, configurationModule) {
    
    'use strict';
    
    var TracksListView = view.extend({
        
        initialize: function(options) {
            
            utilities.log('[TRACKSLIST VIEW] initializing ...', 'blue');
            
            this.options = options || {};
            
            this.listenTo(this.collection, 'add', this.render);
            
        },

        template: JST['templates/partials/tracksList'],
        
        // view events
        events: {
            
        }
        
    });

    return TracksListView;
    
});