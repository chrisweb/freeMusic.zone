/**
 * 
 * controllers module
 * 
 * @param {type} angular
 * @returns {@exp;@exp;angular@pro;module@pro;c@call;ontroller@call;@call;controller|@exp;angular@pro;module@pro;c@call;ontroller@call;@call;controller}
 */
define(['angular', 'configuration', 'utilities', 'services'], function(angular, configuration, utilities) {
    
    'use strict';

    return angular.module('controllersModule', ['servicesModule'])

        .controller('BaseController', ['$scope', function($scope) {

            utilities.log('BaseController got executed');

            $scope.application = { version: configuration.get().application.version };

        }])
    
        .controller('OauthController', ['$scope', function($scope) {
        
            utilities.log('OauthController got executed');

			/*
            $.colorbox({
                inline: true,
                width: '50%',
                href: 'div#oauth_connect_box'
            });
			*/
			
			$scope.connect = function(event) {
				
				utilities.log(event);
				
				//event.preventDefault();
				
				utilities.log('execute jamendo oauth connect action');
				
			};

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