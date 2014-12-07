/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * splashScreen plugin
 * 
 * @param {type} EventsManager
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'library.eventsManager'
    
], function (EventsManager) {
    
    'use strict';
    
    var initialize = function initializeFunction() {
        
        EventsManager.on(EventsManager.constants.ROUTER_POSTROUTE, function() {
            
            var $body = $('body');
            
            // remove the splashScreen
            if ($body.hasClass('splashScreen')) {

                $body.removeClass('splashScreen').removeClass('splashScreenImage');

            }
            
        });
        
    };
    
    return {
        initialize: initialize
    };
    
});