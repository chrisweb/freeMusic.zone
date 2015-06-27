/**
 * 
 * playlist row component view
 * 
 * @param {type} view
 * @param {type} JST
 * @param {type} utilities
 * @param {type} PlaylistsManager
 * 
 * @returns {unresolved}
 */
define([
    'library.view',
    'templates',
    'chrisweb-utilities',
    'library.playlistsManager'
    
], function (view, JST, utilities, PlaylistsManager) {
    
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

            var playlistId = this.model.get('id');
            
            var playlistQuery = {
                playlistId: playlistId,
                withPlaylistTracks: true
            };
            
            PlaylistsManager.get(playlistQuery, function(error, playlistModelsArray) {
                
                if (!error) {
                    
                    var playlistModel = playlistModelsArray[0];
                    
                    
                    
                } else {
                    
                    // TODO: error
                    
                    utilities.log(error);
                    
                }
                
                
            });
            
            
            
        }
        
    });

    return PlaylistRowView;
    
});