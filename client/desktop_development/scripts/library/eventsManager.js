/**
 * https://github.com/chrisweb
 * 
 * Copyright 2014 weber chris
 * Released under the MIT license
 * https://chris.lu
 */

/**
 * 
 * user library
 * 
 * @param {type} utilities
 * @param {type} RibsEventsManager
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'chrisweb.utilities',
    'ribs.eventsManager'
    
], function (utilities, RibsEventsManager) {
    
    'use strict';
    
    var eventsManager = {
        
    };
    
    var LibraryEventsManager = _.extend(eventsManager, RibsEventsManager);
    
    LibraryEventsManager.constants = {

        // application
        'DOM_LOADED': 'application:onDOMLoad',

        // OAuth
        'OAUTH_CONNECTED': 'oauth:conntected',
        'OAUTH_ISLOGGED': 'oauth:isLogged',

        // user
        'USER_ISLOGGED': 'user:isLogged',

        // search
        'SEARCH_QUERY': 'search:query',

        // router
        'ROUTER_PREROUTE': 'router:preRoute',
        'ROUTER_POSTROUTE': 'router:postRoute',

        // track
        'TRACK_PLAY': 'track:play',
        'TRACK_STOP': 'track:stop',

        // track row
        'TRACKROW_VIEW_ON_INITIALIZE': 'trackRowView:onInitialize',
        'TRACKROW_VIEW_ON_CLOSE': 'trackRowView:onClose',

        // sound
        'SOUND_ONLOAD': 'sound:onload',
        
        // splashscreen end
        'SPLASHSCREEN_OFF': 'splashscreen:off',

        // menu
        'MENU_TOGGLE': 'menu:toggle'

    };
    
    

    return LibraryEventsManager;
    
});