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
    'templates',
    'chrisweb-utilities',
    'library.view'
    
], function (JST, utilities, view) {
    
    'use strict';
    
    var TwitterChartsView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[COLLABORATIVE PLAYLISTS PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/collaborativePlaylists'],
        
        // view events
        events: {
            'click .newCollaborativePlaylist': 'newCollaborativePlaylistClick'
        },
        
        newCollaborativePlaylistClick: function newCollaborativePlaylistClickFunction() {
            
            
            
        }
        
    });
    
    return TwitterChartsView;
    
});