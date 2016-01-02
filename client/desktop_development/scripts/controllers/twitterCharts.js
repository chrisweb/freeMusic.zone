/**
 * 
 * twitter charts controller
 * 
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} Ribs
 * @param {type} PlaylistsManager
 * @param {type} PlaylistTracksCollection
 * @param {type} PlaylistModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb-utilities',
    'library.controller',
    'ribsjs',
    'manager.playlists',
    'collections.PlaylistTracks',
    'models.Playlist'

], function (
    utilities,
    Controller,
    Ribs,
    PlaylistsManager,
    PlaylistTracksCollection,
    PlaylistModel
) {
    
    'use strict';

    var TwitterChartsController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[TWITTER CHARTS CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction() {
        
            utilities.log('[TWITTER CHARTS CONTROLLER] controller: twitterCharts,  action: index', 'fontColor:blue');

            // chat message input form
            require([
                'views/pages/twitterCharts',
                'views/components/track/row',
                'views/components/track/list'
            ], function(TwitterChartsView, TrackRowView, TracksListView) {
                
                // create a new playlistModel to save the playlist related
                // data
                var playlistModel = new PlaylistModel({
                    id: 'twitter_charts_day'
                });
                
                // create the twitter charts page view and add it to the dom
                var twitterChartsView = new TwitterChartsView({
                    model: playlistModel,
                    templateVariables: {
                        periods: [
                            {
                                id: 'byDay',
                                name: 'daily'
                            }
                        ],
                        defaultPeriod: 'byDay'
                    }
                });
                
                Ribs.Container.clear('#core');
                
                Ribs.Container.add('#core', twitterChartsView);
                
                Ribs.Container.dispatch('#core');
                
                // add the playlist to the playlistmanager
                PlaylistsManager.add(playlistModel);
                
                // get the playlist and trigger the playlistTrack populate
                PlaylistsManager.get({
                    playlistId: playlistModel.get('id'),
                    withTracksList: true
                }, function(error, playlistsArray) {
                    
                    if (!error) {
                        
                        var tweetsPlaylistModel = playlistsArray[0];
                        
                        // TODO: each playlistTrack get the corresponding track (model)
                        // tracksManager.get(tweetsPlaylistModel.tracksList, function getTracksCallback() {});
                        
                        // create the twitter charts tracks list view and add it to
                        // the dom
                        var twitterChartsTracksListView = new TracksListView({
                            collection: tweetsPlaylistModel.get('tracksList'),
                            ModelView: TrackRowView,
                            ModelViewOptions: {
                                context: 'twitterCharts',
                                reRenderOnChange: true,
                                playlistId: tweetsPlaylistModel.get('id')
                            },
                            listSelector: '.tracksList'
                        });
                        
                        Ribs.Container.clear('#twitterChartsTracks');
                        
                        Ribs.Container.add('#twitterChartsTracks', twitterChartsTracksListView);
                        
                        Ribs.Container.dispatch('#twitterChartsTracks');
                        
                    } else {
                        
                        // TODO: error
                        
                        utilities.log(error);
                        
                    }
                    
                });
                
            });
        
        }
        
    });

    return TwitterChartsController;
    
});