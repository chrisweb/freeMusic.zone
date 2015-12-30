/**
 * 
 * player navbar ui component view
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
    
    var PlayerNavbarUIView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[PLAYER UI COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
            var that = this;
            
            // listen for loading progress event
            EventsLibrary.on(EventsLibrary.constants.TRACK_LOADING_PROGRESS, function trackLoadingProgressFunction(attributes) {
                
                that.$el.find('.progress-bar-loading').css('width', + attributes.percentage + '%');
                
            });
            
            // listen for playing progress event
            EventsLibrary.on(EventsLibrary.constants.PLAYER_PLAYING_PROGRESS, function trackPlayingProgressFunction(attributes) {
                
                that.$el.find('.progress-bar-playing').css('width', + attributes.percentage + '%');
                
            });
            
        },
        
        template: JST['templates/components/player/navbarUI'],
        
        // view events
        events: {
            'click .playerProgress': 'positionChangeClick'
        },
        
        positionChangeClick: function positionChangeClickFunction(event) {
            
            event.preventDefault();
            
            var boundingClientRect = event.currentTarget.getBoundingClientRect();
            
            var position = event.clientX - boundingClientRect.left;
            
            var positionPercentage = 100/(boundingClientRect.width/position);
            
            EventsLibrary.trigger(
                EventsLibrary.constants.PLAYER_POSITION_CHANGE,
                {
                    originalEvent: event,
                    percentage: positionPercentage
                }
            );
            
        }
        
    });

    return PlayerNavbarUIView;
    
});