
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
        
        // plugins
        'library.plugin.headerNavigation': 'library/plugin/headerNavigation',
        'library.plugin.leftNavigation': 'library/plugin/leftNavigation',
        
        // library jquery plugins
        'library.jquery.plugin.caretToggle': 'library/jquery/plugin/caretToggle',
        
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
        'SoundManager': '../../../bower_components/SoundManager2/script/soundmanager2',
        'moment': '../../../bower_components/moment/moment',
        
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
        'Modernizr': 'modernizr/build',
        
        // chrisweb-utilities
        'chrisweb.utilities': '../../../bower_components/chrisweb-utilities/utilities'
        
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
