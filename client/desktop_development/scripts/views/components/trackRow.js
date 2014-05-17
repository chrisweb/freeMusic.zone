/**
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} view
 * @param {type} JST
 * @param {type} utilities
 * @param {type} eventsManager
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'view',
    'templates',
    'utilities',
    'event'
], function ($, _, view, JST, utilities, eventsManager) {
    
    'use strict';
    
    var TrackRowView = view.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[TRACK ROW VIEW] (' + this.cid + ') initializing ...', 'blue');
            
            this.options = options || {};
            
        },
        
        template: JST['templates/partials/trackRow'],
        
        previewTrack: function previewTrackFunction() {
            
            var trackId = this.$el.attr('data-track-id');
            
            eventsManager.trigger('track:preview', { trackId: trackId });
            
        },
        
        // view events
        events: {
            'click .previewTrack': 'previewTrack'
        }
        
    });

    return TrackRowView;
    
});