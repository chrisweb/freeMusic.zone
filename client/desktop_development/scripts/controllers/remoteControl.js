/**
 * 
 * remote control controller
 * 
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} ViewsLoader
 * @param {type} PlaylistsManager
 * @param {type} PlaylistsCollection
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'ribs.viewsloader',
    'library.playlistsManager',
    'library.user',
    'collections.Playlists'
    
], function (utilities, Controller, container, ViewsLoader, PlaylistsManager, PlaylistsCollection) {
    
    'use strict';

    var RemoteControlController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[REMOTE CONTROL CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction() {

            utilities.log('[REMOTE CONTROL CONTROLLER] controller: homepage,  action: index', 'fontColor:blue');

            // chat message input form
            ViewsLoader(['views/pages/remoteControl'], function(RemoteControlView) {

                // initialize the page view and add it to the dom
                var remoteControlView = new RemoteControlView();
                
                container.clear('#core');

                container.add('#core', remoteControlView);
                
                container.dispatch('#core');
                
                var playlistsCollection = new PlaylistsCollection();
                
                // TODO: initialize the playlists list view and set
                // playlistsCollection than and add it to the dom
                
                var options = {
                    whereKey: 'user',
                    whereValue: 'me'
                };
                
                // get the user playlists data
                PlaylistsManager.fetchList(options, function playlistsManagerGetCallback(playlistIds) {
                      
                    var playistsArray = PlaylistsManager.get(playlistIds);
                    
                    _.each(playistsArray, function(playistModel) {
                        
                        playlistsCollection.add(playistModel);
                        
                    });
                    
                });

            });
        
        }
        
    });

    return RemoteControlController;
    
});