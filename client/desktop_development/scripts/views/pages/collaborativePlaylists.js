/**
 * 
 * collaborative playlists page view
 * 
 * @param {type} JST
 * @param {type} utilities
 * @param {type} view
 * 
 * @returns {unresolved}
 */
define([
    'underscore',
    'templates',
    'chrisweb-utilities',
    'library.view',
    'library.events'

], function (
    _,
    JST,
    utilities,
    view,
    EventsLibrary
) {
    
    'use strict';
    
    var collaborativePlaylistsView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[COLLABORATIVE PLAYLISTS PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/collaborativePlaylists'],
        
        // view events
        events: {
            'click .newCollaborativePlaylist': 'newCollaborativePlaylistClick'
        },
        
        newCollaborativePlaylistClick: function newCollaborativePlaylistClickFunction(event) {
            
            EventsLibrary.trigger(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_NEW);
            
        }
        
    });
    
    return collaborativePlaylistsView;
    
});