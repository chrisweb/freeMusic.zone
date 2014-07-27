/**
 * 
 * track row view
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
    'library.view',
    'templates',
    'library.utilities',
    'library.eventsManager'
], function ($, _, view, JST, utilities, eventsManager) {
    
    'use strict';
    
    var TrackRowView = view.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[TRACK ROW VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
            if (this.model !== undefined) {
                
                eventsManager.trigger('trackRowView:onInitialize', { id: this.model.get('id') });
                
            }
            
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
        },
        
        onClose: function() {
            
            if (this.model !== undefined) {
                
                eventsManager.trigger('trackRowView:onClose', { id: this.model.get('id') });
                
            }
            
        }
        
    });

    return TrackRowView;
    
});