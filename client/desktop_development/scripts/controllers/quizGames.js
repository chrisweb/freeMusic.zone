/**
 * 
 * quiz games controller
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

    var QuizGamesController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[QUIZ GAMES CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction() {

            utilities.log('[MAIN] controller: homepage,  action: index', 'fontColor:blue');

            // chat message input form
            require(['views/components/chatBar'], function(ChatBarView) {

                var chatBarView = new ChatBarView();

                container.add('#core', chatBarView);

            });
        
        }
        
    });

    return QuizGamesController;
    
});