
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
        jquery: '../../../bower_components/jquery/dist/jquery',
        backbone: '../../../bower_components/backbone/backbone',
        underscore: '../../../bower_components/underscore/underscore',
        utilities: '../../../server/library/shared/utilities',
        configuration: 'configuration/configuration',
        router: 'library/router',
        event: 'library/event',
        page: 'library/page',
        bootstrap: 'bootstrap',
        controller: 'library/controller',
        model: 'library/model',
        collection: 'library/collection',
        view: 'library/view',
        templates: 'templates/templates'
    }
});

require([
    'bootstrap',
    'utilities'
], function (bootstrap, utilities) {
    
    utilities.log('[MAIN] application start', 'blue');
    
    bootstrap.applicationStart();
    
});
