/**
 * 
 * @param {type} angular
 * @returns {undefined}
 */
define(['angular', 'angular-resource'], function(angular) {
    
    'use strict';
    
    return angular.module('servicesModule', ['ngResource'])

        .factory('PlaylistsListService', function($resource) {
    
            return $resource('playlists/list', {}, {
                
                query: { 
                    method: 'GET',
                    isArray: true
                }

            });
            
        })
        
        .factory('PlaylistsDetailService', function($resource) {
    
            return $resource('playlists/detail/:playlistId', {}, {
                
                query: { 
                    method: 'GET',
                    params: { playlistId: 'playlists' },
                    isArray: true
                }

            });
            
        });

});