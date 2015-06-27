/**
 * 
 * user library
 * 
 * @param {type} Ribs
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'ribsjs'
    
], function (Ribs) {
    
    'use strict';
    
    var eventsManager = {
        
    };
    
    var LibraryEventsManager = _.extend(eventsManager, Ribs.EventsManager);
    
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
        
        // track (row)
        'TRACK_PLAY': 'track:play',
        'TRACK_STOP': 'track:stop',
        'TRACK_PAUSE': 'track:pause',
        'TRACK_SHARE': 'track:share',
        
        // player
        'PLAYER_PLAY': 'player:play',
        'PLAYER_STOP': 'player:stop',
        'PLAYER_PAUSE': 'player:pause',
        'PLAYER_PLAYING_PROGRESS': 'player:progress',
        'PLAYER_POSITION_CHANGE': 'player:positionChange',
        'TRACK_LOADING_PROGRESS': 'player:loadingProgress',
        
        // playlist
        'PLAYLIST_NEXT': 'playlist:next',
        
        // tracks manager
        'TRACKS_MANAGER_USAGE': 'tracksManager:usage',
        'TRACKS_MANAGER_ADD': 'tracksManager:add',
        
        // playlists manager
        'PLAYLISTS_MANAGER_ADD': 'playlistsManager:add',
        
        // sound
        'SOUND_ONLOAD': 'sound:onload',
        
        // splashscreen end
        'SPLASHSCREEN_OFF': 'splashscreen:off',
        
        // menu
        'MENU_TOGGLE': 'menu:toggle'
        
    };
    
    return LibraryEventsManager;
    
});