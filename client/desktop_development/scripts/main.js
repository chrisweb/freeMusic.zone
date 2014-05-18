
'use strict';

/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
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
        'utilities': '../../../server/library/shared/utilities',
        
        // client jst
        'templates': 'templates/templates',
        
        // client library
        'player.core': 'library/player/core',
        'player.ui': 'library/player/ui',
        'views.loader': 'library/view/loader',
        'collection': 'library/collection',
        'container': 'library/container',
        'controller': 'library/controller',
        'eventsManager': 'library/eventsManager',
        'layout': 'library/layout',
        'model': 'library/model',
        'router': 'library/router',
        'tracksCache': 'library/tracksCache',
        'view': 'library/view',
        
        // collections
        'collections.TracksCache': 'collections/TracksCache',
        'collections.TracksSearchResult': 'collections/TracksSearchResult',
        
        // models
        'models.Track': 'models/Track',
        
        // vendor
        'jquery': '../../../bower_components/jquery/dist/jquery',
        'backbone': '../../../bower_components/backbone/backbone',
        'underscore': '../../../bower_components/underscore/underscore',
        'SoundManager': '../../../bower_components/SoundManager2/script/soundmanager2',
        'moment': '../../../bower_components/moment/moment'
        
    }
    
});

require([
    'bootstrap',
    'utilities'
], function (bootstrap, utilities) {
    
    utilities.log('[MAIN] application start', 'blue');
    
    bootstrap.applicationStart();
    
});
