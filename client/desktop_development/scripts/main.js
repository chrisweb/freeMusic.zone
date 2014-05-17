
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
        'collection': 'library/collection',
        'container': 'library/container',
        'controller': 'library/controller',
        'event': 'library/event',
        'layout': 'library/layout',
        'model': 'library/model',
        'player.core': 'library/player/core',
        'player.ui': 'library/player/ui',
        'router': 'library/router',
        'view': 'library/view',
        'views.loader': 'library/view/loader',
        
        // vendor
        'jquery': '../../../bower_components/jquery/dist/jquery',
        'backbone': '../../../bower_components/backbone/backbone',
        'underscore': '../../../bower_components/underscore/underscore',
        'SoundManager': '../../../bower_components/SoundManager2/script/soundmanager2'
        
    }
});

require([
    'bootstrap',
    'utilities',
    'event'
], function (bootstrap, utilities) {
    
    utilities.log('[MAIN] application start', 'blue');
    
    bootstrap.applicationStart();
    
});
