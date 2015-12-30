/**
 * 
 * collaborative playlists list component view
 * 
 * @param {type} utilities
 * @param {type} view
 * @param {type} JST
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.view',
    'templates'
    
], function (utilities, view, JST) {
    
    'use strict';
    
    var CollaborativePlaylistsView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[COLLABORATIVE PLAYLISTS LIST COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },

        template: JST['templates/components/collaborativePlaylists/list'],
        
        // view events
        events: {
            
        },
        
        onClose: function() {
            
        }
        
    });

    return CollaborativePlaylistsView;
    
});