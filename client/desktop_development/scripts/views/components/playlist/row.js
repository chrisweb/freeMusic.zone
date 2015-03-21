/**
 * 
 * playlist row component view
 * 
 * @param {type} view
 * @param {type} JST
 * @param {type} utilities
 * 
 * @returns {unresolved}
 */
define([
    'ribs.view',
    'templates',
    'chrisweb.utilities'
    
], function (view, JST, utilities) {
    
    'use strict';
    
    var PlaylistRowView = view.extend({
        
        onInitializeStart: function() {
            
            utilities.log('[PLAYLIST ROW COMPONENT VIEW] (' + this.cid + ') initializing ...', 'fontColor:blue');
            
        },
        
        template: JST['templates/components/playlist/row'],
        
        // view events
        events: {
            'click .js-openPlaylist': 'openPlaylistClick'
        },
        
        openPlaylistClick: function openPlaylistClickFunction(event) {

            
            
        }
        
    });

    return PlaylistRowView;
    
});