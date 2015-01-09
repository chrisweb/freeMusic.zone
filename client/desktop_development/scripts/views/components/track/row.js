/**
 * 
 * track row component view
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
    
    var trackId;
    
    var TrackRowView = view.extend({
        
        onInitializeStart: function(options) {
            
            utilities.log('[TRACK ROW COMPONENT VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
            trackId = this.model.get('id');
            
            EventsManager.trigger(EventsManager.constants.TRACKROW_VIEW_ON_INITIALIZE, { id: trackId });
            
        },
        
        template: JST['templates/components/track/row'],
        
        // view events
        events: {
            'mousedown .trackPreview': 'trackPreviewStart',
            'mouseup .trackPreview': 'trackPreviewStop',
            'click .playTrack': 'playTrackClick',
            'click .retweetTrack': 'retweetTrackClick'
        },
        
        trackPreviewStart: function trackPreviewStartFunction(event) {

            EventsManager.trigger(EventsManager.constants.TRACK_PLAY, { trackId: trackId });
            
            this.$el.find('.trackPreview').addClass('fa-spin');
            
        },
        
        trackPreviewStop: function trackPreviewStopFunction() {
            
            EventsManager.trigger(EventsManager.constants.TRACK_STOP, { trackId: trackId });
            
            this.$el.find('.trackPreview').removeClass('fa-spin');
            
        },
        
        playTrackClick: function playTrackClickFunction() {
            
            EventsManager.trigger(EventsManager.constants.TRACK_PLAY, { trackId: trackId });
            
            this.$el.find('.trackPreview').removeClass('fa-spin');
            
        },
        
        retweetTrackClick: function retweetTrackClickFunction() {
            
            EventsManager.trigger(EventsManager.constants.TRACK_STOP, { trackId: trackId });
            
            this.$el.find('.trackPreview').removeClass('fa-spin');
            
        },
        
        onClose: function() {
            
            if (this.model !== undefined) {
                
                eventsManager.trigger(EventsManager.constants.TRACKROW_VIEW_ON_CLOSE, { id: this.model.get('id') });
                
            }
            
        }
        
    });

    return TrackRowView;
    
});