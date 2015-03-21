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
            ViewsLoader([
                'views/pages/remoteControl',
                'views/components/playlist/list',
                'views/components/playlist/row'
            ], function(RemoteControlView, PlaylistListView, PlaylistRowView) {

                // initialize the page view and add it to the dom
                var remoteControlView = new RemoteControlView();
                
                container.clear('#core');

                container.add('#core', remoteControlView);
                
                container.dispatch('#core');
                
                // TODO: initialize the playlists list view and set
                // playlistsCollection than and add it to the dom
                
                var options = {
                    whereKey: 'user',
                    whereValue: 'me'
                };
                
                // get the user playlists list, this will return an array of
                // playlist ids
                PlaylistsManager.fetchList(options, function playlistsManagerGetCallback(error, playlistIds) {
                    
                    if (!error) {
                        
                        // use the playlist manager again to get the playlist data
                        // by playlist id
                        PlaylistsManager.get(playlistIds, function(error, playistsArray) {
                            
                            if (!error) {
                                
                                // initialize the collection of user playlists
                                var playlistsCollection = new PlaylistsCollection();
                                
                                // initialize the playlists list view
                                var playlistListView = new PlaylistListView({
                                    collection: playlistsCollection,
                                    ModelView: PlaylistRowView,
                                    listSelector: '.playlistsList'
                                });
                                
                                container.clear('.js-playlistsListContainer');
                                
                                container.add('.js-playlistsListContainer', playlistListView);
                                
                                container.dispatch('.js-playlistsListContainer');
                                
                                _.each(playistsArray, function(playistModel) {
                                    
                                    playlistsCollection.add(playistModel);
                                    
                                });
                                
                            } else {
                                
                                // TODO: error
                                
                                utilities.log(error);
                                
                            }
                            
                        });
                        
                    } else {
                        
                        // TODO: error
                        
                        utilities.log(error);
                        
                    }
                    
                });

            });
        
        }
        
    });

    return RemoteControlController;
    
});