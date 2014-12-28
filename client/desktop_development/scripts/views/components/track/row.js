/**
 * 
 * track row view
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} view
 * @param {type} JST
 * @param {type} utilities
 * @param {type} EventsManager
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'ribs.view',
    'templates',
    'chrisweb.utilities',
    'library.eventsManager'
    
], function ($, _, view, JST, utilities, EventsManager) {
    
    'use strict';
    
    var TrackRowView = view.extend({
        
        onInitialize: function(options) {
            
            utilities.log('[TRACK ROW VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
            this.options = options || {};
            
            if (this.model !== undefined) {
                
                EventsManager.trigger(EventsManager.constants.TRACKROW_VIEW_ON_INITIALIZE, { id: this.model.get('id') });
                
            }
            
        },
        
        template: JST['templates/partials/trackRow'],
        
        trackPreviewStart: function trackPreviewStartFunction(event) {

            var trackId = parseInt(this.$el.attr('data-track-id'));
            
            EventsManager.trigger(EventsManager.constants.TRACK_PLAY, { trackId: trackId });
            
            this.$el.find('.trackPreview').addClass('fa-spin');
            
        },
        
        trackPreviewStop: function trackPreviewStopFunction() {
            
            var trackId = this.$el.attr('data-track-id');
            
            EventsManager.trigger(EventsManager.constants.TRACK_STOP, { trackId: trackId });
            
            this.$el.find('.trackPreview').removeClass('fa-spin');
            
        },
        
        // view events
        events: {
            'mousedown .trackPreview': 'trackPreviewStart',
            'mouseup .trackPreview': 'trackPreviewStop'
        },
        
        onClose: function() {
            
            if (this.model !== undefined) {
                
                eventsManager.trigger(EventsManager.constants.TRACKROW_VIEW_ON_CLOSE, { id: this.model.get('id') });
                
            }
            
        }
        
    });

    return TrackRowView;
    
});