/**
 * 
 * @param {type} $
 * @param {type} configurationModule
 * @param {type} utilities
 * @param {type} angular
 * @returns {_L4.Anonym$0}
 */
define(['jquery', 'configuration', 'utilities', 'angular', 'routes', 'application', 'angular-bootstrap', 'colorbox'], function($, configurationModule, utilities, angular) {

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

        $(document).ready(function() {

            // to debug angular.js use the AngularJS Batarang chrome developer tools extension:
            // https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en

            // bootstrap angular
            // compiles the template into an executable, bi-directionally bound application
            angular.bootstrap(document, [configuration.application.name]);

        });

    };

    /**
     * 
     */
    return {
        run: initializeApplication
    };

});