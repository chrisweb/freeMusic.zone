/**
 * 
 * collaborative playlist item component view
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
    
    var CollaborativePlaylistItemView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[COLLABIRATIVE PLAYLIST ITEM COMPONENT VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/components/collaborativePlaylists/item'],
        
        // view events
        events: {
            'click': 'collaborativePlaylistItemClick'
        },
        
        collaborativePlaylistItemClick: function collaborativePlaylistItemClickFunction(event) {
            
            event.preventDefault();

            EventsLibrary.trigger(EventsLibrary.constants.COLLABORATIVE_PLAYLISTS_JOIN, { collaborativePlaylistId: this.model.get('id') });
            
        }
        
    });

    return CollaborativePlaylistItemView;
    
});