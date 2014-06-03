define([
    'jquery',
    'underscore',
    'utilities',
    'controller',
    'container',
    'eventsManager',
    'configuration',
    'tracksCache'
], function ($, _, utilities, controller, container, eventsManager, configurationModule, tracksCacheManager) {
    
    'use strict';

    var indexAction = function indexActionFunction() {
        
        utilities.log('[MAIN] controller: homepage,  action: index', 'fontColor:blue');
        
        // chat message input form
        require(['views/components/chatBar'], function(ChatBarView) {
            
            var chatBarView = new ChatBarView();
            
            container.add('main', chatBarView);

        });
        
        
        
    };

    return {
        index: indexAction
    };
    
});