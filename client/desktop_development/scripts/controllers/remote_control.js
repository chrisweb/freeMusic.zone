/**
 * 
 * remote control controller
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} eventsManager
 * @param {type} user
 * @returns {unresolved}
 */
define([
    'jquery',
    'underscore',
    'library.utilities',
    'library.controller',
    'library.container',
    'library.eventsManager',
    'library.user'
], function ($, _, utilities, Controller, container, eventsManager, user) {
    
    'use strict';

    var RemoteControlController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[REMOTE CONTROL CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction() {

            utilities.log('[MAIN] controller: homepage,  action: index', 'fontColor:blue');

            // chat message input form
            require(['views/components/chatBar'], function(ChatBarView) {

                var chatBarView = new ChatBarView();

                container.add('main', chatBarView);

            });
        
        }
        
    });

    return RemoteControlController;
    
});