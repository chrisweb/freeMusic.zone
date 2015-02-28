/**
 * 
 * twitter charts controller
 * 
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} EventsManager
 * @param {type} ChartTweetsCollection
 * @param {type} PlaylistModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'library.eventsManager',
    'collections.ChartTweets',
    'models.Playlist'
    
], function (utilities, Controller, container, EventsManager, ChartTweetsCollection, PlaylistModel) {
    
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
                
                // initialize the "chart tweets" collection
                var chartTweetsCollection = new ChartTweetsCollection(null, { period: 'day' });
                
                // create a new playlistModel to save the playlist related
                // data
                var playlistModel = new PlaylistModel({
                    playlistTracksCollection: chartTweetsCollection,
                    id: 'twitter_charts_day'
                });
                
                // inform the playlistsManager that a new playlist has been
                // loaded
                EventsManager.trigger(EventsManager.constants.PLAYLISTS_MANAGER_ADD, { model: playlistModel });
                
                // fetch the tweets charts
                chartTweetsCollection.fetch({
                    error: function(collection, response, options) {
                        
                        //utilities.log(collection, response, options);
                        
                    },
                    success: function(collection, response, options) {
                        
                        //utilities.log(collection, response, options);
                        
                        var tracksList = [];
                        
                        // get all the track ids
                        _.each(collection.model, function(model) {
                            
                            tracksList.push(model.get('id'));
                            
                            // TODO: pass the list of tracks to the tracksmanager, the tracks manager should then fetch the tracks
                            
                        });
                        
                    }
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
                    collection: chartTweetsCollection,
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
                
            });
        
        }
        
    });

    return TwitterChartsController;
    
});