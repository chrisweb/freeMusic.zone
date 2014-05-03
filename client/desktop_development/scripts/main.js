
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
        bootstrap: 'bootstrap',
        controller: 'library/controller',
        model: 'library/model',
        collection: 'library/collection',
        view: 'library/view',
        templates: 'templates/templates'
    }
});

require([
    'application',
    'utilities'
], function (application, utilities) {
    
    application.start();
    
});
