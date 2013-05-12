/**
 * 
 * @param {type} angular
 * @returns {_L4.Anonym$0}
 */
define(['angular', 'utilities', 'application'], function(angular, utilities, application) {

    'use strict';

    return application.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix('!');

        var viewsPath = 'javascripts/application/views/';

        $routeProvider.
            when('/', {
                templateUrl: viewsPath + 'oauth/connect.html',
                controller: 'OauthController'
            }).
            when('/playlists', {
                templateUrl: viewsPath + 'playlists/list.html',
                controller: 'PlaylistsListController'
            }).
            when('/playlist/:playlistId', {
                templateUrl: viewsPath + 'playlists/detail.html',
                controller: 'PlaylistsDetailController'
            }).
            otherwise(function() { $window.location.href = '/404'; });

    }]);

});