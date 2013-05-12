/**
 * 
 * @param {type} angular
 * @returns {_L4.Anonym$0}
 */
define(['angular', 'utilities', 'controllers'], function(angular, utilities, controllers) {

    'use strict';

    /**
     * 
     * start the application
     * 
     * @returns {undefined}
     */
    var initializeRoutes = function(angularModule) {

        utilities.log('[ROUTES] initialization...', 'blue');

        angularModule.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
                
            $locationProvider.html5Mode(true).hashPrefix('!');
            
            var viewsPath = 'javascripts/application/views/';

            $routeProvider.
                when('/', {
                    templateUrl: viewsPath + 'oauth/connect.html',
                    controller: controllers.OauthController
                }).
                when('/playlists', {
                    templateUrl: viewsPath + 'playlists/list.html',
                    controller: controllers.PlaylistsListController
                }).
                when('/playlist/:playlistId', {
                    templateUrl: viewsPath + 'playlists/detail.html',
                    controller: controllers.PlaylistsDetailController
                }).
                otherwise(function() { $window.location.href = '/404'; });

        }]);

    };

    /**
     * 
     */
    return {
        initialize: initializeRoutes
    };

});