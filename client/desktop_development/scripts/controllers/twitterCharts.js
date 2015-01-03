/**
 * 
 * twitter charts controller
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} EventsManager
 * @param {type} user
 * 
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'chrisweb.utilities',
    'library.controller',
    'ribs.container',
    'library.eventsManager',
    'library.user'
    
], function ($, _, utilities, Controller, container, EventsManager, user) {
    
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
            require(['views/pages/twitterCharts'], function(TwitterChartsView) {

                var twitterChartsView = new TwitterChartsView();
                
                container.clear('#core');

                container.add('#core', twitterChartsView);
                
                container.dispatch('#core');

            });
        
        }
        
    });

    return TwitterChartsController;
    
});