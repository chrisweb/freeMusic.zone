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
            'click .js-newCollaborativePlaylist-button': 'newCollaborativePlaylistClick',
            'click .js-listCollaborativePlaylists-button': 'listCollaborativePlaylistsClick'
        },
        
        newCollaborativePlaylistClick: function newCollaborativePlaylistClickFunction(event) {
            
            EventsLibrary.trigger(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_NEW, { originalEvent: event });
            
        },
        
        listCollaborativePlaylistsClick: function listCollaborativePlaylistsClickFunction(event) {
            
            EventsLibrary.trigger(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_LIST, { originalEvent: event });
            
        }
        
    });
    
    return collaborativePlaylistsView;
    
});