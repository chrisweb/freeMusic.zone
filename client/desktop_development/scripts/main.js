
'use strict';

/**
 * 
 * http://requirejs.org/
 * 
 * require configuration
 * 
 */
require.config({
    baseUrl: '/client/desktop_development/scripts',
    packages: [
        {
            name: 'ribsjs',
            main: 'ribs',
            location: '../../../vendor/ribsjs/build'
        }
    ],
    paths: {

        // core
        'bootstrap': 'bootstrap',

        // configuration
        'configuration': 'configuration/configuration',
        'routes': 'configuration/routes',
        
        // jst
        'templates': 'templates/templates',
        
        // library
        'library.player.core': 'library/player/core',
        'library.player.ui': 'library/player/ui',
        'library.user': 'library/user',
        'library.router': 'library/router',
        'library.videoPlayer': 'library/videoPlayer',
        'library.events': 'library/event',
        'library.controller': 'library/controller',
        'library.model': 'library/model',
        'library.collection': 'library/collection',
        'library.view': 'library/view',
        'library.oauth': 'library/oauth',
        
        // managers
        'manager.tracks': 'library/manager/tracks',
        'manager.playlists': 'library/manager/playlists',
        'manager.collaborativePlaylists': 'library/manager/collaborativePlaylists',
        'manager.searchQueries': 'library/manager/searchQueries',
        
        // helpers
        'helper.durationFormatter': 'helper/durationFormatter',
        
        // plugins
        'library.plugin.headerNavigation': 'library/plugin/headerNavigation',
        'library.plugin.leftNavigation': 'library/plugin/leftNavigation',
        'library.plugin.user': 'library/plugin/user',
        'library.plugin.router': 'library/plugin/router',
        'library.plugin.splashScreen': 'library/plugin/splashScreen',
        'library.plugin.player': 'library/plugin/player',
        'library.plugin.messages': 'library/plugin/messages',
        
        // library jquery plugins
        'library.jquery.plugin.caretToggle': 'library/jquery/plugin/caretToggle',
        'library.jquery.plugin.hasAttr': 'library/jquery/plugin/hasAttr',
        
        // collections
        'collections.Tracks': 'collections/Tracks',
        'collections.Playlists': 'collections/Playlists',
        'collections.CollaborativePlaylists': 'collections/CollaborativePlaylists',
        'collections.CollaborativePlaylistsList': 'collections/CollaborativePlaylistsList',
        'collections.PlaylistsList': 'collections/PlaylistsList',
        'collections.PlaylistTracks': 'collections/PlaylistTracks',
        'collections.ChatMessages': 'collections/ChatMessages',
        'collections.SearchQueries': 'collections/SearchQueries',
        'collections.SearchQueryTracks': 'collections/SearchQueryTracks',
        
        // models
        'models.Track': 'models/Track',
        'models.Playlist': 'models/Playlist',
        'models.PlaylistTrack': 'models/PlaylistTrack',
        'models.CollaborativePlaylist': 'models/CollaborativePlaylist',
        'models.CollaborativePlaylistTrack': 'models/CollaborativePlaylistTrack',
        'models.User': 'models/User',
        'models.ChatMessage': 'models/ChatMessage',
        'models.SearchQuery': 'models/SearchQuery',
        'models.SearchQueryResultTrack': 'models/SearchQueryResultTrack',
        
        // vendor
        'jquery': '../../../vendor/jquery/dist/jquery',
        'backbone': '../../../vendor/backbone/backbone',
        'underscore': '../../../vendor/underscore/underscore',
        'moment': '../../../vendor/moment/moment',
        'velocity': '../../../vendor/velocity-animate/velocity',
        'velocity.ui': '../../../vendor/velocity/velocity.ui',
        'skrollr': '../../../vendor/skrollr/src/skrollr',
        'async': '../../../vendor/async/dist/async',
        
        // modernizr
        'modernizrTestsLoader': 'library/modernizr/loader',
        'Modernizr': 'library/modernizr/core',
        'createElement': 'library/modernizr/createElement',
        'docElement': 'library/modernizr/docElement',
        'addTest': 'library/modernizr/addTest',
        
        // modernizr detects
        'test/audio': '../../../vendor/modernizr/feature-detects/audio',
        'test/webaudio': '../../../vendor/modernizr/feature-detects/audio/webaudio',
        'test/video': '../../../vendor/modernizr/feature-detects/video',
        'test/videoautoplay': '../../../vendor/modernizr/feature-detects/video/autoplay',
        'test/canvas': '../../../vendor/modernizr/feature-detects/canvas',
        'test/history': '../../../vendor/modernizr/feature-detects/history',
        'test/websockets': '../../../vendor/modernizr/feature-detects/websockets',
        
        // chrisweb-web-audio-api-player
        'chrisweb.player.ajax': '../../../vendor/web-audio-api-player/source/ajax',
        'chrisweb.player.audio': '../../../vendor/web-audio-api-player/source/audio',
        'chrisweb.player.core': '../../../vendor/web-audio-api-player/source/core',
        
        // chrisweb-utilities
        'chrisweb-utilities': '../../../vendor/chrisweb-utilities/utilities'
        
    },
    
    shim: {
        'velocity': {
            deps: ['jquery']
        },
        'velocity-ui': {
            deps: ['velocity']
        }
    }
    
});

/**
 * 
 * main require
 * 
 * @param {type} bootstrap
 * @param {type} utilities
 * @returns {undefined}
 */
require([
    'bootstrap',
    'chrisweb-utilities'
    
], function (bootstrap, utilities) {
    
    utilities.logSpecial = false;
    
    utilities.log('[MAIN] APPLICATION START', 'fontColor:green', 'backgroundColor:yellow');
    
    bootstrap.applicationStart();
    
});
