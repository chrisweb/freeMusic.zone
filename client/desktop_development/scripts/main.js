
'use strict';

/**
 * 
 * http://requirejs.org/
 * 
 * require configuration
 * 
 */
require.config({
    baseUrl: 'desktop/client/desktop_development/scripts',
    paths: {

        // client core
        'bootstrap': 'bootstrap',

        // client configuration
        'configuration': 'configuration/configuration',
        'routes': 'configuration/routes',

        // server shared
        'library.utilities': '../../../server/library/shared/utilities',
        
        // client jst
        'templates': 'templates/templates',
        
        // client library
        'library.player.core': 'library/player/core',
        'library.player.ui': 'library/player/ui',
        'library.views.loader': 'library/view/loader',
        'library.collection': 'library/collection',
        'library.container': 'library/container',
        'library.controller': 'library/controller',
        'library.eventsManager': 'library/eventsManager',
        'library.layout': 'library/layout',
        'library.model': 'library/model',
        'library.router': 'library/router',
        'library.tracksCache': 'library/tracksCache',
        'library.view': 'library/view',
        'library.user': 'library/user',
        
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
        'moment': '../../../bower_components/moment/moment'
        
        // vendor modernizr
        //'moment': '../../../bower_components/moment/moment',
        
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
    'library.utilities'
], function (bootstrap, utilities) {
    
    utilities.logSpecial = false;
    
    utilities.log('[MAIN] APPLICATION START', 'fontColor:green', 'backgroundColor:yellow');
    
    bootstrap.applicationStart();
    
});
