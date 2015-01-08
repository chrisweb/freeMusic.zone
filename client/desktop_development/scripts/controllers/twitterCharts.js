/**
 * 
 * twitter charts controller
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} TweetsChartsCollection
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'collections.TweetsCharts'
    
], function ($, _, utilities, Controller, container, TweetsChartsCollection) {
    
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
                
                // initialize the tweets charts tracks list view
                var tweetsChartsCollection = new TweetsChartsCollection();
                
                var tracksListView = new TracksListView({
                    collection: tweetsChartsCollection,
                    ModelView: TrackRowView,
                    listClass: 'tracksList'
                });

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