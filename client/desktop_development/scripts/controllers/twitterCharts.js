/**
 * 
 * twitter charts controller
 * 
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} EventsManager
 * @param {type} TweetsChartsCollection
 * @param {type} PlaylistModel
 * 
 * @returns {unresolved}
 */
define([
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'library.eventsManager',
    'collections.TweetsCharts',
    'models.Playlist'
    
], function (utilities, Controller, container, EventsManager, TweetsChartsCollection, PlaylistModel) {
    
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
                
                // initialize the "tweets charts" collection
                var tweetsChartsCollection = new TweetsChartsCollection(null, { periodType: 'day' });
                
                // create a tracks list view
                var tracksListView = new TracksListView({
                    collection: tweetsChartsCollection,
                    ModelView: TrackRowView,
                    ModelViewOptions: {
                        templateVariables: {
                            context: 'twitterCharts',
                            playlistId: 'twitterCharts'
                        }
                    },
                    listSelector: '.tracksList'
                });
                
                // create a new playlistModel to save the playlist related
                // data
                var playlistModel = new PlaylistModel({
                    collection: this,
                    id: 'twitter_charts_day'
                });
                            
                // inform the playlistsManager that a new playlist has been
                // loaded
                EventsManager.trigger(EventsManager.constants.PLAYLISTS_MANAGER_ADD, { model: playlistModel });
                
                // initialize the twitter charts page view
                var twitterChartsView = new TwitterChartsView();
                
                container.clear('#core');
                
                container.add('#core', twitterChartsView);
                
                container.dispatch('#core');
                
                // add the tweets list view to the twitter page view
                container.add('#twitterChartsTracks', tracksListView);
                
                container.dispatch('#twitterChartsTracks');
                
                // fetch the tweets charts
                tweetsChartsCollection.fetch({
                    error: function(collection, response, options) {
                        
                        //utilities.log(collection, response, options);
                        
                    },
                    success: function(collection, response, options) {
                        
                        //utilities.log(collection, response, options);
                        
                    }
                });

            });
        
        }
        
    });

    return TwitterChartsController;
    
});