
'use strict';

/**
 * 
 * http://requirejs.org/
 * 
 * require configuration
 * 
 */
require.config({
    baseUrl: '/desktop/client/desktop_development/scripts',
    paths: {

        // client core
        'bootstrap': 'bootstrap',

        // client configuration
        'configuration': 'configuration/configuration',
        'routes': 'configuration/routes',
        
        // client jst
        'templates': 'templates/templates',
        
        // client library
        'library.player.core': 'library/player/core',
        'library.player.ui': 'library/player/ui',
        'library.user': 'library/user',
        'library.tracksCache': 'library/tracksCache',
        'library.router': 'library/router',
        'library.videoPlayer': 'library/videoPlayer',
        'library.eventsManager': 'library/eventsManager',
        'library.controller': 'library/controller',
        'library.oauth': 'library/oauth',
        
        // helpers
        'helper.durationFormatter': 'helper/durationFormatter',
        
        // plugins
        'library.plugin.headerNavigation': 'library/plugin/headerNavigation',
        'library.plugin.leftNavigation': 'library/plugin/leftNavigation',
        'library.plugin.user': 'library/plugin/user',
        'library.plugin.router': 'library/plugin/router',
        'library.plugin.splashScreen': 'library/plugin/splashScreen',
        
        // library jquery plugins
        'library.jquery.plugin.caretToggle': 'library/jquery/plugin/caretToggle',
        'library.jquery.plugin.hasAttr': 'library/jquery/plugin/hasAttr',
        
        // collections
        'collections.TracksCache': 'collections/TracksCache',
        'collections.TracksSearchResult': 'collections/TracksSearchResult',
        
        // models
        'models.Track': 'models/Track',
        'models.User': 'models/User',
        
        // vendor
        'jquery': '../../../bower_components/jquery/dist/jquery',
        'backbone': '../../../bower_components/backbone/backbone',
        'underscore': '../../../bower_components/underscore/underscore',
        'moment': '../../../bower_components/moment/moment',
        'velocity': '../../../bower_components/velocity/velocity',
        'velocity.ui': '../../../bower_components/velocity/velocity.ui',
        'skrollr': '../../../bower_components/skrollr/src/skrollr',
        
        // ribs.js
        'ribs.collection': '../../../bower_components/ribs.js/src/collection',
        'ribs.container': '../../../bower_components/ribs.js/src/container',
        'ribs.controller': '../../../bower_components/ribs.js/src/controller',
        'ribs.eventsManager': '../../../bower_components/ribs.js/src/eventsManager',
        'ribs.model': '../../../bower_components/ribs.js/src/model',
        'ribs.router': '../../../bower_components/ribs.js/src/router',
        'ribs.view': '../../../bower_components/ribs.js/src/view',
        'ribs.viewsloader': '../../../bower_components/ribs.js/src/viewsloader',
        
        // modernizr
        'modernizrTestsLoader': 'library/modernizr/loader',
        'Modernizr': 'library/modernizr/core',
        'createElement': 'library/modernizr/createElement',
        'docElement': 'library/modernizr/docElement',
        'addTest': 'library/modernizr/addTest',
        
        // modernizr detects
        'test/audio': '../../../bower_components/modernizr/feature-detects/audio',
        'test/webaudio': '../../../bower_components/modernizr/feature-detects/audio/webaudio',
        'test/video': '../../../bower_components/modernizr/feature-detects/video',
        'test/videoautoplay': '../../../bower_components/modernizr/feature-detects/video/autoplay',
        'test/canvas': '../../../bower_components/modernizr/feature-detects/canvas',
        'test/history': '../../../bower_components/modernizr/feature-detects/history',
        'test/websockets': '../../../bower_components/modernizr/feature-detects/websockets',
        
        // chrisweb-web-audio-api-player
        //'chrisweb.player.ajax': '../../../bower_components/chrisweb-web-audio-api-player/source/ajax',
        //'chrisweb.player.audio': '../../../bower_components/chrisweb-web-audio-api-player/source/audio',
        //'chrisweb.player.core': '../../../bower_components/chrisweb-web-audio-api-player/source/core',
        //'chrisweb.player.ui': '../../../bower_components/chrisweb-web-audio-api-player/source/ui',
        
        // chrisweb-utilities
        'chrisweb.utilities': '../../../bower_components/chrisweb-utilities/utilities'
        
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
    'chrisweb.utilities'
], function (bootstrap, utilities) {
    
    utilities.logSpecial = false;
    
    utilities.log('[MAIN] APPLICATION START', 'fontColor:green', 'backgroundColor:yellow');
    
    bootstrap.applicationStart();
    
});
