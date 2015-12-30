/**
 * 
 * routes definitions
 * 
 */
define([], function () {
    
    'use strict';
    
    // note to self: route matching is done from top to bottom
    // note to self2: routes that have a parameter that contains a hyphen must replace the word containing 
    // the hyphen by the same word written in camelcase with nohyphen, so "foo-bar" should be "fooBar",
    // else only "foo" will be used as parameter name and "bar" will be stripped
    // a hyphen as route part (fragment) is not a problem, like collaborative-playlists
    var routesDefinitions = {
        'desktop': 'renderHomepage',
        'desktop/collaborative-playlists(/:collaborativePlaylistId)': 'renderCollaborativePlaylist',
        'desktop/:controller(/:action)': 'controllerActionDispatcher',
        '*other': 'render404'
    };
    
    return routesDefinitions;
    
});