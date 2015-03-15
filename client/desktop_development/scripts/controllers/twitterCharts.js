/**
 * 
 * twitter charts controller
 * 
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} EventsManager
 * @param {type} PlaylistTracksCollection
 * @param {type} PlaylistModel
 * @param {type} ViewsLoader
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'library.eventsManager',
    'collections.PlaylistTracks',
    'models.Playlist',
    'ribs.viewsloader'
    
], function (utilities, Controller, container, EventsManager, PlaylistTracksCollection, PlaylistModel, ViewsLoader) {
    
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
            ViewsLoader([
                'views/pages/twitterCharts',
                'views/components/track/row',
                'views/components/track/list'
            ], function(TwitterChartsView, TrackRowView, TracksListView) {
                
                // initialize the "chart tweets" collection
                // use silent: true to not trigger the add event until all the
                // trackdata has been fetched, so the list of tracks and the
                // data of each track too
                var playlistTracksCollection = new PlaylistTracksCollection(null, {
                    period: 'day'
                });
                
                // create a new playlistModel to save the playlist related
                // data
                var playlistModel = new PlaylistModel({
                    playlistTracksCollection: playlistTracksCollection,
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
                
                container.clear('#core');
                
                container.add('#core', twitterChartsView);
                
                container.dispatch('#core');
                
                // create the twitter charts tracks list view and add it to
                // the dom
                var twitterChartsTracksView = new TracksListView({
                    collection: playlistModel.get('playlistTracksCollection'),
                    ModelView: TrackRowView,
                    ModelViewOptions: {
                        context: 'twitterCharts',
                        reRenderOnChange: true
                    },
                    listSelector: '.tracksList'
                });
                
                container.clear('#twitterChartsTracks');
                
                container.add('#twitterChartsTracks', twitterChartsTracksView);
                
                container.dispatch('#twitterChartsTracks');
                
                // inform the playlistsManager that a new playlist has been
                // loaded
                EventsManager.trigger(EventsManager.constants.PLAYLISTS_MANAGER_ADD, { model: playlistModel });
                
            });
        
        }
        
    });

    return TwitterChartsController;
    
});