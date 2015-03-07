/**
 * 
 * remote control controller
 * 
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} ViewsLoader
 * @param {type} PlaylistsManager
 * @param {type} UserLibrary
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'ribs.viewsloader',
    'library.playlistsManager',
    'library.user'
    
], function (utilities, Controller, container, ViewsLoader, PlaylistsManager, UserLibrary) {
    
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
                
                // get the list of user playlists
                var userLibrary = UserLibrary();
                
                var userId = userLibrary.getAttribute('id');
                
                // get the user playlists data
                PlaylistsManager.get(userPlaylistsList, function playlistsManagerGetCallback() {
                    
                    
                    
                });

            });
        
        }
        
    });

    return RemoteControlController;
    
});