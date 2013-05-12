/**
 * 
 * application bootstrap
 * 
 * @param {type} $
 * @param {type} configurationModule
 * @param {type} utilities
 * @param {type} angular
 * @param {type} controllers
 * @param {type} filters
 * @param {type} services
 * @param {type} directives
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'utilities', 'angular', 'routes', 'controllers', 'filters', 'services', 'directives', 'angular-bootstrap', 'colorbox'], function($, configurationModule, utilities, angular, routes) {

    'use strict';

    /**
     * 
     * start the application
     * 
     * @returns {undefined}
     */
    var initializeApplication = function() {

        utilities.log('[APPLICATION] initialization...', 'blue');

        // retrieve configuration object
        var configuration = configurationModule.get();

        // one module for the whole application
        var angularModule = angular.module(configuration.application.name, ['controllersModule', 'filtersModule', 'servicesModule', 'directivesModule']);

        $(document).ready(function() {

            // to debug angular.js use the AngularJS Batarang chrome developer tools extension:
            // https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en
            
            // initialize the routes
            routes.initialize(angularModule);

            // bootstrap angular
            // compiles the template into an executable, bi-directionally bound application
            angular.bootstrap(document, [configuration.application.name]);

        });

    };

    /**
     * 
     */
    return {
        initialize: initializeApplication
    };

});