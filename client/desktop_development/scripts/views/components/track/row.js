/**
 * 
 * track row component view
 * 
 * @param {type} view
 * @param {type} JST
 * @param {type} utilities
 * @param {type} EventsLibrary
 * 
 * @returns {unresolved}
 */
define([
    'library.view',
    'templates',
    'chrisweb-utilities',
    'library.events'

], function (
    view,
    JST,
    utilities,
    EventsLibrary
) {
    
    'use strict';
    
    var TrackRowView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[TRACK ROW COMPONENT VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
            // tell the tracks cache manager that he must increment the
            // usage of this track by one
            EventsLibrary.trigger(EventsLibrary.constants.TRACKS_MANAGER_USAGE, { trackId: this.model.get('id'), action: 'increment' });
            
        },
        
        template: JST['templates/components/track/row'],
        
        // view events
        events: {
            'mousedown .js-trackPreview': 'trackPreviewStart',
            'mouseup .js-trackPreview': 'trackPreviewStop',
            'click .js-playTrack': 'playTrackClick',
            'click .js-pauseTrack': 'pauseTrackClick',
            'click .js-shareOnTwitterTrack': 'shareOnTwitterTrackClick',
            'click .js-shareOnFacebookTrack': 'shareOnFacebookClick',
            'click .js-shareOnGooglePlusTrack': 'shareOnGooglePlusClick'
        },
        
        trackPreviewStart: function trackPreviewStartFunction(event) {

            EventsLibrary.trigger(EventsLibrary.constants.TRACK_PLAY, { trackId: this.model.get('id') });
            
            this.$el.find('.trackPreview').addClass('fa-spin');
            
        },
        
        trackPreviewStop: function trackPreviewStopFunction() {
            
            EventsLibrary.trigger(EventsLibrary.constants.TRACK_STOP, { trackId: this.model.get('id') });
            
            this.$el.find('.trackPreview').removeClass('fa-spin');
            
        },
        
        playTrackClick: function playTrackClickFunction(event) {
            
            EventsLibrary.trigger(EventsLibrary.constants.TRACK_PLAY, { trackId: this.model.get('id'), playlistId: this.options.playlistId });
            
            $(event.currentTarget)
                .removeClass('fa-play')
                .addClass('fa-pause')
                .removeClass('js-playTrack')
                .addClass('js-pauseTrack');
            
        },
        
        pauseTrackClick: function pauseTrackClickFunction(event) {
            
            EventsLibrary.trigger(EventsLibrary.constants.TRACK_PAUSE);
            
            $(event.currentTarget)
                .removeClass('fa-pause')
                .addClass('fa-play')
                .removeClass('js-pauseTrack')
                .addClass('js-playTrack');
            
        },
        
        shareOnTwitterTrackClick: function shareOnTwitterTrackClickFunction() {
            
            EventsLibrary.trigger(EventsLibrary.constants.TRACK_SHARE, { trackId: this.model.get('id'), network: 'twitter' });
            
        },
        
        shareOnGooglePlusClick: function retweetTrackClickFunction() {
            
            EventsLibrary.trigger(EventsLibrary.constants.TRACK_SHARE, { trackId: this.model.get('id'), network: 'facebook' });
            
        },
        
        shareOnFacebookClick: function retweetTrackClickFunction() {
            
            EventsLibrary.trigger(EventsLibrary.constants.TRACK_SHARE, { trackId: this.model.get('id'), network: 'googleplus' });
            
        },
        
        onCloseStart: function() {
            
            // tell the tracks cache manager that he must decrement the
            // usage of this track by one
            EventsLibrary.trigger(EventsLibrary.constants.TRACKS_MANAGER_USAGE, { trackId: this.model.get('id'), action: 'decrement' });
            
        }
        
    });

    return TrackRowView;
    
});