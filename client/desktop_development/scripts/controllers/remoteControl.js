/**
 * 
 * remote control controller
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

    var RemoteControlController = Controller.extend({
        
        onInitialize: function(options, configuration, router) {
            
            utilities.log('[REMOTE CONTROL CONTROLLER] initializing ...', 'fontColor:blue');
            
            this.options = options;
            this.configuration = configuration;
            this.router = router;
            
        },
        indexAction: function indexActionFunction() {

            utilities.log('[REMOTE CONTROL CONTROLLER] controller: homepage,  action: index', 'fontColor:blue');

            // chat message input form
            require(['views/components/chatBar'], function(RemoteControlView) {

                var remoteControlView = new RemoteControlView();
                
                container.clear('#core');

                container.add('#core', remoteControlView);
                
                container.dispatch('#core');

            });
        
        }
        
    });

    return RemoteControlController;
    
});