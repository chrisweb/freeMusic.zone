define([
    'jquery',
    'underscore',
    'view',
    'templates',
    'utilities',
    'configuration'
], function ($, _, view, JST, utilities, configurationModule) {
    
    'use strict';
    
    var TrackRowView = view.extend({
        
        initialize: function(options) {
            
            utilities.log('[TRACK ROW VIEW] initializing ...', 'blue');
            
            this.options = options || {};
            
        },
        
        template: JST['templates/partials/trackRow'],
        
        // view events
        events: {
            
        }
        
    });

    return TrackRowView;
    
});