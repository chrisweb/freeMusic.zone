/**
 * 
 * @param {type} $
 * @param {type} configurationModule
 * @param {type} utilities
 * @param {type} angular
 * @returns {_L4.Anonym$0}
 */
define('bootstrap', ['jquery', 'utilities', 'application'], function($, utilities, application) {

    'use strict';

    /**
     * 
     * start the application
     * 
     * @returns {undefined}
     */
    var initializeApplication = function() {

        utilities.log('[BOOTSTRAP] initialization...', 'blue');

        $(document).ready(function() {

            // to debug angular.js use the AngularJS Batarang chrome developer tools extension:
            // https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en

            // application dispatch
            application.dispatch();

        });

    };

    /**
     * 
     */
    return {
        run: initializeApplication
    };

});