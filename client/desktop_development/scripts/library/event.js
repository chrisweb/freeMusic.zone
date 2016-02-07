/**
 * 
 * event library
 * 
 * @param {type} Ribs
 * 
 * @returns {_L17.Anonym$1}
 */
define([
    'ribsjs'
    
], function (Ribs) {
    
    'use strict';
    
    var eventsLibrary = {
        
    };
    
    var EventsLibrary = _.extend(eventsLibrary, Ribs.EventsManager);
    
    EventsLibrary.constants = {
        
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
        'TRACK_ADD_TO_COLLABORATIVE': 'track:addToCollaborative',
        
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
        'PLAYLISTS_MANAGER_GET': 'playlistsManager:get',
        
        // sound
        'SOUND_ONLOAD': 'sound:onload',
        
        // splashscreen end
        'SPLASHSCREEN_OFF': 'splashscreen:off',
        
        // menu
        'MENU_TOGGLE': 'menu:toggle',

        // collaborative playlists
        'COLLABORATIVE_PLAYLISTS_NEW': 'collaborativePlaylists:new',
        'COLLABORATIVE_PLAYLISTS_CREATE': 'collaborativePlaylists:create',
        'COLLABORATIVE_PLAYLISTS_JOIN': 'collaborativePlaylists:join',
        'COLLABORATIVE_PLAYLISTS_LEAVE': 'collaborativePlaylists:leave',
        'COLLABORATIVE_PLAYLISTS_SEND_MESSAGE': 'collaborativePlaylists:sendMessage',
        'COLLABORATIVE_PLAYLISTS_LIST': 'collaborativePlaylists:list'
        
    };
    
    return EventsLibrary;
    
});