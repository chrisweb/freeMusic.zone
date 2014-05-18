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
    'eventsManager'
], function ($, _, view, JST, utilities, eventsManager) {
    
    'use strict';
    
    var TrackRowView = view.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[TRACK ROW VIEW] (' + this.cid + ') initializing ...', 'blue');
            
            this.options = options || {};
            
        },
        
        template: JST['templates/partials/trackRow'],
        
        trackPreviewStart: function trackPreviewStartFunction(event) {

            var trackId = parseInt(this.$el.attr('data-track-id'));
            
            eventsManager.trigger('track:play', { trackId: trackId });
            
            this.$el.find('.trackPreview').addClass('fa-spin');
            
        },
        
        trackPreviewStop: function trackPreviewStopFunction() {
            
            var trackId = this.$el.attr('data-track-id');
            
            eventsManager.trigger('track:stop', { trackId: trackId });
            
            this.$el.find('.trackPreview').removeClass('fa-spin');
            
        },
        
        // view events
        events: {
            'mousedown .trackPreview': 'trackPreviewStart',
            'mouseup .trackPreview': 'trackPreviewStop'
        }
        
    });

    return TrackRowView;
    
});