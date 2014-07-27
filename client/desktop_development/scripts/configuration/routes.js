/**
 * 
 * routes definitions
 * 
 */
define([], function () {
    
    'use strict';
    
    var routesDefinitions = {
        'desktop': 'renderHomepage',
        'desktop/:controller(/:action)': 'controllerActionDispatcher',
        '*other': 'render404'
    };
    
    return routesDefinitions;
    
});