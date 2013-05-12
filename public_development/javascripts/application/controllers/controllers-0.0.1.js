/**
 * 
 * controllers module
 * 
 * @param {type} angular
 * @returns {@exp;@exp;angular@pro;module@pro;c@call;ontroller@call;@call;controller|@exp;angular@pro;module@pro;c@call;ontroller@call;@call;controller}
 */
define(['angular', 'configuration', 'services'], function(angular, configuration) {
    
    'use strict';

    return angular.module('controllersModule', ['servicesModule'])

        .controller('BaseController', ['$scope', function($scope) {

            $scope.application = { version: configuration.get().application.version };

        }])
    
        .controller('OauthController', ['$scope', function($scope) {

            

        }])

        .controller('PlaylistsListController', ['$scope', '$routeParams', function($scope, $routeParams) {

            $scope.playlistsQuery = PlaylistsListService.query();
            $scope.playlistsOrder = 'listenings';

        }])
    
        .controller('PlaylistsDetailController', ['$scope', '$routeParams', function($scope, $routeParams) {
    
            $scope.playlists = PlaylistsService.get({ playlistId: $routeParams.playlistId }, function(playlist) {

                

            });
            
        }]);

});