/**
 * 
 * player navbar ui component view
 * 
 * @param {type} view
 * @param {type} JST
 * @param {type} utilities
 * @param {type} EventsManager
 * 
 * @returns {unresolved}
 */
define([
    'ribs.view',
    'templates',
    'chrisweb.utilities',
    'library.eventsManager'
    
], function (view, JST, utilities, EventsManager) {
    
    'use strict';
    
    var PlayerNavbarUIView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[PLAYER UI COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
            var that = this;
            
            // listen for loading progress event
            EventsManager.on(EventsManager.constants.TRACK_LOADING_PROGRESS, function trackLoadingProgressFunction(attributes) {
                
                that.$el.find('.progress-bar-loading').css('width', + attributes.percentage + '%');
                
            });
            
            // listen for playing progress event
            EventsManager.on(EventsManager.constants.TRACK_PLAYING_PROGRESS, function trackPlayingProgressFunction(attributes) {
                
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
            
            EventsManager.trigger(
                EventsManager.constants.TRACK_POSITION_CHANGE,
                {
                    originalEvent: event,
                    percentage: positionPercentage
                }
            );
            
        }
        
    });

    return PlayerNavbarUIView;
    
});