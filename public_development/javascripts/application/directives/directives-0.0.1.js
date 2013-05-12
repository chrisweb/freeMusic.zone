/**
 * 
 * directives module
 * 
 * @param {type} angular
 * @param {type} services
 * @returns {undefined}
 */
define(['angular', 'services'], function(angular, services) {
    
    'use strict';

    return angular.module('directivesModule', ['servicesModule'])
    
        .directive('', ['', function(version) {
        
            return function(scope) {
                
                

            };
            
        }]);
    
});