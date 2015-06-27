/**
 * 
 * games controller
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
    'chrisweb-utilities',
    'library.controller',
    'ribsjs',
    'library.eventsManager',
    'library.user'
    
], function ($, _, utilities, Controller, Ribs, EventsManager, user) {
    
    'use strict';

    var GamesController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[GAMES CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction() {

            utilities.log('[GAMES CONTROLLER] controller: homepage,  action: index', 'fontColor:blue');

            // chat message input form
            require(['views/pages/games'], function(GamesView) {

                var gamesView = new GamesView();
                
                Ribs.Container.clear('#core');

                Ribs.Container.add('#core', gamesView);
                
                Ribs.Container.dispatch('#core');

            });
        
        }
        
    });

    return GamesController;
    
});