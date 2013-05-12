/**
 * 
 * services module
 * 
 * @param {type} angular
 * @param {type} services
 * @returns {undefined}
 */
define(['angular', 'services'], function(angular, services) {
    
    'use strict';

    return angular.module('filtersModule', ['servicesModule'])
    
        .filter('', ['', function(version) {
        
            return function(text) {
                
                return String(text).replace(/\%VERSION\%/mg, version);
                
            };
            
        }]);
    
});