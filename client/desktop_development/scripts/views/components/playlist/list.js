/**
 * 
 * playlists list component view
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
    
    var PlaylistsListView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[PLAYLISTS LIST COMPONENT VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/components/playlist/list'],
        
        // view events
        events: {
            
        },
        
        onClose: function() {
            
        }
        
    });

    return PlaylistsListView;
    
});