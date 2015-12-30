/**
 * 
 * playlists page view
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
    'library.user',
    'manager.playlists'

], function (
    _,
    JST,
    utilities,
    view,
    UserLibrary,
    PlaylistsManager
) {
    
    'use strict';
    
    var PlaylistsPageView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[PLAYLISTS PAGE VIEW] initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/pages/playlists'],
        
        // view events
        events: {
            
        }
        
    });
    
    return PlaylistsPageView;
    
});