/**
 * 
 * remote controll controller
 * 
 * @param {type} $
 * @param {type} _
 * @param {type} utilities
 * @param {type} Controller
 * @param {type} container
 * @param {type} eventsManager
 * @param {type} configurationModule
 * @param {type} tracksCacheManager
 * @returns {_L13.Anonym$2}
 */
define([
    'jquery',
    'underscore',
    'library.utilities',
    'library.controller',
    'library.container',
    'library.eventsManager',
    'configuration',
    'library.tracksCache'
], function ($, _, utilities, Controller, container, eventsManager, configurationModule, tracksCacheManager) {
    
    'use strict';

    var RemoteControlController = Controller.extend({
        
        onInitialize: function() {
            
            utilities.log('[COLLABORATIVE PLAYLISTS CONTROLLER] initializing ...', 'fontColor:blue');
            
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