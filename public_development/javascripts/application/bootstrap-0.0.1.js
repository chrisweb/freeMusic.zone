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

        // developer greeting message
        utilities.log('Like to see what\'s under the hood? Check out https://github.com/chrisweb/jam_prototype!', 'magenta');

        utilities.log('[BOOTSTRAP] initialization...', 'blue');

        $(document).ready(function() {

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