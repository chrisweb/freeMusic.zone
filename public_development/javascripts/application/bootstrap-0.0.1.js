/**
 * 
 * @param {type} $
 * @param {type} configurationModule
 * @param {type} utilities
 * @param {type} angular
 * @returns {_L4.Anonym$0}
 */
define('bootstrap', ['jquery', 'utilities', 'routes'], function($, utilities, routes) {

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

            // routes dispatch
            routes.dispatch();

        });

    };

    /**
     * 
     */
    return {
        run: initializeApplication
    };

});